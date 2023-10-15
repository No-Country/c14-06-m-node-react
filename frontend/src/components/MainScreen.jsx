import styled from 'styled-components';
import trabajosPintura from '../assets/images/trabajosPintura.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const MainScreen = styled.div`
	height: calc(100vh - var(--navbar-height));
	display: grid;
	grid-template-areas: 'left right';
	align-items: center;
	@media (max-width: 920px) {
		grid-template-areas: 'left';
	}
	gap: 3rem;
`;

const ContainerLeft = styled.div`
	grid-area: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	gap: 0.2rem;
	text-align: center;
	height: 100%;
`;

const ContainerSearch = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	border-radius: 23px;
	border: 1px solid black;
	padding: 10px;
	background-color: white;
`;

const StyledSlogan = styled.span`
	font-weight: 700;
	font-size: 2.6rem;
	text-align: center;
	padding-bottom: 4rem;
	color: rgb(0, 0, 0, 0.8);
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
	width: 100%;
	height: 100%;
	font-size: 15px;
	border: none;
	outline: none;
	padding-left: 2%;

	&:active {
		border: none;
	}
	&:focus {
		border: 2px solid #0e76a8;
	}
`;

const StyledP = styled.p`
	text-align: center;
	padding: 5%;
`;

const ContainerRight = styled.div`
	grid-area: right;
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: 1rem;

	@media (max-width: 921px) {
		display: none;
	}
`;

const StyledImg = styled.img`
	height: auto;
	max-width: 100%;
`;

const Home = () => {
	return (
		<MainScreen>
			<ContainerLeft>
				<StyledSlogan>Todos los servicios en un solo lugar.</StyledSlogan>
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
