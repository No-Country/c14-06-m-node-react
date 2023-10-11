import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProfesionalListCard from './ProfesionalListCard';

const ProfesionalsListContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 1.2rem;
	padding: 10px 0;
`;

const ProfesionalsList = () => {
	let { categoryTitle } = useParams();
	console.log(categoryTitle);

	return (
		<ProfesionalsListContainer>
			<Title>Top {categoryTitle}</Title>
			<ProfesionalListCard />
			<ProfesionalListCard />
			<ProfesionalListCard />
			<ProfesionalListCard />
			<ProfesionalListCard />
			<ProfesionalListCard />
			<ProfesionalListCard />
		</ProfesionalsListContainer>
	);
};

export default ProfesionalsList;
