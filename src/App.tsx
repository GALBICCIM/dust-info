import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Info } from "routes";

import GlobalStyle from "styles/GlobalStyle";

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/info" element={<Info />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
