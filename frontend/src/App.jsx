import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProfessionalsList from './components/ProfessionalsList';
import ComoFunciona from './pages/ComoFunciona';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import OfrecerServicio from './pages/OfrecerServicio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LogIn from './pages/LogIn';
import styled from 'styled-components';
import ServicesDetail from './pages/ServicesDetail';
import UserProfile from './pages/UserProfile';

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
const MainContainer = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
`;

const Container = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0rem 1.5rem;
	width: 100%;
`;

const App = () => {
	return (
		<MainContainer>
			<Navbar />
			<ScrollToTop>
				<Container>
					<Routes>
						<Route path="/ofrecer-servicio" element={<OfrecerServicio />} />
						<Route
							path="/professionalsList/:categoryTitle"
							element={<ProfessionalsList />}
						/>
						<Route
							path="/professionalsList/:categoryTitle/:location"
							element={<ProfessionalsList />}
						/>
						<Route path="/" element={<Home />} />
						<Route path="/como-funciona" element={<ComoFunciona />} />
						<Route path="/crear-cuenta" element={<CreateAccount />} />
						<Route path="/iniciar-sesion" element={<LogIn />} />
						<Route path="/servicio/:serviceId" element={<ServicesDetail />} />
						<Route path="/mi-perfil" element={<UserProfile />} />
					</Routes>
				</Container>
			</ScrollToTop>
			<Footer />
		</MainContainer>
	);
};

export default App;
