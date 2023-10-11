import styled from 'styled-components';

const Card = styled.div`
	display: flex;
	border: 1px solid #ccc;
	margin: 10px auto;
	border-radius: 8px;
	overflow: hidden;
	width: 80%;
`;

const ImageContainer = styled.div`
	flex: 1;
`;

const Image = styled.img`
	width: 180px;
	height: 200px;
`;

const Content = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const Title = styled.h2`
	font-size: 1rem;
	margin: 0;
`;

const Info = styled.p`
	margin: 10px 0;
`;

const BottomInfo = styled.p`
	margin-top: auto;
`;

const ProfesionalListCard = () => {
	return (
		<Card>
			<ImageContainer>
				<Image src="https://via.placeholder.com/180x200" alt="Imagen" />
			</ImageContainer>
			<Content>
				<Title>Nombre del Profesional</Title>
				<Info>Información sobre el servicio/profesional.</Info>
				<BottomInfo>Valoración: 5/5</BottomInfo>
			</Content>
		</Card>
	);
};

export default ProfesionalListCard;
