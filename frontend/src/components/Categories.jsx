import { Link } from 'react-router-dom';
import styled from 'styled-components';
import carpenter from '../assets/images/carpenter.png';
import electrician from '../assets/images/electrician.png';
import freight from '../assets/images/freight.png';
import plumber from '../assets/images/plumber.png';
import locksmith from '../assets/images/locksmith.png';
import painter from '../assets/images/painter.png';
import appliances from '../assets/images/appliances.png';
import bricklayer from '../assets/images/bricklayer.png';
import gardener from '../assets/images/gardener.png';
import gasman from '../assets/images/gasman.png';
import fumigation from '../assets/images/fumigation.png';
import aa from '../assets/images/aa.png';
import noIcon from '../assets/images/noIcon.png';

const CategoriesContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const CategoriesListContainer = styled.div`
	padding: 0.4rem 1rem 4rem 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 1rem;
	@media (max-width: 180px) {
		grid-template-columns: repeat(auto-fit, 1fr);
	}
`;

const PreTitle = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	padding: 4rem 0 2.2rem 0;
	color: rgb(0, 0, 0, 0.8);
	gap: 1.2rem;

	@media (max-width: 500px) {
		font-size: 1rem;
		h1 {
			font-size: 1.8rem;
		}
	}

	@media (max-width: 920px) {
		padding: 0 0 1rem 0;
	}
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 20px;
	box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 9px 0px;
	gap: 20px;
	cursor: pointer;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 9px 4px;
	}
	height: 100%;
`;
const Icon = styled.img`
	width: 4rem;
	height: 4rem;
	background-image: url(${(props) => (props.icon ? props.icon : noIcon)});
	background-repeat: no-repeat;
	background-size: 100%;
	border-radius: 10px;
`;

const CategoriesList = [
	{
		title: 'Albañiles',
		icon: bricklayer,
		category: 'bricklayer',
	},
	{
		title: 'Carpinteros',
		icon: carpenter,
		category: 'carpenter',
	},
	{
		title: 'Cerrajeros',
		icon: locksmith,
		category: 'locksmith',
	},
	{
		title: 'Electricistas',
		icon: electrician,
		category: 'electrician',
	},
	{
		title: 'Fleteros',
		icon: freight,
		category: 'freight',
	},
	{
		title: 'Fumigadores',
		icon: fumigation,
		category: 'fumigator',
	},
	{
		title: 'Gasistas',
		icon: gasman,
		category: 'gas-fitter',
	},
	{
		title: 'Jardineros',
		icon: gardener,
		category: 'gardener',
	},
	{
		title: 'Pintores',
		icon: painter,
		category: 'painter',
	},
	{
		title: 'Plomeros',
		icon: plumber,
		category: 'plumber',
	},

	{
		title: 'Técnicos en Aire Acondicionado',
		icon: aa,
		category: 'air-conditioner',
	},
	{
		title: 'Técnicos en Electrodomesticos',
		icon: appliances,
		category: 'appliance',
	},
];

const Categories = () => {
	return (
		<CategoriesContainer id="categories">
			<PreTitle>
				<h1>¿Qué necesitas?</h1>
				Contrata el servicio que estás buscando
			</PreTitle>
			<CategoriesListContainer>
				{CategoriesList.map((category) => (
					<Link
						to={{
							pathname: `/ProfessionalsList/${category.category}`,
						}}
						key={category.title}
					>
						<Card>
							<Icon icon={category.icon} /> {category.title}
						</Card>
					</Link>
				))}
			</CategoriesListContainer>
		</CategoriesContainer>
	);
};

export default Categories;
