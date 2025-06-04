import React from "react";

import { Link } from "react-router-dom";

import { Button, Text } from "styles/GlobalStyle";

const GoBack: React.FC = () => (
	<Link to={"/"}>
		<Button width="9vw" height="5vh">
			<Text>홈으로 돌아가기</Text>
		</Button>
	</Link>
);

export default GoBack;
