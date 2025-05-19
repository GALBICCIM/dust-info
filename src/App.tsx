import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Info } from "routes";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/info" element={<Info />} />
			</Routes>
		</Router>
	);
};

export default App;
