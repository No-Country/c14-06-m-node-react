import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';

const WriteRatingContainer = styled.div`
	display: flex;
	justify-content: center;
	border: 1px solid rgba(51, 51, 51, 0.2);
	padding: 1rem;
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 0.3rem;
	width: 80%;
	font-size: 0.8rem;
`;

const Title = styled.span`
	font-size: 1.3rem;
	font-weight: bold;
`;

const TextBlue = styled.span`
	color: var(--primary);
`;

const Stars = styled.span`
	color: var(--primary);
	font-size: 2rem;
`;

const TextArea = styled.textarea`
	width: 80%;
	resize: none;
	margin-top: 1rem;
`;

const WriteRating = () => {
	return (
		<WriteRatingContainer>
			<Form>
				<Title>
					<TextBlue>Valorar</TextBlue> servicio del profesional
				</Title>
				<span>No se permiten insultos ni faltas de respeto.</span>
				<TextArea rows={6} placeholder="Ej: Muy conforme con su trabajo..." />
				<Stars>☆☆☆☆☆</Stars>
				<ButtonBlue>Valorar</ButtonBlue>
			</Form>
		</WriteRatingContainer>
	);
};

export default WriteRating;
