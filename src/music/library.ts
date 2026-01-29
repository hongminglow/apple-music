import type { Track } from "./types";

export const TRACKS: Track[] = [
	{
		id: "t1",
		title: "Neon Drift",
		artist: "Sinewave Collective",
		album: "Synthetic Sessions",
		src: "/audio/track-1.mp3",
		cover: {
			kind: "gradient",
			className: "bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#FF2D55]/40",
		},
	},
	{
		id: "t2",
		title: "Midnight Circuit",
		artist: "Analog Dreams",
		album: "City Lights",
		src: "/audio/track-2.mp3",
		cover: {
			kind: "gradient",
			className: "bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#4338CA]/45",
		},
	},
	{
		id: "t3",
		title: "Focus Mode",
		artist: "Lo-Fi Lab",
		album: "Deep Work",
		src: "/audio/track-3.mp3",
		cover: {
			kind: "gradient",
			className: "bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#22C55E]/35",
		},
	},
	{
		id: "t4",
		title: "Night Drive",
		artist: "Retro Highway",
		album: "After Hours",
		src: "/audio/track-4.mp3",
		cover: {
			kind: "gradient",
			className: "bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#F59E0B]/30",
		},
	},
	{
		id: "t5",
		title: "Glass Skyline",
		artist: "Velvet Pulse",
		album: "Downtown",
		src: "/audio/track-5.wav",
		cover: {
			kind: "gradient",
			className: "bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#38BDF8]/35",
		},
	},
];
