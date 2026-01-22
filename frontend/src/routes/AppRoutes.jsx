import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndabaxHome from '../pages/IndabaxHome';
import NotFound from '../pages/NotFound.jsx';

const AppRoutes = () => (
	<Router>
		<Routes>
			<Route path="/indabax" element={<IndabaxHome />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</Router>
);

export default AppRoutes;
