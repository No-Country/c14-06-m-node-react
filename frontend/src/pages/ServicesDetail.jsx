import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfessionalListCard from '../components/ProfessionalListCard';
import styled from 'styled-components';
import RaitingCard from '../components/RaitingCard';
import WriteRating from '../components/WriteRating';
import StarRating from '../components/StarRating';

const ServiceDetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
	gap: 2rem;
`;

const LoadingMessage = styled.div`
	font-size: 1.2rem;
	padding: 1rem;
	margin: auto;
`;

const NoServicesMessage = styled.div`
	font-size: 1.2rem;
	padding: 1rem;
	margin: auto;
`;

const RatingDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 1.1rem;
	line-height: 2rem;
`;
const RaitingStars = styled.span`
	color: var(--primary);
	font-size: 2.5rem;
	letter-spacing: 0.3rem;
`;
const RaitingCaption = styled.span`
	font-size: 0.8rem;
`;

const RatingCardsDiv = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const CardDiv = styled.div`
	flex: 0 0 calc(33.333% - 20px);
`;

const ServicesDetail = () => {
	const { serviceId } = useParams();
	const [serviceDetail, setServiceDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const apiUrl = `https://serviceclub.onrender.com/api/services/${serviceId}`;

		const fetchData = async () => {
			try {
				const query = await fetch(apiUrl);
				if (!query.ok) {
					throw new Error(`HTTP Error: ${fetch.status}`);
				}

				const data = await query.json();
				setServiceDetail(data.response);
				setLoading(false);
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};

		fetchData();
	}, [serviceId]);
	console.log(serviceDetail);

	if (loading) {
		return <LoadingMessage>Cargando servicio...</LoadingMessage>;
	}

	if (error) {
		return <NoServicesMessage>No se encontró el servicio.</NoServicesMessage>;
	}

	return (
		<>
			{!serviceDetail ? (
				<NoServicesMessage>No se encontró el servicio.</NoServicesMessage>
			) : (
				<ServiceDetailContainer>
					<ProfessionalListCard
						key={serviceDetail._id}
						imgUrl={serviceDetail.user.profileImg}
						name={serviceDetail.user.name}
						telephone={serviceDetail.user.phone}
						location={serviceDetail.serviceLocation}
					/>
					<div>
						<h4>Descripción del servicio:</h4>
						<p>{serviceDetail.description}</p>
					</div>
					<RatingDiv>
						<b>Valoración</b>
						<RaitingStars>
							<StarRating rating={89} />
						</RaitingStars>
						<RaitingCaption>(1 valoración)</RaitingCaption>
					</RatingDiv>
					<RatingCardsDiv>
						<CardDiv>
							<RaitingCard />
						</CardDiv>
						<CardDiv>
							<RaitingCard />
						</CardDiv>
						<CardDiv>
							<RaitingCard />
						</CardDiv>
					</RatingCardsDiv>
					<WriteRating serviceId={serviceDetail._id} />
				</ServiceDetailContainer>
			)}
		</>
	);
};

export default ServicesDetail;
