import styled from 'styled-components';
import trabajosPintura from '../assets/images/trabajosPintura.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MainScreen = styled.div`
	height: calc(100vh - var(--navbar-height));
	display: grid;
	grid-template-areas: 'left right';
	margin: 0 auto 2rem auto;
	gap: 50px;
	align-items: center;
	@media (max-width: 920px) {
		grid-template-areas: 'left';
	}
`;

const ContainerLeft = styled.div`
	grid-area: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	gap: 0.2rem;
	text-align: center;
`;

const ContainerSearch = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	border-radius: 23px;
	border: 1px solid black;
	padding: 10px;
	width: 100%;
`;

const StyledH1 = styled.h1`
	font-weight: 700;
	font-size: 60px;
	text-align: center;
	padding-bottom: 5%;
`;

const StyledUl = styled.ul`
	font-weight: 600;
	display: flex;
	gap: 5%;
	text-decoration: none;
	list-style: none;
	text-transform: uppercase;
	padding-bottom: 2%;
`;

const Active = styled.li`
	color: #0e76a8;
	cursor: pointer;
`;

const StyledInput = styled.input`
	float: left;
	width: 100%;
	height: 100%;
	font-size: 15px;
	border: none;
	outline: none;
	padding-left: 2%;

	&:active {
		border: none;
	}
`;

const StyledP = styled.p`
	text-align: center;
	padding: 5%;
`;

const ContainerRight = styled.div`
	grid-area: right;
	display: none;
	@media (min-width: 921px) {
		display: block;
	}
`;

const StyledImg = styled.img`
	height: auto;
	max-width: 95%;
`;

const Home = () => {
	return (
		<MainScreen>
			<ContainerLeft>
				<StyledH1>Todos los servicios en un solo lugar.</StyledH1>
				<StyledUl>
					<Active>Contratar</Active>
					<li>Ofrecer un servicio</li>
				</StyledUl>
				<ContainerSearch>
					<StyledInput type="text" placeholder="Buscar" />
					<div>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
				</ContainerSearch>

				<StyledP>
					Encuentra un Plomero, Jardinero, Gasista y más servicios...
				</StyledP>
			</ContainerLeft>
			<ContainerRight>
				<StyledImg src={trabajosPintura} alt="" />
			</ContainerRight>
		</MainScreen>
	);
};

export default Home;
