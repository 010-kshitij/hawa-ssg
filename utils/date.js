export const getDateString = (date) => {
	// Get date and convert to Month Day, Year format (e.g. January 1, 2020)
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(date).toLocaleDateString(undefined, options);
}
