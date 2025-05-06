import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<>
			<h1>메인 페이지입니다.</h1>

			<Link to={"/pm10"}>미세먼지 정보 보러가기</Link>
			<Link to={"/pm25"}>초미세먼지 정보 보러가기</Link>
			<Link to={"/ozone"}>오존 정보 보러가기</Link>
		</>
	);
};

export default Home;
