import type { RegionGrade, InfoItem, ParsedInfoItem } from "types/Info.type";

const parseInformGrade = (rawGrade: string): RegionGrade[] => {
	if (!rawGrade) return [];

	return rawGrade.split(",").map((item) => {
		const [region, grade] = item.split(/ *: */);

		return { region, grade };
	});
};

const removePrefix = (rawText: string): string => {
	if (!rawText) return "";

	return rawText.replace(/^○ \[[^\]]+\]\s*/, "");
};

/**
 * 실시간 미세먼지, 초미세먼지, 오존 정보를 불러오는 함수입니다.
 * @param searchDate 검색할 날짜
 * @param apiKey API 키
 * @returns 정규화한 정보 객체의 배열
 */
export const getAirQualityInfo = async (searchDate: string, apiKey: string): Promise<ParsedInfoItem[]> => {
	try {
		const data = await (
			await fetch(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKey}&returnType=json&searchDate=${searchDate}`)
		).json();
		const items: InfoItem[] = data.response?.body?.items ?? [];
		const parsedItems: ParsedInfoItem[] = items.map((item) => ({
			...item,
			parsedInformGrade: parseInformGrade(item.informGrade),
			cleanedInformOverall: removePrefix(item.informOverall),
			imageUrls: [item.imageUrl1, item.imageUrl2, item.imageUrl3],
		}));

		return parsedItems;
	} catch (error) {
		console.error("Data fetch failed: ", error);

		return [];
	}
};
