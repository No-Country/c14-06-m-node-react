import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfessionalListCard from './ProfessionalListCard';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import NotServicesError from './NotServicesError';

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
		label: 'Técnicos en Aires Acondicionados',
		value: 'air-conditioner',
	},
	{ label: 'Técnicos en Electrodomésticos', value: 'appliance' },
];

const findLabelByValue = (value) => {
	const profession = professions.find((prof) => prof.value === value);
	return profession ? profession.label : 'Otro dato';
};

const ProfessionalsList = () => {
	const [modalState, changeModalState] = useState(true);
	const [error, setError] = useState(false);
	const [message /*setMessage*/] = useState(
		'No se encontraron servicios disponibles.'
	);
	const [titulo /*setTitulo*/] = useState('Cargando ...');
	const [parrafo /*setParrafo*/] = useState('Por favor espera.');
	const [professionalList, setProfessionalList] = useState(null);
	// const [loading, setLoading] = useState(true);

	let { categoryTitle, location } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			let query = '';

			if (categoryTitle && categoryTitle !== 'undefined') {
				query += `category=${categoryTitle}`;
			}

			if (categoryTitle && location && location !== 'undefined') {
				query += '&';
			}

			if (location && location !== 'undefined') {
				query += `location=${location}`;
			}

			const apiUrl = `https://serviceclub.onrender.com/api/services?${query}`;

			try {
				const response = await fetch(apiUrl);

				if (!response.ok) {
					setError(true);
					changeModalState(false);
					throw new Error(`HTTP Error: ${response.status}`);
				}

				const data = await response.json();
				setProfessionalList(data);
				changeModalState(false);

				// setLoading(false);
			} catch (e) {
				console.log(e);
				// setError(error);
				// setLoading(false);
			}

			// if (error) {
			// 	return (
			// 		<NoServicesMessage state={setError}>
			// 			No se encontraron servicios disponibles.
			// 		</NoServicesMessage>
			// 	);
			// }
		};

		fetchData();

		// if (professionalList === null) {
		// 	alert('hi');
		// }
	}, [categoryTitle, location]);

	// console.log(professionalList);
	// if (loading) {
	// 	return <LoadingMessage>Buscando servicios...</LoadingMessage>;
	// }

	return (
		<ProfessionalsListContainer>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>
			<Title>
				Listado de <TextBlue>{findLabelByValue(categoryTitle)}</TextBlue>
				{location && (
					<span>
						{' '}
						en <TextBlue>{location}</TextBlue>
					</span>
				)}
			</Title>
			<NotServicesError state={error} message={message}></NotServicesError>

			{professionalList &&
				professionalList.response.map(
					(professional) =>
						professional.category.code === categoryTitle &&
						professional.active && (
							<>
								<StyledLink
									to={{
										pathname: `/servicio/${professional._id}`,
									}}
								>
									<ProfessionalListCard
										key={professional._id}
										imgUrl={professional.user.profileImg}
										name={professional.user.name}
										surname={professional.user.surname}
										certified={professional.certified}
										info={professional.description}
										telephone={professional.user.phone}
										location={professional.serviceLocation}
										province={professional.user.location}
										rating={
											professional.rating > 0 ? professional.rating : null
										}
									/>
								</StyledLink>
							</>
						)
				)}
		</ProfessionalsListContainer>
	);
};

export default ProfessionalsList;

const ProfessionalsListContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.div`
	font-size: 1.2rem;
	padding: 1rem 1rem 2rem 1rem;
	margin-top: 3rem;
`;

const TextBlue = styled.span`
	color: var(--primary);
`;

// const LoadingMessage = styled.div`
// 	font-size: 1.2rem;
// 	padding: 1rem;
// 	margin: auto;
// `;

// const NoServicesMessage = styled.div`
// 	font-size: 1.2rem;
// 	padding: 1rem;
// 	margin: auto;
// `;

const StyledLink = styled(Link)`
	width: 100%;
`;
