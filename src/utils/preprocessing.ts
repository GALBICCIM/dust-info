import type { RegionGrade } from "types/Info.type";

export const parseInformGrade = (rawGrade: string): RegionGrade[] => {
	if (!rawGrade) return [];

	return rawGrade.split(",").map((item) => {
		const [region, grade] = item.split(/ *: */);

		return { region, grade };
	});
};

export const removePrefix = (rawText: string): string => {
	if (!rawText) return "";

	return rawText.replace(/^○ \[[^\]]+\]\s*/, "");
};
