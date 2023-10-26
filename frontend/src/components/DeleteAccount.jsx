import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';
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
			<ContainerButton>
				<ButtonBlue onClick={onClick}>AUTODESTRUCCIÓN</ButtonBlue>
			</ContainerButton>
		</>
	);
}

const ContainerButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;
