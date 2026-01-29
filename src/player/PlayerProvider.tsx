import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import type { Track } from "../music/types";
import type { PlayerApi } from "./playerTypes";

const PlayerContext = createContext<PlayerApi | null>(null);

function clamp01(value: number) {
	return Math.min(1, Math.max(0, value));
}

function clampTime(value: number) {
	if (!Number.isFinite(value)) return 0;
	return Math.max(0, value);
}

function nextRepeat(current: PlayerApi["repeat"]): PlayerApi["repeat"] {
	if (current === "off") return "all";
	if (current === "all") return "one";
	return "off";
}

function shuffleCopy<T>(arr: T[]): T[] {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const repeatRef = useRef<PlayerApi["repeat"]>("off");
	const queueLengthRef = useRef(0);
	const isPlayingRef = useRef(false);
	const rafIdRef = useRef<number | null>(null);
	const lastRafTimeRef = useRef(0);

	const [queue, setQueueState] = useState<Track[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolumeState] = useState(0.7);
	const [muted, setMuted] = useState(false);
	const [shuffle, setShuffle] = useState(false);
	const [repeat, setRepeat] = useState<PlayerApi["repeat"]>("off");
	const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(() => new Set());

	const currentTrack = queue[currentIndex] ?? null;

	useEffect(() => {
		repeatRef.current = repeat;
	}, [repeat]);

	useEffect(() => {
		queueLengthRef.current = queue.length;
	}, [queue.length]);

	useEffect(() => {
		isPlayingRef.current = isPlaying;
	}, [isPlaying]);

	const syncAudioFromState = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.volume = clamp01(volume);
		audio.muted = muted;
	}, [muted, volume]);

	const loadTrack = useCallback((track: Track | null, autoplay: boolean) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (!track) {
			audio.removeAttribute("src");
			audio.load();
			return;
		}

		if (audio.src !== new URL(track.src, window.location.href).href) {
			audio.src = track.src;
			audio.load();
		}

		if (autoplay) {
			void audio.play().catch(() => {
				// Autoplay can still fail in some browsers if not initiated by user gesture.
			});
		}
	}, []);

	useEffect(() => {
		const audio = new Audio();
		audio.preload = "metadata";
		audioRef.current = audio;

		const stopRaf = () => {
			if (rafIdRef.current == null) return;
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		};

		const tick = () => {
			const a = audioRef.current;
			if (!a) return;

			const t = a.currentTime || 0;
			// Throttle to ~30fps to keep React renders reasonable.
			if (Math.abs(t - lastRafTimeRef.current) >= 1 / 30) {
				lastRafTimeRef.current = t;
				setCurrentTime(t);
			}

			if (!a.paused) {
				rafIdRef.current = requestAnimationFrame(tick);
			} else {
				rafIdRef.current = null;
			}
		};

		const startRaf = () => {
			stopRaf();
			rafIdRef.current = requestAnimationFrame(tick);
		};

		const onTimeUpdate = () => {
			// Fallback / non-playing updates (seeking, manual jumps).
			if (audio.paused) setCurrentTime(audio.currentTime || 0);
		};
		const onDurationChange = () => setDuration(audio.duration || 0);
		const onPlay = () => {
			setIsPlaying(true);
			startRaf();
		};
		const onPause = () => {
			setIsPlaying(false);
			stopRaf();
		};

		const onEnded = () => {
			stopRaf();
			const repeatMode = repeatRef.current;

			if (repeatMode === "one") {
				audio.currentTime = 0;
				void audio.play();
				return;
			}

			setCurrentIndex((idx) => {
				const nextIdx = idx + 1;
				const qLen = queueLengthRef.current;
				if (nextIdx < qLen) return nextIdx;
				if (repeatMode === "all" && qLen > 0) return 0;
				return idx;
			});
		};

		audio.addEventListener("timeupdate", onTimeUpdate);
		audio.addEventListener("durationchange", onDurationChange);
		audio.addEventListener("loadedmetadata", onDurationChange);
		audio.addEventListener("play", onPlay);
		audio.addEventListener("pause", onPause);
		audio.addEventListener("ended", onEnded);

		return () => {
			stopRaf();
			audio.pause();
			audio.removeEventListener("timeupdate", onTimeUpdate);
			audio.removeEventListener("durationchange", onDurationChange);
			audio.removeEventListener("loadedmetadata", onDurationChange);
			audio.removeEventListener("play", onPlay);
			audio.removeEventListener("pause", onPause);
			audio.removeEventListener("ended", onEnded);
		};
	}, []);

	useEffect(() => {
		syncAudioFromState();
	}, [syncAudioFromState]);

	useEffect(() => {
		// Keep audio source in sync with the selected track.
		// If the user was already playing, auto-start the next track.
		loadTrack(currentTrack, isPlayingRef.current);
	}, [currentTrack, loadTrack]);

	const setQueue = useCallback(
		(tracks: Track[], startIndex: number = 0, autoplay: boolean = true) => {
			const safeStart = Math.min(Math.max(0, startIndex), Math.max(0, tracks.length - 1));

			if (tracks.length === 0) {
				setQueueState([]);
				setCurrentIndex(0);
				setIsPlaying(false);
				setCurrentTime(0);
				setDuration(0);
				loadTrack(null, false);
				return;
			}

			if (!shuffle) {
				const nextQueue = [...tracks];
				setQueueState(nextQueue);
				setCurrentIndex(safeStart);
				setIsPlaying(autoplay);
				setCurrentTime(0);
				loadTrack(nextQueue[safeStart] ?? null, autoplay);
				return;
			}

			const chosen = tracks[safeStart];
			const remaining = tracks.filter((t) => t.id !== chosen?.id);
			const shuffled = shuffleCopy(remaining);
			const nextQueue = chosen ? [chosen, ...shuffled] : shuffled;
			setQueueState(nextQueue);
			setCurrentIndex(0);
			setIsPlaying(autoplay);
			setCurrentTime(0);
			loadTrack(nextQueue[0] ?? null, autoplay);
		},
		[loadTrack, shuffle],
	);

	const playTrackById = useCallback(
		(trackId: string, autoplay: boolean = true) => {
			setQueueState((q) => {
				const idx = q.findIndex((t) => t.id === trackId);
				if (idx >= 0) {
					setCurrentIndex(idx);
					setCurrentTime(0);
					setIsPlaying(autoplay);
					loadTrack(q[idx] ?? null, autoplay);
				}
				return q;
			});
		},
		[loadTrack],
	);

	const play = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		void audio
			.play()
			.then(() => setIsPlaying(true))
			.catch(() => setIsPlaying(false));
	}, []);

	const pause = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.pause();
		setIsPlaying(false);
	}, []);

	const togglePlay = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
			return;
		}

		if (!currentTrack) return;
		void audio
			.play()
			.then(() => setIsPlaying(true))
			.catch(() => setIsPlaying(false));
	}, [currentTrack, isPlaying]);

	const next = useCallback(() => {
		setCurrentIndex((idx) => {
			const nextIdx = idx + 1;
			if (nextIdx < queue.length) return nextIdx;
			if (repeat === "all" && queue.length > 0) return 0;
			return idx;
		});
		setCurrentTime(0);
	}, [queue.length, repeat]);

	const previous = useCallback(() => {
		const audio = audioRef.current;
		if (audio && audio.currentTime > 3) {
			audio.currentTime = 0;
			setCurrentTime(0);
			return;
		}

		setCurrentIndex((idx) => Math.max(0, idx - 1));
		setCurrentTime(0);
	}, []);

	const seek = useCallback((timeSeconds: number) => {
		const audio = audioRef.current;
		if (!audio) return;
		const safe = clampTime(timeSeconds);
		audio.currentTime = safe;
		setCurrentTime(safe);
	}, []);

	const setVolume = useCallback((v: number) => {
		const safe = clamp01(v);
		setVolumeState(safe);
	}, []);

	const toggleMuted = useCallback(() => {
		setMuted((m) => !m);
	}, []);

	const toggleShuffle = useCallback(() => {
		setShuffle((s) => !s);
	}, []);

	const cycleRepeat = useCallback(() => {
		setRepeat((r) => nextRepeat(r));
	}, []);

	const toggleLike = useCallback((trackId: string) => {
		setLikedTrackIds((prev) => {
			const nextSet = new Set(prev);
			if (nextSet.has(trackId)) nextSet.delete(trackId);
			else nextSet.add(trackId);
			return nextSet;
		});
	}, []);

	const value: PlayerApi = useMemo(
		() => ({
			queue,
			currentIndex,
			currentTrack,
			isPlaying,
			currentTime,
			duration,
			volume,
			muted,
			shuffle,
			repeat,
			likedTrackIds,
			setQueue,
			playTrackById,
			play,
			pause,
			togglePlay,
			next,
			previous,
			seek,
			setVolume,
			toggleMuted,
			toggleShuffle,
			cycleRepeat,
			toggleLike,
		}),
		[
			queue,
			currentIndex,
			currentTrack,
			isPlaying,
			currentTime,
			duration,
			volume,
			muted,
			shuffle,
			repeat,
			likedTrackIds,
			setQueue,
			playTrackById,
			play,
			pause,
			togglePlay,
			next,
			previous,
			seek,
			setVolume,
			toggleMuted,
			toggleShuffle,
			cycleRepeat,
			toggleLike,
		],
	);

	return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export { PlayerContext };
