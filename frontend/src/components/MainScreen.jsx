import styled from 'styled-components';
import trabajosPintura from '../assets/images/trabajosPintura.png';
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';*/
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ButtonBlue } from '../styledcomponents/Buttons';
import { useState } from 'react';

const MainScreen = styled.div`
	min-height: calc(100vh - var(--navbar-height));
	display: grid;
	grid-template-areas: 'left right';
	align-items: center;
	@media (max-width: 920px) {
		grid-template-areas: 'left';
	}
	gap: 3rem;

	a {
		color: var(--primary);
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
	height: 100%;
`;

/*
const ContainerSearch = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	border-radius: 23px;
	border: 1px solid black;
	padding: 10px;
	background-color: white;
`;
*/
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

/*
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
*/
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

	@media (max-width: 920px) {
		display: none;
	}
`;

const StyledImg = styled.img`
	height: auto;
	max-width: 100%;
`;

const StyledLink = styled(Link)`
	&:hover {
		color: var(--primary);
	}
`;

const Select = styled.select`
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	appearance: auto;
	max-height: 100px;
	overflow-y: auto;
	height: 50px;
	font-size: 1.1rem;
`;

const Buscar = styled.div`
	display: flex;
	flex-wrap: nowrap;
	gap: 0.4rem;
	align-items: center;
	flex-direction: row;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const Home = () => {
	const professions = [
		{ label: 'Albañiles', value: 'bricklayer' },
		{ label: 'Carpinteros', value: 'carpenter' },
		{ label: 'Cerrajeros', value: 'locksmith' },
		{ label: 'Electricistas', value: 'electrician' },
		{ label: 'Fleteros', value: 'freight' },
		{ label: 'Fumigadores', value: 'fumigator' },
		{ label: 'Gasistas', value: 'gas-fitter' },
		{ label: 'Jardineros', value: 'gardener' },
		{ label: 'Pintores', value: 'painter' },
		{ label: 'Plomeros', value: 'plumber' },
		{
			label: 'Técnicos en Aire Acondicionado',
			value: 'air-conditioner',
		},
		{ label: 'Técnicos en Electrodomesticos', value: 'appliance' },
	];

	const provincias = [
		{ label: 'Buenos Aires', value: 'Buenos Aires' },
		{ label: 'Catamarca', value: 'Catamarca' },
		{ label: 'Chaco', value: 'Chaco' },
		{ label: 'Chubut', value: 'Chubut' },
		{ label: 'Córdoba', value: 'Córdoba' },
		{ label: 'Corrientes', value: 'Corrientes' },
		{ label: 'Entre Ríos', value: 'Entre Ríos' },
		{ label: 'Formosa', value: 'Formosa' },
		{ label: 'Jujuy', value: 'Jujuy' },
		{ label: 'La Pampa', value: 'La Pampa' },
		{ label: 'La Rioja', value: 'La Rioja' },
		{ label: 'Mendoza', value: 'Mendoza' },
		{ label: 'Misiones', value: 'Misiones' },
		{ label: 'Neuquén', value: 'Neuquén' },
		{ label: 'Río Negro', value: 'Río Negro' },
		{ label: 'Salta', value: 'Salta' },
		{ label: 'San Juan', value: 'San Juan' },
		{ label: 'San Luis', value: 'San Luis' },
		{ label: 'Santa Cruz', value: 'Santa Cruz' },
		{ label: 'Santa Fe', value: 'Santa Fe' },
		{ label: 'Santiago del Estero', value: 'Santiago del Estero' },
		{ label: 'Tierra del Fuego', value: 'Tierra del Fuego' },
		{ label: 'Tucumán', value: 'Tucumán' },
	];

	const [selectedProfession, setSelectedProfession] = useState('');
	const [selectedProvince, setSelectedProvince] = useState('');
	const isSelectProvinceDisabled = !selectedProfession;

	const handleProfessionChange = (event) => {
		setSelectedProfession(event.target.value);
		setSelectedProvince('');
	};

	const handleProvinceChange = (event) => {
		setSelectedProvince(event.target.value);
	};

	const generateUrl = () => {
		let url = '/professionalsList';

		if (selectedProfession) {
			url += `/${selectedProfession}`;
		}

		if (selectedProvince) {
			if (selectedProfession) {
				url += '/';
			}
			url += selectedProvince;
		}

		return url;
	};
	const IsLoggedIn = localStorage.token ? true : false;
	return (
		<MainScreen>
			<ContainerLeft>
				<StyledSlogan>Todos los servicios en un solo lugar.</StyledSlogan>
				<StyledUl>
					<Active>Contratar</Active>
					<li>
						{IsLoggedIn ? (
							<StyledLink to="/ofrecer-servicio">
								Ofrecer un servicio
							</StyledLink>
						) : (
							<StyledLink to="/iniciar-sesion">Ofrecer un servicio</StyledLink>
						)}
					</li>
				</StyledUl>
				{/** <ContainerSearch>
					<StyledInput type="text" placeholder="Buscar" />
					<div>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</div>
				</ContainerSearch>
				*/}
				<Buscar>
					<Select
						id="profession"
						value={selectedProfession}
						onChange={handleProfessionChange}
						defaultValue=""
						placeholder="Selecciona una categoría"
					>
						<option value="" disabled>
							Selecciona una categoría
						</option>
						{professions.map((profession) => (
							<option key={profession.value} value={profession.value}>
								{profession.label}
							</option>
						))}
					</Select>
					<Select
						id="province"
						defaultValue=""
						placeholder="Selecciona una provincia"
						value={selectedProvince}
						onChange={handleProvinceChange}
						disabled={isSelectProvinceDisabled}
					>
						<option value="" disabled>
							Selecciona una provincia
						</option>
						{provincias.map((provincia) => (
							<option key={provincia.value} value={provincia.value}>
								{provincia.label}
							</option>
						))}
					</Select>
					<Link to={generateUrl()}>
						<ButtonBlue>Buscar</ButtonBlue>
					</Link>
				</Buscar>
				<StyledP>
					Encuentra un
					<Link to="/professionalsList/plumber"> Plomero</Link>,
					<Link to="/professionalsList/gardener"> Jardinero</Link>,
					<Link to="/professionalsList/gas-fitter"> Gasista</Link>, &nbsp;
					<HashLink smooth to="/#categories">
						y más servicios...
					</HashLink>
				</StyledP>
			</ContainerLeft>
			<ContainerRight>
				<StyledImg src={trabajosPintura} alt="" />
			</ContainerRight>
		</MainScreen>
	);
};

export default Home;
