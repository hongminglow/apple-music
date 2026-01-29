export type Track = {
	id: string;
	title: string;
	artist: string;
	album?: string;
	src: string;
	cover: {
		kind: "gradient";
		className: string;
	};
};

export type RepeatMode = "off" | "one" | "all";
