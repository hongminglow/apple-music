import { Home, Play } from "lucide-react";

type NavItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

export default function Sidebar() {
  const nav: NavItem[] = [
    { label: "Listen Now", icon: <Play className="h-4 w-4" />, active: true },
    { label: "Browse", icon: <Home className="h-4 w-4" /> },
  ];

  const library = ["Playlists", "Albums", "Artists", "Songs"];

  return (
    <aside className="w-70 shrink-0 bg-[#121218] p-5">
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 rounded-full bg-[#FF2D55]"
          aria-hidden="true"
        />
        <span className="text-[20px] font-bold tracking-tight text-[#F5F5F7]">
          Music
        </span>
      </div>

      <div className="mt-5 text-[12px] font-semibold text-[#A1A1AA]">
        Browse
      </div>

      <nav className="mt-3 space-y-2">
        {nav.map((item) => (
          <button
            key={item.label}
            type="button"
            className={
              "flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2.5 text-left text-[14px] transition-colors " +
              (item.active
                ? "bg-[#1C1C24] text-[#F5F5F7]"
                : "text-[#D4D4D8] hover:bg-[#1C1C24]/60")
            }
          >
            <span className={item.active ? "text-[#F5F5F7]" : "text-[#D4D4D8]"}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-6 text-[12px] font-semibold text-[#A1A1AA]">
        Library
      </div>

      <div className="mt-3 space-y-2">
        {library.map((label) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center rounded-[10px] px-2.5 py-2.5 text-left text-[14px] text-[#D4D4D8] transition-colors hover:bg-[#1C1C24]/60"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-[14px] border border-[#2A2A35] bg-[#0B0B0F]/30 p-3 text-xs text-[#A1A1AA]">
        Tip: This is a UI mock built from your Pencil frame.
      </div>
    </aside>
  );
}
