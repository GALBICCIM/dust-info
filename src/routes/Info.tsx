import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { ParsedInfoItem } from "types/InfoItem.type";
import { getDustInfo, getInfoLabel } from "utils";
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
			const items = await getDustInfo(searchDate, apiKeyEC);
			const info = items.filter((item: ParsedInfoItem) => item.informCode === selectedInfo);

			setInfo(info);
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
