import { useState } from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import MyServices from '../components/MyServices';
import EditServices from '../components/EditServices';
import DeleteAccount from '../components/DeleteAccount';
// import {useForm } from 'react-hook-form';

const UserProfile = () => {
	const [active, setActive] = useState('miPerfil');
	return (
		<>
			<ContainerPerfil>
				<ContainerLista>
					<ListaNavegacion>
						<li onClick={() => setActive('miPerfil')}>Perfil</li>
						<li onClick={() => setActive('misServicios')}>Mis Servicios</li>
						<li onClick={() => setActive('editarServicios')}>
							Editar Servicios
						</li>
						<li onClick={() => setActive('elimnarCuenta')}>Eliminar Cuenta</li>
					</ListaNavegacion>
				</ContainerLista>
				<>
					{active === 'miPerfil' && <Profile />}
					{active === 'misServicios' && <MyServices />}
					{active === 'editarServicios' && <EditServices />}
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

export default UserProfile;
