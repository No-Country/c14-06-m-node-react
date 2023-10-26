import styled from 'styled-components';
import WriteRating from '../components/WriteRating';
import StarRating from '../components/StarRating';
import ShowReviews from '../components/ShowReviews';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

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
const Text = styled.span`
	font-size: 1.2rem;
	vertical-align: middle;
	font-weight: 300;
`;
const ShowServiceRaiting = ({ serviceId, rating, qualifications }) => {
	const valoraciones = (qualifications) => {
		let message = '';
		switch (qualifications.length) {
			case 0:
				message = '(Nadie ha valorado este servicio aún)';
				break;
			case 1:
				message = '(1 valoración)';
				break;
			default:
				message = `(${qualifications.length} valoraciones)`;
				break;
		}
		return message;
	};

	const IsLoggedIn = localStorage.token ? true : false;
	const [rated, setRated] = useState(false);

	const userJSON = localStorage.getItem('user');
	const user = JSON.parse(userJSON);
	const myId = user._id;

	useEffect(() => {
		if (IsLoggedIn) {
			const myRating = qualifications.find((rating) => rating.userId === myId);
			if (myRating) {
				setRated(true);
			}
		}
	}, [qualifications, IsLoggedIn, myId]);

	return (
		<>
			<RatingDiv>
				<b>
					Valoración: <Text>{rating + '/5'}</Text>
				</b>
				<RaitingStars>
					<StarRating rating={rating} />
				</RaitingStars>
				<RaitingCaption>{valoraciones(qualifications)}</RaitingCaption>
			</RatingDiv>

			<ShowReviews reviews={qualifications} />

			{rated ? (
				<p>Gracias por tu calificación</p>
			) : (
				<WriteRating serviceId={serviceId} />
			)}
		</>
	);
};
ShowServiceRaiting.propTypes = {
	serviceId: PropTypes.string,
	rating: PropTypes.number,
	qualifications: PropTypes.array,
};

export default ShowServiceRaiting;
