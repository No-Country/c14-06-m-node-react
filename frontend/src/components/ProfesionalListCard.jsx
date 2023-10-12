import styled from 'styled-components';
import PropTypes from 'prop-types';
import verificado from '../assets/images/verificado.png';

const Card = styled.div`
	display: flex;
	border: 1px solid #ccc;
	margin: 10px auto;
	border-radius: 8px;
	overflow: hidden;
	width: 80%;
`;

const ImageContainer = styled.div`
	flex: 2;
`;

const Image = styled.img`
	width: 190px;
	height: 210px;
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
	text-align: right;
`;

const VerificadoImage = styled.img`
	width: 1rem;
	height: 1rem;
`;

const ProfesionalListCard = ({ name, imgUrl, info, telephone }) => {
	return (
		<Card>
			<ImageContainer>
				<Image src={imgUrl} alt="Imagen" />
			</ImageContainer>
			<Content>
				<Title>{name}</Title>
				<SubTitle>
					Profesional Certificado <VerificadoImage src={verificado} alt="" />
				</SubTitle>
				<Info>{info}</Info>
				<Valoracion>Valoración: ★★★★☆</Valoracion>
			</Content>
			<ContentRight>✆ {telephone}</ContentRight>
		</Card>
	);
};

ProfesionalListCard.propTypes = {
	name: PropTypes.string.isRequired,
	imgUrl: PropTypes.string.isRequired,
	info: PropTypes.string.isRequired,
	telephone: PropTypes.string.isRequired,
};

export default ProfesionalListCard;
