import {
  Heart,
  ListMusic,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

function ProgressBar({ value }: { value: number }) {
  const clamped = Math.min(1, Math.max(0, value));
  return (
    <div className="h-1 w-full rounded-full bg-[#2A2A35]">
      <div
        className="h-1 rounded-full bg-[#F5F5F7]"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}

export default function PlayerBar() {
  return (
    <footer className="h-[96px] w-full bg-[#121218] px-4 py-4">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4">
        <div className="flex w-[360px] min-w-0 items-center gap-3">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-[#2A2A35]" />
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold text-[#F5F5F7]">
              Midnight City
            </div>
            <div className="truncate text-[12px] text-[#A1A1AA]">M83</div>
          </div>
          <button
            type="button"
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-[#D4D4D8] hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
            aria-label="Like"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#D4D4D8] hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
              aria-label="Previous"
            >
              <SkipBack className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F7] text-[#0B0B0F] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Play"
            >
              <Play className="h-[18px] w-[18px] fill-[#0B0B0F]" />
            </button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#D4D4D8] hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
              aria-label="Next"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <div className="flex w-full items-center gap-2.5">
            <div className="w-[42px] text-right text-[12px] text-[#A1A1AA]">
              1:12
            </div>
            <ProgressBar value={0.37} />
            <div className="w-[42px] text-[12px] text-[#A1A1AA]">3:45</div>
          </div>
        </div>

        <div className="flex w-[240px] items-center justify-end gap-3 text-[#D4D4D8]">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
            aria-label="Queue"
          >
            <ListMusic className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#1C1C24] hover:text-[#F5F5F7] focus:outline-none focus:ring-2 focus:ring-white/10"
            aria-label="Volume"
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <div className="w-[120px]">
            <div className="h-1 rounded-full bg-[#2A2A35]">
              <div className="h-1 w-[60%] rounded-full bg-[#F5F5F7]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
