import styled from 'styled-components';
import { ButtonBlue, ButtonGray } from '../styledcomponents/Buttons';
import Modal from './Modal';
import { useState } from 'react';

export default function DeleteAccount() {
	const userId = JSON.parse(localStorage.getItem('user'))._id;
	const userToken = localStorage.getItem('token');
	const [modalState, changeModalState] = useState(false);
	const [titulo] = useState('Cargando ...');
	const [parrafo] = useState('Por favor espera.');
	const onClick = () => {
		changeModalState(true);

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
	};

	return (
		<>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>
			<ContainerDelete>
				<h1>Desactivar Cuenta</h1>
				<div>
					<h2>¿Estás seguro de que deseas desactivar tu cuenta?</h2>
					<p>
						¿Estás seguro de que deseas desactivar tu cuenta? Si desactivas tu
						cuenta, perderás el acceso a todos tus servicios ofrecidos,
						información de perfil y cualquier reseña que hayas escrito o
						recibido en ServiciosClub. Podes volver a ingresar o activar tu
						cuenta si así lo deseas más adelante. Si hay algo que podamos hacer
						para ayudar, visitá nuestro Centro de ayuda.
					</p>
					<textarea></textarea>
					<div>
						<input type="checkbox" name="" id="" />
						<label>
							Confirmo que quiero desactivar mi cuenta de ServiciosClub.
						</label>
					</div>
				</div>
				<ContainerButton>
					<ButtonBlue onClick={onClick}>AUTODESTRUCCIÓN</ButtonBlue>
					<ButtonGray type="button" value="Cancelar" />
				</ContainerButton>
			</ContainerDelete>
		</>
	);
}

const ContainerButton = styled.div``;

const ContainerDelete = styled.div``;
