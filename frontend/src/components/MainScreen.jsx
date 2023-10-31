import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ButtonBlue } from '../styledcomponents/Buttons';
import { useState } from 'react';
import SliderMain from './SliderMain';
import { provincias } from '../assets/usefulData';

const MainScreen = styled.div`
	min-height: calc(100vh - var(--navbar-height));
	display: grid;
	grid-template-areas: 'left right';
	align-items: center;
	margin-top: 2rem;
	@media (max-width: 820px) {
		grid-template-areas: 'left';
	}
	@media (min-width: 1200px) {
		gap: 2rem;
	}
	a {
		color: var(--primary);
	}
`;

const ContainerLeft = styled.div`
	grid-area: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	height: 100%;
	margin-bottom: 4rem;
	margin-right: 0;
`;

const StyledSlogan = styled.span`
	font-weight: 700;
	font-size: 2.8rem;
	text-align: center;
	padding-bottom: 4rem;
	color: rgb(0, 0, 0, 0.8);
	@media (max-width: 500px) {
		font-size: 1.8rem;
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
	width: 500px;

	@media (max-width: 920px) {
		display: none;
	}
`;

// const StyledImg = styled.img`
// 	width: 100%;
// 	margin-bottom: 8rem;
// `;

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
	align-items: stretch;

	@media (max-width: 740px) {
		flex-direction: column;
	}
`;

const StyledButton = styled(ButtonBlue)`
	height: 100%;
	min-width: 7rem;
	font-size: 0.9rem;
	@media (max-width: 768px) {
		width: 100%;
		align-self: center;
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

	// const provincias = [
	// 	{ label: 'Buenos Aires', value: 'Buenos Aires' },
	// 	{ label: 'Catamarca', value: 'Catamarca' },
	// 	{ label: 'Chaco', value: 'Chaco' },
	// 	{ label: 'Chubut', value: 'Chubut' },
	// 	{ label: 'Córdoba', value: 'Córdoba' },
	// 	{ label: 'Corrientes', value: 'Corrientes' },
	// 	{ label: 'Entre Ríos', value: 'Entre Ríos' },
	// 	{ label: 'Formosa', value: 'Formosa' },
	// 	{ label: 'Jujuy', value: 'Jujuy' },
	// 	{ label: 'La Pampa', value: 'La Pampa' },
	// 	{ label: 'La Rioja', value: 'La Rioja' },
	// 	{ label: 'Mendoza', value: 'Mendoza' },
	// 	{ label: 'Misiones', value: 'Misiones' },
	// 	{ label: 'Neuquén', value: 'Neuquén' },
	// 	{ label: 'Río Negro', value: 'Río Negro' },
	// 	{ label: 'Salta', value: 'Salta' },
	// 	{ label: 'San Juan', value: 'San Juan' },
	// 	{ label: 'San Luis', value: 'San Luis' },
	// 	{ label: 'Santa Cruz', value: 'Santa Cruz' },
	// 	{ label: 'Santa Fe', value: 'Santa Fe' },
	// 	{ label: 'Santiago del Estero', value: 'Santiago del Estero' },
	// 	{ label: 'Tierra del Fuego', value: 'Tierra del Fuego' },
	// 	{ label: 'Tucumán', value: 'Tucumán' },
	// ];

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

	return (
		<MainScreen>
			<ContainerLeft>
				<StyledSlogan>Todos los servicios en un solo lugar.</StyledSlogan>
				<Buscar>
					<Select
						id="profession"
						value={selectedProfession}
						onChange={handleProfessionChange}
						// defaultValue=""
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
						// defaultValue=""
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
						<StyledButton>Buscar</StyledButton>
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
				<SliderMain />
			</ContainerRight>
		</MainScreen>
	);
};

export default Home;
