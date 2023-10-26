import styled from 'styled-components';

const RatingCardDiv = styled.div`
	margin-top: 5rem;
	margin-bottom: 2rem;
	position: relative;
	padding: 50px 20px 20px 20px;
	border-radius: 10px;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	display: flex;
	gap: 1rem;
	flex-direction: column;
	justify-content: space-evenly;
	text-align: center;
	font-size: 0.8rem;
	line-height: 1.4rem;
`;

const UserImage = styled.img`
	position: absolute;
	width: 5.4rem;
	height: 5.4rem;
	border-radius: 50%;
	background-image: url('http://localhost:3000/src/assets/images/noPhoto.png');
	top: -45px;
	right: calc(50% - 2.7rem);
`;

const RatingStars = styled.div`
	color: var(--primary);
	font-weight: bolder;
	font-size: 1.5rem;
`;
const RaitingCard = () => {
	return (
		<RatingCardDiv>
			<UserImage />
			<RatingStars>★★★★☆</RatingStars>
			<span>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ratione
				reiciendis exercitationem odio autem voluptatum sed, sequi eveniet rem
				quis nam ipsa distinctio magni temporibus, et provident ab dolor
				consequatur. Qui, nisi voluptates beatae cumque commodi saepe voluptate
				et excepturi id corrupti aut aliquid quas ea similique molestiae dolor
				cupiditate.
			</span>
			<b>algo</b>
		</RatingCardDiv>
	);
};

export default RaitingCard;
