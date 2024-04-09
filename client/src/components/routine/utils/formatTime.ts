export const formatTime = (time: number | undefined) => {
	return time
		? `${Math.floor(time / 60)} hours ${time % 60} minutes `
		: 'No time left '
}
