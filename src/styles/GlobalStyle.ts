import styled, { createGlobalStyle } from "styled-components";

import type { StyledItemProps } from "types/Style.type";

import { deepSky, deepBlue } from "constants/Colors";

export const GlobalStyle = createGlobalStyle`
   html {
      background-color: ${deepSky};
   }

   html, body, div, span, applet, object, iframe,
   h1, h2, h3, h4, h5, h6, p, blockquote, pre,
   a, abbr, acronym, address, big, cite, code,
   del, dfn, em, img, ins, kbd, q, s, samp,
   small, strike, strong, sub, sup, tt, var,
   b, u, i, center,
   dl, dt, dd, ol, ul, li,
   fieldset, form, label, legend,
   table, caption, tbody, tfoot, thead, tr, th, td,
   article, aside, canvas, details, embed, 
   figure, figcaption, footer, header, hgroup, 
   menu, nav, output, ruby, section, summary,
   time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
   }

   article, aside, details, figcaption, figure, 
   footer, header, hgroup, menu, nav, section {
      display: block;
   }

   body {
      line-height: 1;
   }

   ol, ul {
      list-style: none;
   }

   blockquote, q {
      quotes: none;
   }
   
   blockquote:before, blockquote:after,
   q:before, q:after {
      content: '';
      content: none;
   }

   table {
      border-collapse: collapse;
      border-spacing: 0;
   }
`;

export const Wrapper = styled.div<StyledItemProps>`
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection || "column"};
	justify-content: ${({ justifyContent }) => justifyContent || "normal"};
	align-items: ${({ alignItems }) => alignItems || "normal"};
	gap: ${({ gap }) => gap || 0}em;
`;

export const Text = styled.p<StyledItemProps>`
	font-size: ${({ size }) => size || 1}rem;
	color: ${({ color }) => color || "white"};
`;

export const Button = styled.button<StyledItemProps>`
	width: ${({ width }) => width || "auto"};
	height: ${({ height }) => height || "auto"};
	background-color: ${deepBlue};
	border: none;
	border-radius: 30px;
	cursor: pointer;
`;
