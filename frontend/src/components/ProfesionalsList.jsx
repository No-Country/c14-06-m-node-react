import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProfesionalListCard from './ProfesionalListCard';
import person1 from '../assets/images/person1.jpg';
import person2 from '../assets/images/person2.jpg';
import person3 from '../assets/images/person3.jpg';
import person4 from '../assets/images/person4.jpg';
import person5 from '../assets/images/person5.jpg';
import person6 from '../assets/images/person6.jpg';
import person7 from '../assets/images/person7.jpg';
import person8 from '../assets/images/person8.jpg';

const ProfesionalsListContainer = styled.div`
	width: 1300px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 1.2rem;
	padding: 1rem 1rem 2rem 1rem;
	margin-top: 3rem;
`;

const ProfesionalsList = () => {
	let { categoryTitle } = useParams();
	console.log(categoryTitle);

	const professionals = [
		{
			imgUrl: person5,
			name: 'María González',
			info: 'Servicios de plomería y reparación de cañerías. Disponible las 24 horas.',
			telephone: '987-654-3210',
			category: 'Plomeros',
		},
		{
			imgUrl: person3,
			name: 'Carlos Rodríguez',
			info: 'Electricista certificado para instalaciones residenciales y comerciales.',
			telephone: '555-123-4567',
			category: 'Electricistas',
		},
		{
			imgUrl: person6,
			name: 'Ana Martínez',
			info: 'Experta en remodelación y construcción. Diseño de interiores personalizado.',
			telephone: '111-222-3333',
			category: 'Albañiles',
		},
		{
			imgUrl: person7,
			name: 'Laura Rodríguez',
			info: 'Carpintera especializada en muebles a medida y carpintería de alta calidad.',
			telephone: '777-888-9999',
			category: 'Carpinteros',
		},
		{
			imgUrl: person1,
			name: 'Pedro Fernández',
			info: 'Servicios de flete y transporte de carga. Rápido y confiable.',
			telephone: '555-987-6543',
			category: 'Fleteros',
		},
		{
			imgUrl: person7,
			name: 'Isabel López',
			info: 'Especialista en sistemas de seguridad y cerrajería. Atención 24/7.',
			telephone: '777-123-4567',
			category: 'Cerrajeros',
		},
		{
			imgUrl: person4,
			name: 'Carlos Sánchez',
			info: 'Diseño y mantenimiento de jardines. Experiencia en paisajismo.',
			telephone: '888-222-3333',
			category: 'Jardineros',
		},
		{
			imgUrl: person3,
			name: 'Sergio Gómez',
			info: 'Gasista matriculado. Reparación de artefactos de gas y cañerías.',
			telephone: '111-987-6543',
			category: 'Gasistas',
		},
		{
			imgUrl: person8,
			name: 'Luisa Martínez',
			info: 'Servicios de fumigación y control de plagas. Soluciones efectivas.',
			telephone: '333-444-5555',
			category: 'Fumigadores',
		},
		{
			imgUrl: person1,
			name: 'Juan Pérez',
			info: 'Especializado en pintura interior y exterior. Más de 10 años de experiencia.',
			telephone: '123-456-7890',
			category: 'Pintores',
		},
		{
			imgUrl: person6,
			name: 'María González',
			info: 'Servicios de plomería y reparación de cañerías. Disponible las 24 horas.',
			telephone: '987-654-3210',
			category: 'Plomeros',
		},
		{
			imgUrl: person2,
			name: 'Carlos Rodríguez',
			info: 'Electricista certificado para instalaciones residenciales y comerciales.',
			telephone: '555-123-4567',
			category: 'Electricistas',
		},
		{
			imgUrl: person5,
			name: 'Ana Martínez',
			info: 'Experta en remodelación y construcción. Diseño de interiores personalizado.',
			telephone: '111-222-3333',
			category: 'Albañiles',
		},
		{
			imgUrl: person8,
			name: 'Laura Rodríguez',
			info: 'Carpintera especializada en muebles a medida y carpintería de alta calidad.',
			telephone: '777-888-9999',
			category: 'Carpinteros',
		},
		{
			imgUrl: person6,
			name: 'Monica Martínez',
			info: 'Servicios de fumigación y control de plagas. Soluciones efectivas.',
			telephone: '333-444-5555',
			category: 'Fumigadores',
		},
	];

	return (
		<ProfesionalsListContainer>
			<Title>Top {categoryTitle}</Title>
			{professionals.map(
				(professional) =>
					professional.category === categoryTitle && (
						<ProfesionalListCard
							key={professional.id}
							imgUrl={professional.imgUrl}
							name={professional.name}
							info={professional.info}
							telephone={professional.telephone}
						/>
					)
			)}
		</ProfesionalsListContainer>
	);
};

export default ProfesionalsList;
