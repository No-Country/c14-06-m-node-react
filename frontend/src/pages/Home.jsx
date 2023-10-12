import styled from 'styled-components';
import trabajosPintura from '../assets/images/trabajosPintura.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ContainerHome = styled.div`
	padding: 5%;
	display: flex;
	justify-content: space-evenly;
	gap: 5%;
`;

const ContainerLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const ContainerSearch = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	border-radius: 23px;
	border: 1px solid black;
	padding: 10px;
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

const StyledLi = styled.li`
	&:active {
		color: #0e76a8;
	}
`;

const StyledInput = styled.input`
	float: left;
	width: 100%;
	height: 100%;
	font-size: 15px;
	border: none;
	outline: none;
	cursor: pointer;
	padding-left: 2%;

	&:active {
		border: none;
	}
`;

const StyledP = styled.p`
	text-align: center;
	padding: 5%;
`;
const Home = () => {
	return (
		<ContainerHome>
			<ContainerLeft>
				<StyledH1>Todos los servicios en un solo lugar.</StyledH1>
				<StyledUl>
					<StyledLi>Contratar</StyledLi>
					<StyledLi>Ofrecer un servicio</StyledLi>
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
			<div>
				<img src={trabajosPintura} alt="" />
			</div>
		</ContainerHome>
	);
};

export default Home;
