export const formatTime = (time: number | undefined) => {
	return time
		? `${(time / 60).toFixed(0)} hours ${time % 60} minutes `
		: 'No time left '
}
