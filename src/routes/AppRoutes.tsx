import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Info } from "pages";

const AppRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/info" element={<Info />} />
	</Routes>
);

export default AppRoutes;
