export function formatTime(totalSeconds: number): string {
	if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
	const seconds = Math.floor(totalSeconds);
	const minutesPart = Math.floor(seconds / 60);
	const secondsPart = seconds % 60;
	return `${minutesPart}:${secondsPart.toString().padStart(2, "0")}`;
}
