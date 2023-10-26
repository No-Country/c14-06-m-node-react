import styled from 'styled-components';
import Switch from './Switch';
import { useState, useCallback, useEffect } from 'react';
import Modal from './Modal';

export default function MyServices() {
	const [isOn, setIsOn] = useState(false);
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
			});
	}, []);

	console.log(serviceList);

	const toggle = useCallback(() => setIsOn((on) => !on), []);

	return (
		<ContainerDatos>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>

			{serviceList && (
				<>
					<h1>Mis Servicios</h1>
					<div>
						<p>Selecciona los servicios que deseas ofrecer</p>

						<>
							{serviceList.response.services.map((servicio) => (
								// eslint-disable-next-line react/jsx-key, react/jsx-no-comment-textnodes
								<ContainerServicios>
									<div>
										<div>
											<h5>{servicio.category.categoryName}</h5>
											<p>Servicio</p>
										</div>
									</div>
									<ContainerToggle>
										<Switch
											isOn={isOn}
											handleToggle={toggle}
											onColor="#0E76A8"
										/>
									</ContainerToggle>
								</ContainerServicios>
							))}
						</>
					</div>
				</>
			)}
		</ContainerDatos>
	);
}

const ContainerToggle = styled.div`
	display: flex;
	align-items: center;
`;

const ContainerDatos = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
	background-color: #ffffff;
	padding: 5%;
	margin: 0 5%;
	border: 1px solid #33333333;

	h1 {
		padding-bottom: 5%;
	}
`;

const ContainerServicios = styled.div`
	border: 1px solid black;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid rgba(212, 212, 212, 1);
	padding: 2%;
`;
