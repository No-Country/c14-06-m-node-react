import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import EditService from './EditService';
import { ButtonBlue } from '../styledcomponents/Buttons';
import { Link } from 'react-router-dom';

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
			<StyledLink to="/ofrecer-servicio">
				<DivAgregarServicio>
					<RoundedButton> + </RoundedButton>
					<span>Agregar servicio</span>
				</DivAgregarServicio>
			</StyledLink>
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
	display: flex;
	flex-direction: column;
`;

const StyledLink = styled(Link)`
	display: flex;
	align-self: center;
`;

const DivAgregarServicio = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 3rem auto;
`;

const RoundedButton = styled(ButtonBlue)`
	padding: 0.4rem 1rem;
	border-radius: 50%;
	font-size: 1.6rem;
	margin-top: 0.8rem;
	margin-bottom: 0.5rem;
`;
