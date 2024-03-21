export const formatTime = (time: number) => {
	if (time < 60) return `${time.toFixed(0)} sec`
	else if (time < 3600) return `${(time / 60).toFixed(0)} min`
	else return `${(time / 3600).toFixed(0)} hours`
}
