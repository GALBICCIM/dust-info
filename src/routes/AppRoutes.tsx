import { Routes, Route } from "react-router-dom";

import { Home, Info } from "pages";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/info" element={<Info />} />
	</Routes>
);

export default AppRoutes;
