import { Search, Shuffle } from "lucide-react";

type RecentItem = {
  title: string;
  subtitle: string;
};

const recent: RecentItem[] = [
  { title: "Chill Beats", subtitle: "Playlist" },
  { title: "Night Drive", subtitle: "Playlist" },
  { title: "Lo-Fi Focus", subtitle: "Station" },
  { title: "Synth Classics", subtitle: "Album" },
  { title: "Indie Mix", subtitle: "Playlist" },
];

export default function MainContent() {
  return (
    <main className="min-w-0 flex-1 p-6">
      <h1 className="text-[28px] font-extrabold tracking-tight text-[#F5F5F7]">
        Listen Now
      </h1>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex h-10 w-105 max-w-full items-center gap-2.5 rounded-xl bg-[#1C1C24] px-3">
          <Search className="h-4 w-4 text-[#A1A1AA]" />
          <input
            className="w-full bg-transparent text-[14px] text-[#F5F5F7] outline-none placeholder:text-[#A1A1AA]"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </div>

      <section className="mt-5">
        <div className="rounded-[18px] bg-[#121218] p-5">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <div className="h-45 w-45 shrink-0 overflow-hidden rounded-2xl bg-[#2A2A35]">
              <div className="h-full w-full bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#3A3A4A]" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-semibold text-[#A1A1AA]">
                FEATURED PLAYLIST
              </div>
              <div className="mt-1 text-[28px] font-extrabold tracking-tight text-[#F5F5F7]">
                Synthwave Essentials
              </div>
              <div className="mt-1 text-[14px] text-[#D4D4D8]">
                A neon-lit mix of retro synths and modern beats.
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F5F5F7] px-4 py-2 text-[14px] font-semibold text-[#0B0B0F] transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#0B0B0F]/0">
                    ▶
                  </span>
                  Play
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1C1C24] px-4 py-2 text-[14px] font-semibold text-[#F5F5F7] ring-1 ring-inset ring-[#2A2A35] transition-colors hover:bg-[#1C1C24]/80 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <Shuffle className="h-4.5 w-4.5" />
                  Shuffle
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#F5F5F7]">
            Recently Played
          </h2>
          <button
            type="button"
            className="text-[14px] font-semibold text-[#A1A1AA] hover:text-[#F5F5F7]"
          >
            See all
          </button>
        </div>

        <div className="no-scrollbar mt-3 flex gap-4 overflow-x-auto pb-2">
          {recent.map((item) => (
            <button
              key={item.title}
              type="button"
              className="w-50 shrink-0 rounded-2xl bg-[#121218] p-3 text-left transition-colors hover:bg-[#161620] focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              <div className="h-35 w-full overflow-hidden rounded-xl bg-[#2A2A35]">
                <div className="h-full w-full bg-linear-to-br from-[#2A2A35] via-[#1C1C24] to-[#2A2A35]" />
              </div>
              <div className="mt-2 text-[14px] font-semibold text-[#F5F5F7]">
                {item.title}
              </div>
              <div className="mt-0.5 text-[12px] text-[#A1A1AA]">
                {item.subtitle}
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
