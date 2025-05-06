import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, FineDustInfo, UltraFineDustInfo, OzoneInfo } from "routes";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pm10" element={<FineDustInfo />} />
				<Route path="/pm25" element={<UltraFineDustInfo />} />
				<Route path="/o3" element={<OzoneInfo />} />
			</Routes>
		</Router>
	);
};

export default App;
