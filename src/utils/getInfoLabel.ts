export const getInfoLabel = (code: string): string => {
	switch (code) {
		case "PM10":
			return "미세먼지";
		case "PM25":
			return "초미세먼지";
		case "O3":
			return "오존";
		default:
			return "???";
	}
};
