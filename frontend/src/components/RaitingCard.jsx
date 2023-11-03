import styled from 'styled-components';
import noPhoto from '../assets/images/noPhoto.png';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const RatingCardDiv = styled.div`
	margin: 50px 0;
	position: relative;
	padding: 50px 20px 20px 20px;
	border-radius: 10px;
	border: 1px solid gray;
	box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: space-evenly;
	text-align: center;
	font-size: 0.8rem;
	line-height: 1.4rem;
	width: 100%;
	max-width: 400px;
`;

const UserImage = styled.img`
	position: absolute;
	width: 5.4rem;
	height: 5.4rem;
	border-radius: 50%;
	top: -45px;
	right: calc(50% - 2.7rem);
	object-fit: cover;
`;

const RatingStars = styled.div`
	color: var(--primary);
	font-weight: bolder;
	font-size: 1.5rem;
`;
const RaitingCard = ({ comment, score, username, profileImg }) => {
	return (
		<RatingCardDiv>
			{!profileImg || profileImg == '' || profileImg == undefined ? (
				<UserImage src={noPhoto} alt="Imagen de usuario del comentario" />
			) : (
				<UserImage src={profileImg} alt="Imagen de usuario del comentario" />
			)}

			<RatingStars>
				<StarRating rating={score} />
			</RatingStars>
			<span>{comment}</span>
			<b>{username}</b>
		</RatingCardDiv>
	);
};
RaitingCard.propTypes = {
	comment: PropTypes.string,
	score: PropTypes.number,
	userId: PropTypes.string,
	username: PropTypes.string,
	profileImg: PropTypes.string,
};
export default RaitingCard;
