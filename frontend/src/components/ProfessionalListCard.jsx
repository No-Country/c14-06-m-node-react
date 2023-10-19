import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import verificado from '../assets/images/verificado.png';
import { Link } from 'react-router-dom';
import noPhoto from '../assets/images/noPhoto.png';

const Card = styled.div`
	display: flex;
	border: 1px solid #ccc;
	margin: 10px auto;
	border-radius: 8px;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	width: 80%;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const ImageContainer = styled.div`
	flex: 2;
`;

const Image = styled.img`
	width: 190px;
	height: 210px;
	padding: 1em;
	object-fit: cover;
`;

const Content = styled.div`
	flex: 5;
	display: flex;
	flex-direction: column;
	padding: 20px;
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
	margin-top: 8px;
`;

const Info = styled.p`
	margin: 10px 0;
`;

const Valoracion = styled.div`
	margin-top: auto;
	color: var(--primary);
	font-weight: bolder;
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

const ProfessionalListCard = ({ name, imgUrl, info, telephone, location }) => {
	const IsLoggedIn = localStorage.token ? true : false;

	const [imageValid, setImageValid] = useState(true);

	const handleImageError = () => {
		setImageValid(false);
	};

	return (
		<Card>
			<ImageContainer>
				{imageValid ? (
					<Image src={imgUrl} alt="Imagen" onError={handleImageError} />
				) : (
					<Image src={noPhoto} alt="Imagen" />
				)}
			</ImageContainer>
			<Content>
				<Title>{name}</Title>
				<SubTitle>
					Profesional Certificado <VerificadoImage src={verificado} alt="" />
				</SubTitle>
				<Info>{info}</Info>
				<span>
					<i className="fa-solid fa-location-dot"></i>
					&nbsp;
					{location}
				</span>
				<Valoracion>Valoración: ★★★★☆</Valoracion>
			</Content>
			<ContentRight>
				{IsLoggedIn ? (
					<span>✆ {telephone}</span>
				) : (
					<span>
						<StyledLink to="../iniciar-sesion">✆ Ver teléfono</StyledLink>
					</span>
				)}
			</ContentRight>
		</Card>
	);
};

ProfessionalListCard.propTypes = {
	name: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	telephone: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
};

export default ProfessionalListCard;
