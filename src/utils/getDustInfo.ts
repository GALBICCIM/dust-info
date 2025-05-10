import type { RegionGrade, InfoItem, ParsedInfoItem } from "types/InfoItem.type";

const parseInformGrade = (rawGrade: string): RegionGrade[] => {
	if (!rawGrade) return [];

	return rawGrade.split(",").map((item) => {
		const [region, grade] = item.split(/ *: */);

		return { region, grade };
	});
};

/**
 * 실시간 미세먼지, 초미세먼지, 오존 정보를 불러오는 함수입니다.
 * @param searchDate 검색할 날짜
 * @param apiKey API 키
 * @returns 미세먼지 정보 객체의 배열
 */
export const getDustInfo = async (searchDate: string, apiKey: string): Promise<ParsedInfoItem[]> => {
	try {
		const data = await (
			await fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKey}&returnType=json&searchDate=${searchDate}`)
		).json();
		const items: InfoItem[] = data.response?.body?.items ?? [];
		const parsedItems: ParsedInfoItem[] = items.map((item) => ({
			...item,
			parsedInformGrade: parseInformGrade(item.informGrade),
		}));

		return parsedItems;
	} catch (error) {
		console.error("Data fetch failed: ", error);

		return [];
	}
};
