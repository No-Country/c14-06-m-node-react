import styled from 'styled-components';
import RaitingCard from './RaitingCard';
import PropTypes from 'prop-types';

const RatingCardsDiv = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
`;

const CardDiv = styled.div`
	flex: 0 0 calc(33.333% - 20px);
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 767px) {
		flex: 0 0 calc(100% - 20px);
		&:nth-child(2),
		&:nth-child(3) {
			display: none;
		}
	}

	@media screen and (min-width: 768px) and (max-width: 1023px) {
		flex: 0 0 calc(50% - 20px);
		&:nth-child(2) {
			display: none;
		}
	}
`;

const Calificaciones = styled.div`
	text-align: center;
	font-size: 1.4rem;
	margin-top: 1rem;
`;

const ShowReview = ({ reviews }) => {
	if (!reviews || reviews.length === 0) {
		return (
			<RatingCardsDiv>
				<p>
					Este servicio aún no tiene calificaciones. ¡Sé el primero en
					calificar!
				</p>
			</RatingCardsDiv>
		);
	}
	return (
		<>
			<Calificaciones>Comentarios: </Calificaciones>
			<RatingCardsDiv>
				{reviews.map((review, index) => (
					<CardDiv key={index}>
						<RaitingCard
							comment={review.comment}
							score={review.score}
							userId={review.userId}
							index={index}
						/>
					</CardDiv>
				))}
			</RatingCardsDiv>
		</>
	);
};

ShowReview.propTypes = {
	reviews: PropTypes.array,
};
export default ShowReview;
