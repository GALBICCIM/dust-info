import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	const [date, setDate] = useState<string>("");
	const [selectedInfo, setSelectedInfo] = useState<string>("");

	const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDate(event.target.value);
	};

	const onChangeInfo = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedInfo(event.target.value);
	};

	return (
		<div>
			<h1>메인 페이지입니다.</h1>

			<div>
				<label>
					날짜 선택
					<input type="date" value={date} onChange={onChangeDate} />
				</label>
				<br />
				<label>
					정보 선택
					<select value={selectedInfo} onChange={onChangeInfo}>
						<option value="">---조회할 정보를 선택하세요.---</option>
						<option value="PM10">미세먼지</option>
						<option value="PM25">초미세먼지</option>
						<option value="O3">오존</option>
					</select>
				</label>
			</div>

			<h2>선택된 날짜 : {date || "없음"}</h2>
			<h2>선택된 정보 : {selectedInfo || "없음"}</h2>

			<Link to={selectedInfo === "O3" ? "ozone" : selectedInfo.toLowerCase()}>정보 보러가기</Link>
		</div>
	);
};

export default Home;
