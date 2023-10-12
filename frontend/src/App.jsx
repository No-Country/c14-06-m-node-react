import { Routes, Route } from 'react-router-dom';
import Categories from './components/Categories';
import ProfesionalsList from './components/ProfesionalsList';
import ComoFunciona from './pages/ComoFunciona';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';

const App = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/categorias" element={<Categories />} />
				<Route
					path="/profesionalsList/:categoryTitle"
					element={<ProfesionalsList />}
				/>
				<Route path="/" element={<Home />} />
				<Route path="/como-funciona" element={<ComoFunciona />} />
				<Route path="/crear-cuenta" element={<CreateAccount />} />
				<Route path="/iniciar-sesion" element={<SignIn />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
