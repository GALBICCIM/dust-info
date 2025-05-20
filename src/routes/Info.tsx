import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ParsedInfoItem } from "types/InfoItem.type";
import { getAirQualityInfo, getInfoLabel } from "utils";
import GoBack from "components/GoBack";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const Info: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState<ParsedInfoItem[] | null>(null);
	const location = useLocation();
	const { searchDate, selectedInfo } = location.state as {
		searchDate: string;
		selectedInfo: string;
	};

	const infoLabel = getInfoLabel(selectedInfo);

	useEffect(() => {
		const fetchData = async () => {
			const items = await getAirQualityInfo(searchDate, apiKeyEC);
			const parsedInfo = items.filter((item: ParsedInfoItem) => item.informCode === selectedInfo);

			setInfo(parsedInfo);
			setIsLoading((prev) => !prev);
		};

		fetchData();
	}, [searchDate, selectedInfo]);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && info && (
				<div>
					<h1>{infoLabel} 정보</h1>
					<GoBack />

					<ul>
						{info.map((item, index) => (
							<li key={index}>
								<p>{item.informOverall}</p>
								<ul>
									{item.parsedInformGrade.map((regionInfo) => (
										<li key={regionInfo.region}>
											{regionInfo.region} : {regionInfo.grade}
										</li>
									))}
								</ul>
								<div>{item.imageUrls.map((url, i) => (url ? <img key={i} src={url} alt={`이미지 ${i + 1}`} /> : <h3>이미지 없음</h3>))}</div>
								<p>{item.dataTime}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default Info;
