import React, { useState, useEffect } from "react";
import type { ParsedInfoItem } from "types/InfoItem.type";
import { getDustInfo, getTodayDate } from "utils";
import GoBack from "components/GoBack";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const UltraFineDustInfo: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState<ParsedInfoItem[] | null>(null);
	const searchDate = getTodayDate();

	useEffect(() => {
		const fetchData = async () => {
			const items = await getDustInfo(searchDate, apiKeyEC);
			const pm25Info = items.filter((item: ParsedInfoItem) => item.informCode === "PM25");

			setInfo(pm25Info);
			setIsLoading((prev) => !prev);
		};

		fetchData();
	}, [searchDate]);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && info && (
				<div>
					<h1>초미세먼지 정보</h1>
					<GoBack />

					<ul>
						{info.map((item) => (
							<li key={item.informCode}>
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

export default UltraFineDustInfo;
