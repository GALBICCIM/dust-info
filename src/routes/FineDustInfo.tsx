import React, { useState, useEffect } from "react";
import type { InfoItem } from "types/InfoItem.type";
import GoBack from "components/GoBack";

const apiKeyEC = import.meta.env.VITE_API_KEY_EC;

const FineDustInfo: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [info, setInfo] = useState<InfoItem[] | null>(null);

	const getDustInfo = async () => {
		try {
			const data = await (
				await fetch(
					`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKeyEC}&returnType=json&numOfRows=100&pageNo=1&searchDate=2025-05-06&InformCode=PM10`
				)
			).json();

			const items: InfoItem[] = data.response?.body?.items ?? [];

			setInfo(items);
		} catch (error) {
			console.error("Data fetch failed: ", error);
		} finally {
			setIsLoading((prev) => !prev);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await getDustInfo();
		};

		fetchData();
	}, []);

	return (
		<>
			{isLoading && <h1>Loading...</h1>}
			{!isLoading && info && (
				<ul>
					{info.map((item, index) => (
						<li key={index}>
							<p>{item.informCode}</p>
							<p>{item.informGrade}</p>
							<p>{item.informOverall}</p>
							<p>{item.informData}</p>
							<p>{item.dateTime}</p>
						</li>
					))}
				</ul>
			)}

			<GoBack />
		</>
	);
};

export default FineDustInfo;
