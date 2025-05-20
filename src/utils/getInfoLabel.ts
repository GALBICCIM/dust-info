/**
 * informCode를 한글 정보로 변환하는 함수입니다.
 * @param code informCode { ex) 'PM10', 'PM25', 'O3' }
 * @returns informCode를 한글로 표현한 문자열
 */
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
