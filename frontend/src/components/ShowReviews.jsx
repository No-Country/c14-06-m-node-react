import styled from 'styled-components';
import RaitingCard from './RaitingCard';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import '../styledcomponents/reviewsSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';

const RatingCardsDiv = styled.div`
	display: flex;
	padding: 0 0rem 1rem;
	width: 100%;
`;

/*const CardDiv = styled.div`
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
`;*/

const Calificaciones = styled.div`
	text-align: center;
	font-size: 1.4rem;
	margin-top: 1rem;
`;

const ShowReview = ({ reviews, isMyOwnService }) => {
	if (!reviews || reviews.length === 0) {
		return (
			<RatingCardsDiv>
				<p>
					Este servicio aún no tiene calificaciones.
					{!isMyOwnService && ' ¡Sé el primero en calificar!'}
				</p>
			</RatingCardsDiv>
		);
	}
	const slidesPerView = reviews.length >= 3 ? 3 : 'auto'; // Condición para centrar o no
	return (
		<>
			<Calificaciones>Comentarios: </Calificaciones>
			<RatingCardsDiv>
				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={30}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination, Autoplay]}
					className="mySwiper"
				>
					{reviews.map((review, index) => (
						<SwiperSlide key={index}>
							<RaitingCard
								comment={review.comment}
								score={review.score}
								userId={review.userId}
								username={review.user.name + ' ' + review.user.surname}
								profileImg={review.user.profileImg}
								index={index}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</RatingCardsDiv>
		</>
	);
};

ShowReview.propTypes = {
	reviews: PropTypes.array,
	isMyOwnService: PropTypes.bool,
};
export default ShowReview;
