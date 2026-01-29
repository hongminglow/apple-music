import type { ReactNode } from "react";

import { Album, Home, ListMusic, Mic2, Play, Radio } from "lucide-react";

type NavItem = {
	id: string;
	label: string;
	icon: ReactNode;
	active?: boolean;
};

export default function Sidebar() {
	const nav: NavItem[] = [
		{ id: "listen", label: "Listen Now", icon: <Play className="h-4 w-4" />, active: true },
		{ id: "browse", label: "Browse", icon: <Home className="h-4 w-4" /> },
		{ id: "radio", label: "Radio", icon: <Radio className="h-4 w-4" /> },
	];

	const library: NavItem[] = [
		{ id: "playlists", label: "Playlists", icon: <ListMusic className="h-4 w-4" /> },
		{ id: "albums", label: "Albums", icon: <Album className="h-4 w-4" /> },
		{ id: "artists", label: "Artists", icon: <Mic2 className="h-4 w-4" /> },
	];

	return (
		<aside className="w-[280px] shrink-0 bg-[#121218] p-5">
			<div className="flex items-center gap-2.5">
				<span className="h-3 w-3 rounded-full bg-[#FF2D55]" aria-hidden="true" />
				<span className="font-heading text-[20px] font-bold tracking-tight text-[#F5F5F7]">Music</span>
			</div>

			<div className="mt-5 text-[12px] font-semibold text-[#A1A1AA]">Browse</div>

			<nav className="mt-3 space-y-2" aria-label="Browse">
				{nav.map((item) => (
					<button
						key={item.id}
						type="button"
						className={
							"flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2.5 text-left text-[14px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/10 " +
							(item.active ? "bg-[#1C1C24] text-[#F5F5F7]" : "text-[#D4D4D8] hover:bg-[#1C1C24]/60")
						}
					>
						<span className={item.active ? "text-[#F5F5F7]" : "text-[#D4D4D8]"}>{item.icon}</span>
						<span>{item.label}</span>
					</button>
				))}
			</nav>

			<div className="mt-6 text-[12px] font-semibold text-[#A1A1AA]">Library</div>

			<nav className="mt-3 space-y-2" aria-label="Library">
				{library.map((item) => (
					<button
						key={item.id}
						type="button"
						className="flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2.5 text-left text-[14px] text-[#D4D4D8] transition-colors duration-200 hover:bg-[#1C1C24]/60 focus:outline-none focus:ring-2 focus:ring-white/10"
					>
						<span className="text-[#D4D4D8]">{item.icon}</span>
						<span>{item.label}</span>
					</button>
				))}
			</nav>

			<div className="mt-6 rounded-[14px] border border-[#2A2A35] bg-[#0B0B0F]/30 p-3 text-xs text-[#A1A1AA]">
				Audio is local: see src/player/README.md.
			</div>
		</aside>
	);
}
