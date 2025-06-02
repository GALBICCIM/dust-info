import React, { useState } from "react";

import { Link } from "react-router-dom";

import { getTodayDate } from "utils";

import { INFORMATIONS } from "constants/Infos";

import { Text, Wrapper } from "styles/GlobalStyle";
import * as Style from "./styled";

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
			<Text size={4}>대기질 정보 조회</Text>

			<Wrapper alignItems="center" gap={2}>
				<Text size={2}>선택된 날짜 : {searchDate || "없음"}</Text>
				<Text size={2}>선택된 정보 : {selectedInfo || "없음"}</Text>
			</Wrapper>

			<Wrapper flexDirection="row" justifyContent="space-around" gap={10} style={{ width: "80%" }}>
				<Wrapper flexDirection="row" gap={1}>
					<Style.Label htmlFor="inputDate">
						<Text>날짜 선택</Text>
					</Style.Label>
					<input type="date" value={searchDate} onChange={onChangeDate} max={today} id="inputDate" />
				</Wrapper>
				<Wrapper flexDirection="row" gap={1}>
					<Style.Label htmlFor="selectInfo">
						<Text>정보 선택</Text>
					</Style.Label>
					<select value={selectedInfo} onChange={onChangeInfo} id="selectInfo">
						<option value="">--- 조회할 정보를 선택하세요 ---</option>
						{INFORMATIONS.value.map((item, index) => (
							<option value={item}>{INFORMATIONS.text[index]}</option>
						))}
					</select>
				</Wrapper>
			</Wrapper>

			<Link to={"/info"} state={{ searchDate, selectedInfo }}>
				<Style.Button>
					<Text>정보 보러가기</Text>
				</Style.Button>
			</Link>
		</Style.Container>
	);
};

export default Home;
