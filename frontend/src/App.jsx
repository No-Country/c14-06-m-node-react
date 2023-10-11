import { Routes, Route } from 'react-router-dom';
import Categories from './components/Categories';
import ProfesionalList from './components/ProfesionalList';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Categories />} />
			<Route path="/profesionalsList" element={<ProfesionalList />} />
		</Routes>
	);
};

export default App;
