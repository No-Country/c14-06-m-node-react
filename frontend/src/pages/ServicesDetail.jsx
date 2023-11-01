import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfessionalListCard from '../components/ProfessionalListCard';
import styled from 'styled-components';
import ShowServiceRaiting from '../components/ShowServiceRaiting';
import Modal from '../components/Modal';
import NotServicesError from '../components/NotServicesError';

const ServiceDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
	gap: 2rem;
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

const Title = styled.span`
	font-size: 1.2rem;
	font-weight: 600;
`;
const ServicesDetail = () => {
	const { serviceId } = useParams();
	const [serviceDetail, setServiceDetail] = useState(null);
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [message] = useState('No se encontro al trabajador');

	const [modalState, changeModalState] = useState(true);
	const [titulo] = useState('Cargando ...');
	const [parrafo] = useState('Por favor espera.');

	useEffect(() => {
		const apiUrl = `https://serviceclub.onrender.com/api/services/${serviceId}`;

		const fetchData = async () => {
			try {
				const query = await fetch(apiUrl);
				if (!query.ok) {
					setError(true);
					throw new Error(`HTTP Error: ${fetch.status}`);
				}

				const data = await query.json();
				setServiceDetail(data.response);
				changeModalState(false);
			} catch (error) {
				changeModalState(false);
				setError(error.message);
				// setLoading(false);
			}
		};

		fetchData();
	}, [serviceId]);

	// if (loading) {
	// 	return <LoadingMessage>Cargando servicio...</LoadingMessage>;
	// }

	return (
		<>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>
			<NotServicesError state={error} message={message}></NotServicesError>
			{serviceDetail && (
				<ServiceDetailContainer>
					<ProfessionalListCard
						key={serviceDetail._id}
						imgUrl={serviceDetail.user.profileImg}
						name={serviceDetail.user.name}
						category={serviceDetail.category.categoryName}
						telephone={serviceDetail.user.phone}
						location={serviceDetail.serviceLocation}
						province={serviceDetail.user.location}
						serviceId={serviceDetail._id}
					/>
					<div>
						<Title>Descripción del servicio:</Title>
						<p>{serviceDetail.description}</p>
					</div>
					<ShowServiceRaiting
						serviceId={serviceDetail._id}
						rating={serviceDetail.rating}
						qualifications={serviceDetail.qualifications}
						userId={serviceDetail.user._id}
					/>
				</ServiceDetailContainer>
			)}
		</>
	);
};

export default ServicesDetail;
