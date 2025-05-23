import styled from "styled-components";

import type { HomeStyleProps } from "types/Style.type";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Text = styled.p<HomeStyleProps>`
	font-size: ${({ size }) => size || 1}rem;
`;
