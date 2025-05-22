import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ParsedInfoItem } from "types/InfoItem.type";
import { getAirQualityInfo, getInfoLabel } from "utils";
import GoBack from "components/GoBack";
import { REGION_LIST } from "constants/regions";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const Info: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [info, setInfo] = useState<ParsedInfoItem[] | null>(null);
	const location = useLocation();
	const { searchDate, selectedInfo } = location.state as {
		searchDate: string;
		selectedInfo: string;
	};
	const infoLabel = getInfoLabel(selectedInfo);

	const onChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(event.target.value);
	};

	const filteredRegion = info?.flatMap((item) =>
		item.parsedInformGrade.filter((regionInfo) => (selectedRegion === "" ? true : selectedRegion === regionInfo.region))
	);

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

					<select value={selectedRegion} onChange={onChangeRegion}>
						<option value="">--- 지역 필터링 ---</option>
						{REGION_LIST.value.map((item, index) => (
							<option value={item}>{REGION_LIST.text[index]}</option>
						))}
					</select>
					<br />

					<GoBack />

					<ul>
						{info.map((item, index) => (
							<li key={index}>
								<p>{item.informOverall}</p>
								<ul>
									{filteredRegion?.map((regionInfo) => (
										<li key={regionInfo.region}>
											{regionInfo.region} : {regionInfo.grade}
										</li>
									))}
								</ul>
								<div>{item.imageUrls.map((url, i) => (url ? <img key={i} src={url} alt={`이미지 ${i + 1}`} /> : null))}</div>
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
