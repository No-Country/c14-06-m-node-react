import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import EditService from './EditService';

export default function MyServices() {
	const [serviceList, setServiceList] = useState(null);
	const [modalState, changeModalState] = useState(true);
	const [titulo] = useState('Cargando ...');
	const [parrafo] = useState('Por favor espera.');

	useEffect(() => {
		const userId = JSON.parse(localStorage.getItem('user'))._id;
		const userToken = localStorage.getItem('token');
		const payload = {
			method: 'GET',
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
				setServiceList(data);
				changeModalState(false);
				console.log(serviceList);
			});
	}, []);

	return (
		<ContainerDatos>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>

			{serviceList !== null ? (
				serviceList.response.services.length > 0 ? (
					<>
						<h2>Mis Servicios</h2>
						<div>
							<p>Selecciona los servicios que deseas editar</p>

							{serviceList.response.services.map((servicio) => (
								// eslint-disable-next-line react/jsx-key, react/jsx-no-comment-textnodes
								<EditService service={servicio} />
							))}
						</div>
					</>
				) : (
					<p>No tienes servicios creados</p>
				)
			) : null}
		</ContainerDatos>
	);
}

const ContainerDatos = styled.div`
	h2 {
		padding-bottom: 3%;
	}
	p {
		padding-bottom: 1.5rem;
	}
`;
