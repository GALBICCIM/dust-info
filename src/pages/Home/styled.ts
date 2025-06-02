import styled from "styled-components";

import { deepBlue } from "constants/Colors";

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5em;
	background-color: transparent;
`;

export const Label = styled.label`
	padding: 10px 15px;
	background-color: ${deepBlue};
	border: none;
	border-radius: 10px;
`;
