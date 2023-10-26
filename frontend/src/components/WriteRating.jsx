import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
{
	/*import Modal from '../components/Modal'*/
}

const WriteRatingContainer = styled.div`
	display: flex;
	justify-content: center;
	border: 1px solid rgba(51, 51, 51, 0.2);
	padding: 1rem;
`;

const Form = styled.form`
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

const Star = styled.span`
	cursor: pointer;
`;
const TextArea = styled.textarea`
	width: 80%;
	resize: none;
	margin-top: 1rem;
	padding: 0.4rem;
`;
const StyledSpanErrores = styled.span`
	color: red;
	display: block;
	font-size: 0.8rem;
`;

const LogInOption = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	justify-content: space-evenly;
	gap: 1rem;
	padding: 1rem;
`;

const WriteRating = ({ serviceId }) => {
	const url = `https://serviceclub.onrender.com/api/services/${serviceId}/qualifications`;
	const IsLoggedIn = localStorage.token ? true : false;

	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [, /*modalState*/ changeModalState] = useState(false);
	const [, /*titulo*/ changeTitulo] = useState('Cargando ...');
	const [, /*parrafo*/ changeParrafo] = useState('Por favor espera.');

	const handleStarClick = (selectedRating) => {
		setRating(selectedRating);
		clearErrors('rating');
	};

	const handleStarHover = (hoveredRating) => {
		setHoveredRating(hoveredRating);
	};

	const handleStarLeave = () => {
		setHoveredRating(0);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm();
	const onSubmit = handleSubmit((data) => {
		if (rating === 0) {
			setError('rating', {
				type: 'manual',
				message: 'Por favor selecciona una calificación',
			});
			return;
		}

		changeModalState(true);

		const payload = {
			method: 'POST',
			body: JSON.stringify({ ...data, score: rating }),
			headers: {
				'Content-type': 'application/json',
				Authorization: `${localStorage.token}`,
			},
		};

		{
			fetch(url, payload)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					if (data.status === 'success') {
						changeTitulo('Valoración registrada con éxito');
						changeParrafo('¡Muchas gracias!');
						alert('Valoración registrada con éxito');
						window.location.reload();
					} else {
						changeTitulo('Error al cargar la valoración');
						changeParrafo('Intenta nuevamente');
						setTimeout(() => {
							changeModalState(false);
							changeTitulo('Cargando ...');
							changeParrafo('Por favor espera.');
						}, 2000);
						alert(data.response);
					}
				});
		}
	});

	return (
		<WriteRatingContainer>
			<Form onSubmit={onSubmit}>
				<Title>
					<TextBlue>Valorar</TextBlue> servicio del profesional
				</Title>
				{!IsLoggedIn ? (
					<LogInOption>
						Inicia Sesión para poder valorar.
						<Link to="/iniciar-sesion">
							<ButtonBlue>Iniciar Sesión</ButtonBlue>
						</Link>
					</LogInOption>
				) : (
					<>
						<span>No se permiten insultos ni faltas de respeto.</span>
						<TextArea
							id="comment"
							rows={6}
							placeholder="Ej: Muy conforme con su trabajo..."
							{...register('comment', {
								required: {
									value: true,
									message: '*Por favor escribe un comentario.',
								},
								minLength: {
									value: 12,
									message: '*Debe tener al menos 12 caracteres',
								},
								maxLength: {
									value: 60,
									message: '*Debe ser menor a 60 caracteres',
								},
								pattern: {
									value: /^[^<>]*$/,
									message: '*No se aceptan caracteres especiales.',
								},
							})}
						/>
						{errors.comment && (
							<StyledSpanErrores>{errors.comment.message}</StyledSpanErrores>
						)}
						<Stars>
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									filled={star <= (hoveredRating || rating) ? '' : ''}
									onClick={() => handleStarClick(star)}
									onMouseEnter={() => handleStarHover(star)}
									onMouseLeave={handleStarLeave}
								>
									{star <= (hoveredRating || rating) ? '★' : '☆'}
								</Star>
							))}
							{errors.rating && (
								<StyledSpanErrores>{errors.rating.message}</StyledSpanErrores>
							)}
						</Stars>
						<ButtonBlue type="submit">Valorar</ButtonBlue>
					</>
				)}
			</Form>
		</WriteRatingContainer>
	);
};

WriteRating.propTypes = {
	serviceId: PropTypes.string,
};

export default WriteRating;
