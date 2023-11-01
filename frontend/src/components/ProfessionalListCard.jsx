import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import verificado from '../assets/images/verificado.png';
import { Link, useNavigate } from 'react-router-dom';
import noPhoto from '../assets/images/noPhoto.png';
import StarRating from './StarRating';

const Card = styled.div`
	display: flex;
	border: 1px solid #ccc;
	margin: 10px auto;
	border-radius: 8px;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	width: 100%;
	@media (max-width: 768px) {
		flex-direction: column;
	}
	cursor: ${(props) => (props.clickeable ? 'pointer' : 'default')};
`;

const ImageContainer = styled.div`
	flex: 2;
`;

const Image = styled.img`
	width: 190px;
	height: 210px;
	padding: 1em;
	border-radius: 1.8rem;
	object-fit: cover;
`;

const Content = styled.div`
	flex: 5;
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 0.6rem;
`;

const Title = styled.h2`
	font-size: 1rem;
	margin: 0;
`;
const SubTitle = styled.h2`
	font-size: 0.8rem;
	color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	gap: 2px;
`;

const Info = styled.p`
	margin: 10px 0;
`;

const BlueText = styled.span`
	color: var(--primary);
`;
const Valoracion = styled.div`
	margin-top: auto;
	color: var(--primary);
	font-weight: bolder;
	font-size: 1.2rem;
`;

const ContentRight = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	padding: 20px;
	text-align: center;
`;

const VerificadoImage = styled.img`
	width: 1rem;
	height: 1rem;
`;

const StyledLink = styled(Link)`
	color: var(--primary);
`;

const ProfessionalListCard = ({
	name,
	surname,
	imgUrl,
	certified,
	info,
	telephone,
	location,
	province,
	rating,
	category,
	clickeable,
	serviceId,
}) => {
	const IsLoggedIn = localStorage.token ? true : false;

	const [imageValid, setImageValid] = useState(true);

	const handleImageError = () => {
		setImageValid(false);
	};

	const navigate = useNavigate();
	const handleCardClick = () => {
		if (clickeable) {
			navigate(`/servicio/${serviceId}`);
		}
	};
	return (
		<Card onClick={() => handleCardClick()}>
			<ImageContainer>
				{imageValid ? (
					<Image src={imgUrl} alt="Imagen" onError={handleImageError} />
				) : (
					<Image src={noPhoto} alt="Imagen" />
				)}
			</ImageContainer>
			<Content>
				<Title>
					{name && name} {surname && surname}
				</Title>
				{certified && (
					<SubTitle>
						Profesional Certificado <VerificadoImage src={verificado} alt="" />
					</SubTitle>
				)}
				{category && <BlueText>{category}</BlueText>}
				{rating && (
					<Valoracion>
						<StarRating rating={rating} />
					</Valoracion>
				)}
				{info && <Info>{info}</Info>}
				<span>
					<i className="fa-solid fa-location-dot"></i>
					&nbsp;
					{province && province + ', '}
					{location && location}
				</span>
			</Content>
			<ContentRight onClick={(e) => e.stopPropagation()}>
				{IsLoggedIn ? (
					<span>✆ {telephone}</span>
				) : (
					<span>
						<StyledLink
							to={{
								pathname: '../iniciar-sesion',
							}}
							state={{ returnTo: `/servicio/${serviceId}` }}
						>
							✆ Ver teléfono
						</StyledLink>
					</span>
				)}
			</ContentRight>
		</Card>
	);
};

ProfessionalListCard.propTypes = {
	name: PropTypes.string.isRequired,
	surname: PropTypes.string,
	imgUrl: PropTypes.string.isRequired,
	certified: PropTypes.bool,
	info: PropTypes.string,
	telephone: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	province: PropTypes.string,
	rating: PropTypes.number,
	category: PropTypes.string,
	serviceId: PropTypes.string,
	clickeable: PropTypes.bool,
};

export default ProfessionalListCard;
