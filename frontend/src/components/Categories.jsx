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
	padding: 3rem 5rem;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 50px;
`;

const Title = styled.div`
	font-size: 1.2rem;
	padding: 10px 0;
	position: relative;
	&::before {
		position: absolute;
		left: -8px;
		top: 14px;
		width: 3px;
		height: 1rem;
		vertical-align: center;
		color: #0e76a8;
		background-color: #0e76a8;
		border-radius: 12px;
		content: '';
		text-align: center;
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
`;
const Icon = styled.img`
	width: 4rem;
	height: 4rem;
	background-image: url(${(props) => (props.icon ? props.icon : noIcon)});
	background-repeat: no-repeat;
	background-size: 100%;
`;

const CategoriesList = [
	{
		title: 'Pintores',
		icon: painter,
	},
	{
		title: 'Plomeros',
		icon: plumber,
	},
	{
		title: 'Electricistas',
		icon: electrician,
	},
	{
		title: 'Albañiles',
		icon: bricklayer,
	},
	{
		title: 'Carpinteros',
		icon: carpenter,
	},
	{
		title: 'Fleteros',
		icon: freight,
	},
	{
		title: 'Cerrajeros',
		icon: locksmith,
	},
	{
		title: 'Jardineros',
		icon: gardener,
	},
	{
		title: 'Gasistas',
		icon: gasman,
	},
	{
		title: 'Fumigadores',
		icon: fumigation,
	},
	{
		title: 'Técnicos en Aire Acondicionado',
		icon: aa,
	},
	{
		title: 'Técnicos en Electrodomesticos',
		icon: appliances,
	},
];

const Categories = () => {
	return (
		<CategoriesContainer>
			<Title>Todos los servicios</Title>
			<CategoriesListContainer>
				{CategoriesList.map((category) => (
					<Link
						to={{
							pathname: `/profesionalsList/${category.title}`,
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
