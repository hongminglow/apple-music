# Apple Music — React + Tailwind (fully functional)

Apple Music–style desktop UI built from the included PENCIL design frame, with a real, working audio player (play/pause, seek, volume, next/prev, shuffle, repeat, queue).

Audio is **local**:

- This repo generates a few short **synthetic WAV** tracks in `public/audio/` so playback works out of the box (no copyrighted assets).
- You can replace them with your own files by updating `src/music/library.ts`.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. (Optional) Regenerate the built-in tracks:

```bash
python3 scripts/generate_synthetic_audio.py
```

3. Build for production:

```bash
npm run build
```

Notes

- Design reference: `pencil-new.pen`
- UI design-system output: `design-system/apple-music/MASTER.md`
