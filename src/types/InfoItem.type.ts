export interface InfoItem {
	informCode: string;
	informGrade: string;
	informOverall: string;
	dataTime: string;
	imageUrl1: string;
	imageUrl2: string;
	imageUrl3: string;
}

export interface RegionGrade {
	region: string;
	grade: string;
}

export interface ParsedInfoItem extends InfoItem {
	parsedInformGrade: RegionGrade[];
	imageUrls: [string, string, string];
}
