import React, { useState } from "react";

import { Link } from "react-router-dom";

import { getTodayDate } from "utils";

import * as Style from "styles/Home.styled";

const Home: React.FC = () => {
	const today = getTodayDate();
	const [searchDate, setSearchDate] = useState<string>(today);
	const [selectedInfo, setSelectedInfo] = useState<string>("");

	const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchDate(event.target.value);
	};

	const onChangeInfo = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedInfo(event.target.value);
	};

	return (
		<Style.Container>
			<Style.Text size={4}>대기질 정보 조회</Style.Text>

			<h2>선택된 날짜 : {searchDate || "없음"}</h2>
			<h2>선택된 정보 : {selectedInfo || "없음"}</h2>

			<div>
				<div>
					날짜 선택
					<input type="date" value={searchDate} onChange={onChangeDate} max={today} />
				</div>
				<div>
					정보 선택
					<select value={selectedInfo} onChange={onChangeInfo}>
						<option value="">--- 조회할 정보를 선택하세요 ---</option>
						<option value="PM10">미세먼지</option>
						<option value="PM25">초미세먼지</option>
						<option value="O3">오존</option>
					</select>
				</div>
			</div>

			<Link to={"/info"} state={{ searchDate, selectedInfo }}>
				정보 보러가기
			</Link>
		</Style.Container>
	);
};

export default Home;
