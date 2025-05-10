export interface InfoItem {
	informCode: string;
	informGrade: string;
	informOverall: string;
	dataTime: string;
}

export interface RegionGrade {
	region: string;
	grade: string;
}

export interface ParsedInfoItem extends InfoItem {
	parsedInformGrade: RegionGrade[];
}
