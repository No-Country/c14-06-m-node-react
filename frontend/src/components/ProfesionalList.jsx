import { useLocation } from 'react-router-dom';

const ProfesionalList = () => {
	let { categoryTitle } = useLocation();
	console.log(categoryTitle);
};

export default ProfesionalList;
