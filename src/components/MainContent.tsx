import { Search, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";

import { TRACKS } from "../music/library";
import { usePlayer } from "../player";

export default function MainContent() {
	const player = usePlayer();
	const [query, setQuery] = useState("");

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return [];
		return TRACKS.filter((t) => `${t.title} ${t.artist} ${t.album ?? ""}`.toLowerCase().includes(q));
	}, [query]);

	return (
		<main className="min-w-0 flex-1 p-6">
			<h1 className="font-heading text-[28px] font-extrabold tracking-tight text-[#F5F5F7]">Listen Now</h1>

			<div className="mt-5 flex items-center justify-between gap-4">
				<div className="flex h-10 w-full max-w-[420px] items-center gap-2.5 rounded-xl bg-[#1C1C24] px-3 ring-1 ring-inset ring-[#2A2A35]">
					<Search className="h-4 w-4 text-[#A1A1AA]" />
					<input
						className="w-full bg-transparent text-[14px] text-[#F5F5F7] outline-none placeholder:text-[#A1A1AA]"
						placeholder="Search songs, artists, albums"
						aria-label="Search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
			</div>

			{filtered.length > 0 ? (
				<section className="mt-4">
					<div className="flex items-center justify-between">
						<h2 className="text-[14px] font-semibold text-[#A1A1AA]">Results</h2>
						<button
							type="button"
							className="cursor-pointer text-[12px] font-semibold text-[#A1A1AA] hover:text-[#F5F5F7]"
							onClick={() => setQuery("")}
						>
							Clear
						</button>
					</div>

					<div className="mt-2 divide-y divide-[#2A2A35] overflow-hidden rounded-2xl bg-[#121218]">
						{filtered.map((t) => (
							<button
								key={t.id}
								type="button"
								className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-[#161620] focus:outline-none focus:ring-2 focus:ring-white/10"
								onClick={() => {
									const idx = TRACKS.findIndex((x) => x.id === t.id);
									player.setQueue(TRACKS, Math.max(0, idx), true);
								}}
							>
								<div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#2A2A35]">
									<div className={`h-full w-full ${t.cover.className}`} />
								</div>
								<div className="min-w-0 flex-1">
									<div className="truncate text-[14px] font-semibold text-[#F5F5F7]">{t.title}</div>
									<div className="truncate text-[12px] text-[#A1A1AA]">
										{t.artist}
										{t.album ? ` • ${t.album}` : ""}
									</div>
								</div>
								<span className="text-[12px] font-semibold text-[#22C55E]">Play</span>
							</button>
						))}
					</div>
				</section>
			) : null}

			<section className="mt-5">
				<div className="rounded-[18px] bg-[#121218] p-5 ring-1 ring-inset ring-[#2A2A35]">
					<div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
						<div className="h-[180px] w-[180px] shrink-0 overflow-hidden rounded-2xl bg-[#2A2A35]">
							<div className="h-full w-full bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#4338CA]/50" />
						</div>

						<div className="min-w-0 flex-1">
							<div className="text-[12px] font-semibold text-[#A1A1AA]">FEATURED PLAYLIST</div>
							<div className="mt-1 font-heading text-[28px] font-extrabold tracking-tight text-[#F5F5F7]">
								Synthwave Essentials
							</div>
							<div className="mt-1 text-[14px] text-[#D4D4D8]">
								Built-in local tracks (synthetic WAVs) so playback works immediately.
							</div>

							<div className="mt-4 flex flex-wrap items-center gap-3">
								<button
									type="button"
									className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#F5F5F7] px-4 py-2 text-[14px] font-semibold text-[#0B0B0F] transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
									onClick={() => player.setQueue(TRACKS, 0, true)}
								>
									<span aria-hidden="true">▶</span>
									Play
								</button>

								<button
									type="button"
									className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1C1C24] px-4 py-2 text-[14px] font-semibold text-[#F5F5F7] ring-1 ring-inset ring-[#2A2A35] transition-colors duration-200 hover:bg-[#1C1C24]/80 focus:outline-none focus:ring-2 focus:ring-white/20"
									onClick={() => {
										if (!player.shuffle) player.toggleShuffle();
										player.setQueue(TRACKS, 0, true);
									}}
								>
									<Shuffle className="h-4 w-4" />
									Shuffle
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mt-5">
				<div className="flex items-center justify-between">
					<h2 className="text-[18px] font-bold text-[#F5F5F7]">Recently Played</h2>
					<button
						type="button"
						className="cursor-pointer text-[14px] font-semibold text-[#A1A1AA] hover:text-[#F5F5F7]"
						onClick={() => player.setQueue(TRACKS, 0, true)}
					>
						Play all
					</button>
				</div>

				<div className="no-scrollbar mt-3 flex gap-4 overflow-x-auto pb-2">
					{TRACKS.map((t, idx) => (
						<button
							key={t.id}
							type="button"
							className="w-[200px] shrink-0 cursor-pointer rounded-2xl bg-[#121218] p-3 text-left ring-1 ring-inset ring-[#2A2A35] transition-colors duration-200 hover:bg-[#161620] focus:outline-none focus:ring-2 focus:ring-white/10"
							onClick={() => player.setQueue(TRACKS, idx, true)}
						>
							<div className="h-[140px] w-full overflow-hidden rounded-xl bg-[#2A2A35]">
								<div className={`h-full w-full ${t.cover.className}`} />
							</div>
							<div className="mt-2 truncate text-[14px] font-semibold text-[#F5F5F7]">{t.title}</div>
							<div className="mt-0.5 truncate text-[12px] text-[#A1A1AA]">{t.artist}</div>
						</button>
					))}
				</div>
			</section>
		</main>
	);
}
