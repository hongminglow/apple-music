import type { RepeatMode, Track } from "../music/types";

export type PlayerSnapshot = {
	queue: Track[];
	currentIndex: number;
	currentTrack: Track | null;
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	muted: boolean;
	shuffle: boolean;
	repeat: RepeatMode;
	likedTrackIds: ReadonlySet<string>;
};

export type PlayerApi = PlayerSnapshot & {
	setQueue: (tracks: Track[], startIndex?: number, autoplay?: boolean) => void;
	playTrackById: (trackId: string, autoplay?: boolean) => void;
	play: () => void;
	pause: () => void;
	togglePlay: () => void;
	next: () => void;
	previous: () => void;
	seek: (timeSeconds: number) => void;
	setVolume: (volume: number) => void;
	toggleMuted: () => void;
	toggleShuffle: () => void;
	cycleRepeat: () => void;
	toggleLike: (trackId: string) => void;
};
