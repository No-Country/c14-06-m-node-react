import { Routes, Route } from 'react-router-dom';
import Categories from './components/Categories';
import ProfesionalsList from './components/ProfesionalsList';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Categories />} />
			<Route
				path="/profesionalsList/:categoryTitle"
				element={<ProfesionalsList />}
			/>
		</Routes>
	);
};

export default App;
