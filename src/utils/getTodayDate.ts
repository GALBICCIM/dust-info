/**
 * 날짜를 불러오는 함수입니다.
 * @returns 포맷팅된 날짜 { ex) YYYY-MM-DD }
 */
export const getTodayDate = (): string => {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};
