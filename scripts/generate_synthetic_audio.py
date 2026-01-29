import math
import os
import struct
import wave


def write_wav(path: str, seconds: float, freqs: list[float], sr: int = 44100, amp: float = 0.25) -> None:
    nframes = int(seconds * sr)
    with wave.open(path, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sr)

        fade_frames = int(sr * 0.02)
        for i in range(nframes):
            t = i / sr
            sample = 0.0
            for f in freqs:
                sample += math.sin(2 * math.pi * f * t)
            sample /= max(1, len(freqs))
            sample *= amp

            fade = 1.0
            if fade_frames > 0:
                fade = min(1.0, i / fade_frames, (nframes - 1 - i) / fade_frames)

            s = int(max(-1.0, min(1.0, sample * fade)) * 32767)
            wf.writeframes(struct.pack("<hh", s, s))


def main() -> None:
    outdir = os.path.join("public", "audio")
    os.makedirs(outdir, exist_ok=True)

    tracks = [
        ("track-1.wav", 18, [220.00, 277.18, 329.63]),
        ("track-2.wav", 20, [196.00, 246.94, 293.66]),
        ("track-3.wav", 16, [261.63, 329.63, 392.00]),
        ("track-4.wav", 22, [174.61, 220.00, 261.63]),
        ("track-5.wav", 19, [233.08, 293.66, 349.23]),
    ]

    for name, sec, freqs in tracks:
        write_wav(os.path.join(outdir, name), sec, freqs)

    print("Generated:")
    for name, sec, freqs in tracks:
        print(f"- {outdir}/{name} ({sec}s, freqs={freqs})")


if __name__ == "__main__":
    main()
