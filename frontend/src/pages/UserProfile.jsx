import { useState } from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import MyServices from '../components/MyServices';
import DeleteAccount from '../components/DeleteAccount';
// import {useForm } from 'react-hook-form';

const UserProfile = () => {
	const getToken = localStorage.getItem('token');
	if (!getToken) {
		location.replace('/');
	}

	const getUserRole = JSON.parse(localStorage.getItem('user')).role;
	const isWorker = getUserRole === 'pro' ? true : false;

	const [active, setActive] = useState('miPerfil');
	return (
		<>
			<ContainerPerfil>
				<ContainerLista>
					<ListaNavegacion>
						<li onClick={() => setActive('miPerfil')}>Perfil</li>

						{isWorker ? (
							<>
								<li onClick={() => setActive('misServicios')}>Mis Servicios</li>
							</>
						) : (
							<Invisible />
						)}

						<li onClick={() => setActive('elimnarCuenta')}>Eliminar Cuenta</li>
					</ListaNavegacion>
				</ContainerLista>
				<>
					{active === 'miPerfil' && <Profile />}
					{active === 'misServicios' && <MyServices />}
					{active === 'elimnarCuenta' && <DeleteAccount />}
				</>
			</ContainerPerfil>
		</>
	);
};

const ContainerLista = styled.div`
	padding-top: 8%;
	width: 15%;
`;

const ContainerPerfil = styled.div`
	display: flex;
	padding: 5%;
	justify-content: space-between;
`;

const ListaNavegacion = styled.ul`
	list-style: none;
	padding-right: 5%;
	font-style: 15px;
	font-weight: 600;

	li {
		padding-top: 5%;
		&:active {
			color: #0e76a8;
		}

		&:hover {
			cursor: pointer;
		}
	}
`;

const Invisible = styled.div`
	display: none;
	visibility: hidden;
`;

export default UserProfile;
