import {
	Heart,
	ListMusic,
	Pause,
	Play,
	Repeat,
	Repeat1,
	Shuffle,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import { TRACKS } from "../music/library";
import { formatTime } from "../lib/time";
import { usePlayer } from "../player";

export default function PlayerBar() {
	const player = usePlayer();
	const [isQueueOpen, setIsQueueOpen] = useState(false);

	const canScrub = player.duration > 0 && Number.isFinite(player.duration);
	const seekProgress = canScrub ? Math.min(1, Math.max(0, player.currentTime / player.duration)) : 0;
	const seekStyle = {
		["--range-progress"]: `${seekProgress * 100}%`,
		["--range-fill"]: "#F5F5F7",
		["--range-track"]: "#2A2A35",
	} as CSSProperties;
	const repeatIcon = player.repeat === "one" ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />;

	const isLiked = player.currentTrack ? player.likedTrackIds.has(player.currentTrack.id) : false;

	const coverClass = player.currentTrack?.cover.className ?? "bg-[#2A2A35]";
	const title = player.currentTrack?.title ?? "Not Playing";
	const artist = player.currentTrack?.artist ?? "";

	const volumeIcon =
		player.muted || player.volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />;

	const volumeValue = player.muted ? 0 : player.volume;
	const volumeStyle = {
		["--range-progress"]: `${Math.min(1, Math.max(0, volumeValue)) * 100}%`,
		["--range-fill"]: "#F5F5F7",
		["--range-track"]: "#2A2A35",
	} as CSSProperties;

	const repeatColor = player.repeat === "off" ? "text-[#D4D4D8]" : "text-[#22C55E]";

	const shuffleColor = player.shuffle ? "text-[#22C55E]" : "text-[#D4D4D8]";

	const displayedQueue = useMemo(() => player.queue, [player.queue]);

	return (
		<footer className="relative h-[96px] w-full bg-[#121218] px-4 py-4 ring-1 ring-inset ring-[#2A2A35]">
			{isQueueOpen ? (
				<div
					className="fixed inset-0 z-40 bg-black/50"
					role="button"
					tabIndex={0}
					aria-label="Close queue"
					onClick={() => setIsQueueOpen(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape") setIsQueueOpen(false);
					}}
				/>
			) : null}

			{isQueueOpen ? (
				<div className="fixed bottom-[112px] right-6 z-50 w-[380px] overflow-hidden rounded-2xl bg-[#121218] shadow-[0_20px_25px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-[#2A2A35]">
					<div className="flex items-center justify-between px-4 py-3">
						<div className="text-[14px] font-semibold text-[#F5F5F7]">Up Next</div>
						<button
							type="button"
							className="cursor-pointer text-[12px] font-semibold text-[#A1A1AA] hover:text-[#F5F5F7]"
							onClick={() => setIsQueueOpen(false)}
						>
							Close
						</button>
					</div>

					<div className="max-h-[360px] overflow-auto">
						{displayedQueue.length === 0 ? (
							<div className="px-4 pb-4 text-[13px] text-[#A1A1AA]">
								Queue is empty. Start playback from “Listen Now”.
							</div>
						) : (
							displayedQueue.map((t, idx) => {
								const active = idx === player.currentIndex;
								return (
									<button
										key={t.id}
										type="button"
										className={
											"flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/10 " +
											(active ? "bg-[#1C1C24]" : "hover:bg-[#161620]")
										}
										onClick={() => player.playTrackById(t.id, true)}
									>
										<div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#2A2A35]">
											<div className={`h-full w-full ${t.cover.className}`} />
										</div>
										<div className="min-w-0 flex-1">
											<div className="truncate text-[13px] font-semibold text-[#F5F5F7]">{t.title}</div>
											<div className="truncate text-[12px] text-[#A1A1AA]">{t.artist}</div>
										</div>
										{active ? <span className="text-[12px] font-semibold text-[#22C55E]">Playing</span> : null}
									</button>
								);
							})
						)}
					</div>
				</div>
			) : null}

			<div className="mx-auto flex h-full max-w-[1440px] items-center gap-4">
				<div className="flex w-[360px] min-w-0 items-center gap-3">
					<div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-[#2A2A35]">
						<div className={`h-full w-full ${coverClass}`} />
					</div>
					<div className="min-w-0">
						<div className="truncate text-[14px] font-semibold text-[#F5F5F7]">{title}</div>
						<div className="truncate text-[12px] text-[#A1A1AA]">{artist}</div>
					</div>

					<button
						type="button"
						className={
							"ml-auto inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/10 " +
							(isLiked ? "text-[#FF2D55] hover:bg-[#1C1C24]" : "text-[#D4D4D8] hover:bg-[#1C1C24] hover:text-[#F5F5F7]")
						}
						aria-label={isLiked ? "Unlike" : "Like"}
						onClick={() => {
							if (!player.currentTrack) return;
							player.toggleLike(player.currentTrack.id);
						}}
						disabled={!player.currentTrack}
					>
						<Heart className={isLiked ? "h-5 w-5 fill-[#FF2D55]" : "h-5 w-5"} />
					</button>
				</div>

				<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2">
					<div className="flex items-center gap-2">
						<button
							type="button"
							className={
								"inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#1C1C24] focus:outline-none focus:ring-2 focus:ring-white/10 " +
								shuffleColor
							}
							aria-label={player.shuffle ? "Disable shuffle" : "Enable shuffle"}
							onClick={player.toggleShuffle}
						>
							<Shuffle className="h-4 w-4" />
						</button>

						<button
							type="button"
							className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#D4D4D8] transition-colors duration-200 hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
							aria-label="Previous"
							onClick={player.previous}
							disabled={player.queue.length === 0}
						>
							<SkipBack className="h-5 w-5" />
						</button>

						<button
							type="button"
							className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F7] text-[#0B0B0F] transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20"
							aria-label={player.isPlaying ? "Pause" : "Play"}
							onClick={() => {
								if (!player.currentTrack) {
									player.setQueue(TRACKS, 0, true);
									return;
								}
								player.togglePlay();
							}}
						>
							{player.isPlaying ? (
								<Pause className="h-[18px] w-[18px] fill-[#0B0B0F]" />
							) : (
								<Play className="h-[18px] w-[18px] fill-[#0B0B0F]" />
							)}
						</button>

						<button
							type="button"
							className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#D4D4D8] transition-colors duration-200 hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
							aria-label="Next"
							onClick={player.next}
							disabled={player.queue.length === 0}
						>
							<SkipForward className="h-5 w-5" />
						</button>

						<button
							type="button"
							className={
								"inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#1C1C24] focus:outline-none focus:ring-2 focus:ring-white/10 " +
								repeatColor
							}
							aria-label="Repeat"
							onClick={player.cycleRepeat}
							title={`Repeat: ${player.repeat}`}
						>
							{repeatIcon}
						</button>
					</div>

					<div className="flex w-full items-center gap-2.5">
						<div className="w-[42px] text-right text-[12px] text-[#A1A1AA]">{formatTime(player.currentTime)}</div>

						<input
							type="range"
							min={0}
							max={canScrub ? player.duration : 0}
							step={0.1}
							value={canScrub ? player.currentTime : 0}
							onChange={(e) => player.seek(Number(e.target.value))}
							disabled={!canScrub}
							aria-label="Seek"
							className="range cursor-pointer disabled:cursor-not-allowed"
							style={seekStyle}
						/>

						<div className="w-[42px] text-[12px] text-[#A1A1AA]">{formatTime(player.duration)}</div>
					</div>
				</div>

				<div className="flex w-[240px] items-center justify-end gap-3 text-[#D4D4D8]">
					<button
						type="button"
						className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
						aria-label="Queue"
						onClick={() => setIsQueueOpen((v) => !v)}
					>
						<ListMusic className="h-5 w-5" />
					</button>

					<button
						type="button"
						className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
						aria-label={player.muted ? "Unmute" : "Mute"}
						onClick={player.toggleMuted}
					>
						{volumeIcon}
					</button>

					<div className="w-[120px]">
						<input
							type="range"
							min={0}
							max={1}
							step={0.01}
							value={volumeValue}
							onChange={(e) => {
								const v = Number(e.target.value);
								player.setVolume(v);
								if (v > 0 && player.muted) player.toggleMuted();
							}}
							aria-label="Volume"
							className="range"
							style={volumeStyle}
						/>
					</div>
				</div>
			</div>
		</footer>
	);
}
