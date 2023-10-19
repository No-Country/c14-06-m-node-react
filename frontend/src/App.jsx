import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProfesionalsList from './components/ProfesionalsList';
import ComoFunciona from './pages/ComoFunciona';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import OfrecerServicio from './pages/OfrecerServicio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import styled from 'styled-components';

const ScrollToTop = ({ children }) => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return <>{children}</>;
};
ScrollToTop.propTypes = {
	children: PropTypes.node.isRequired,
};

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;
const App = () => {
	return (
		<>
			<Navbar />
			<ScrollToTop>
				<Container>
					<Routes>
						<Route path="/ofrecer-servicio" element={<OfrecerServicio />} />
						<Route
							path="/profesionalsList/:categoryTitle"
							element={<ProfesionalsList />}
						/>
						<Route path="/" element={<Home />} />
						<Route path="/como-funciona" element={<ComoFunciona />} />
						<Route path="/crear-cuenta" element={<CreateAccount />} />
						<Route path="/iniciar-sesion" element={<LogIn />} />
					</Routes>
					<Footer />
				</Container>
			</ScrollToTop>
		</>
	);
};

export default App;
