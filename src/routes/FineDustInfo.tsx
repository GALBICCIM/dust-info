import React, { useState, useEffect } from "react";
import type { ParsedInfoItem } from "types/InfoItem.type";
import { getDustInfo, getTodayDate } from "utils";
import GoBack from "components/GoBack";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const FineDustInfo: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState<ParsedInfoItem[] | null>(null);
	const searchDate = getTodayDate();

	useEffect(() => {
		const fetchData = async () => {
			const items = await getDustInfo(searchDate, apiKeyEC);
			const pm10Info = items.filter((item: ParsedInfoItem) => item.informCode === "PM10");

			setInfo(pm10Info);
			setIsLoading((prev) => !prev);
		};

		fetchData();
	}, [searchDate]);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && info && (
				<div>
					<h1>미세먼지 정보</h1>
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

export default FineDustInfo;
