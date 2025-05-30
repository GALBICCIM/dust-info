import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import type { ParsedInfoItem } from "types/Info.type";

import { getAirQualityInfo, getInfoLabel } from "utils";

import GoBack from "components/GoBack";

import { REGION_LIST } from "constants/Regions";

import * as Style from "styles/Info.styled";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const Info: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [selectedRegion, setSelectedRegion] = useState<string>("");
	const [info, setInfo] = useState<ParsedInfoItem | null>(null);

	const location = useLocation();
	const { searchDate, selectedInfo } = location.state as {
		searchDate: string;
		selectedInfo: string;
	};

	const infoLabel = getInfoLabel(selectedInfo);

	const onChangeRegion = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(event.target.value);
	};

	const filteredRegion = info?.parsedInformGrade.filter((regionInfo) => (selectedRegion === "" ? true : selectedRegion === regionInfo.region));

	useEffect(() => {
		const fetchData = async () => {
			const items = await getAirQualityInfo(searchDate, apiKeyEC);
			const parsedInfo = items.filter((item: ParsedInfoItem) => item.informCode === selectedInfo);

			setInfo(parsedInfo[0]);
			setIsLoading((prev) => !prev);
		};

		fetchData();
	}, [searchDate, selectedInfo]);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && info && (
				<div>
					<Style.Header>
						<h1>{infoLabel} 정보</h1>

						<select value={selectedRegion} onChange={onChangeRegion}>
							<option value="">모든 지역</option>
							{REGION_LIST.map((item) => (
								<option value={item}>{item}</option>
							))}
						</select>
						<GoBack />
					</Style.Header>
					<br />

					<p>{info.cleanedInformOverall}</p>
					<ul>
						{filteredRegion?.map((regionInfo) => (
							<li key={regionInfo.region}>
								{regionInfo.region} : {regionInfo.grade}
							</li>
						))}
					</ul>
					<div>{info.imageUrls.map((url, index) => (url ? <img key={index} src={url} alt={`이미지 ${index + 1}`} /> : null))}</div>
					<p>{info.dataTime}</p>
				</div>
			)}
		</>
	);
};

export default Info;
