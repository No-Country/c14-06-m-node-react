import styled from 'styled-components';
import { ButtonBlue, ButtonGrayInput } from '../styledcomponents/Buttons';
import Modal from './Modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserProfileCard from './UserProfileCard';

export default function DeleteAccount() {
	const { register, handleSubmit } = useForm();

	const [volver, setVolver] = useState(true);
	const userId = JSON.parse(localStorage.getItem('user'))._id;
	const userToken = localStorage.getItem('token');
	const [modalState, changeModalState] = useState(false);
	const [titulo] = useState('Cargando ...');
	const [parrafo] = useState('Por favor espera.');

	const onSubmit = handleSubmit((data) => {
		changeModalState(true);
		if (data.confirmDelete) {
			console.log('CUENTA ELIMINADA');
			const payload = {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
					Authorization: userToken,
				},
			};
			fetch(`https://serviceclub.onrender.com/api/users/${userId}`, payload)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					location.replace('/');
					localStorage.clear();
				});
		} else {
			changeModalState(false);
			console.log('NO ELIMINADA');
		}
	});

	return (
		<>
			{volver ? (
				<ContainerDelete>
					<Modal
						state={modalState}
						changeState={changeModalState}
						titulo={titulo}
						parrafo={parrafo}
					></Modal>
					<h2>Desactivar Cuenta</h2>
					<ContainerInfo>
						<h3>¿Estás seguro de que deseas desactivar tu cuenta?</h3>
						<p>
							<br></br>
							Si desactivas tu cuenta, perderás el acceso a todos tus servicios
							ofrecidos, información de perfil y cualquier reseña que hayas
							escrito o recibido en <ServiciosSpan>Servicios</ServiciosSpan>
							<ClubSpan>Club</ClubSpan>.<br></br>
							<br></br>
							Podes volver a ingresar o activar tu cuenta si así lo deseas más
							adelante.
							<br></br>
							<br></br>
							Si hay algo que podamos hacer para ayudar, visitá nuestro Centro
							de ayuda.
						</p>
						{/* <textarea></textarea> */}
						<ContainerCheck>
							<form onSubmit={onSubmit}>
								<StyledCheckbox
									type="checkbox"
									name="confirmDelete"
									id="confirmDelete"
									{...register('confirmDelete')}
								/>
								<label>
									<ServiciosSpan>
										Confirmo que quiero desactivar mi cuenta de Servicios
									</ServiciosSpan>
									<ClubSpan>Club</ClubSpan>.
								</label>
								<ContainerButton>
									<ButtonBlue>Desactivar cuenta</ButtonBlue>
									<ButtonGrayInput
										type="button"
										value="Cancelar"
										onClick={() => setVolver(false)}
									/>
								</ContainerButton>
							</form>
						</ContainerCheck>
					</ContainerInfo>
				</ContainerDelete>
			) : (
				<UserProfileCard />
			)}
		</>
	);
}

const ContainerButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-top: 5%;
	gap: 1rem;
`;

const ContainerDelete = styled.div`
	padding: 5%;
	border: 1px solid #33333333;
	box-shadow: 0px 0px 4px 0px #00000040;
	width: 80%;
`;

const ContainerInfo = styled.div`
	padding: 5%;
`;

const ServiciosSpan = styled.span`
	font-weight: bold;
`;

const ClubSpan = styled.span`
	font-weight: bold;
	color: #0e76a8;
`;

const ContainerCheck = styled.div`
	margin-top: 5%;
	display: flex;
	gap: 0.5rem;
	width: 100%;

	form {
		width: 100%;
	}
`;

const StyledCheckbox = styled.input`
	margin-right: 1%;
`;
