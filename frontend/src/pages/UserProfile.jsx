import styled from 'styled-components';
import MyServices from '../components/MyServices';
import DeleteAccount from '../components/DeleteAccount';
import UserProfileCard from '../components/UserProfileCard';
import { Link, useParams } from 'react-router-dom';

const UserProfile = () => {
	const { seccion } = useParams();
	const getToken = localStorage.getItem('token');
	if (!getToken) {
		location.replace('/');
	}

	const getUserRole = JSON.parse(localStorage.getItem('user')).role;
	const isWorker = getUserRole === 'pro' ? true : false;

	return (
		<ContainerPerfil>
			<ContainerMenu>
				<Link to="/mi-perfil/informacion">Perfil</Link>
				{isWorker && <Link to="/mi-perfil/servicios">Mis Servicios</Link>}
				<Link to="/mi-perfil/eliminar-cuenta">Eliminar Cuenta</Link>
			</ContainerMenu>
			<ContainerSeccion>
				{(() => {
					switch (seccion) {
						case 'informacion':
							return <UserProfileCard />;
						case 'servicios':
							return <MyServices />;
						case 'eliminar-cuenta':
							return <DeleteAccount />;
						default:
							location.replace('/mi-perfil/informacion');
					}
				})()}
			</ContainerSeccion>
		</ContainerPerfil>
	);
};

const ContainerPerfil = styled.div`
	display: flex;
	padding: 2rem;
	gap: 1rem;
	width: 100%;
	@media (max-width: 700px) {
		flex-direction: column;
		gap: 0;
		padding: 1rem 0;
	}
`;

const ContainerMenu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 0.7rem 0 1.8rem 0;
	font-weight: 600;
	flex-wrap: nowrap;
	white-space: nowrap;
	@media (min-width: 400px) {
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
	}
	@media (min-width: 700px) {
		width: auto;
		min-width: 170px;
		flex-direction: column;
		justify-content: start;
		padding: 3rem 1rem;
	}
`;

const ContainerSeccion = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 5%;
	border: 1px solid #33333333;
`;

export default UserProfile;
