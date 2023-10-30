import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile from '../components/Profile';
import { useState } from 'react';
import {
	faPhone,
	faEnvelope,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import verificado from '../assets/images/verificado.png';
import noPhoto from '../assets/images/noPhoto.png';
import { ButtonBlue } from '../styledcomponents/Buttons';
export default function UserProfileCard() {
	const user = JSON.parse(localStorage.getItem('user'));
	const [active, setActive] = useState(true);
	const [imageValid, setImageValid] = useState(true);

	const displayBadge = false;

	const handleImageError = () => {
		setImageValid(false);
	};

	return (
		<>
			{active ? (
				<ContainerProfileCard>
					<ContainerTop>
						{displayBadge ?? (
							<ContainerCertified>
								<p>Profesional certificado/a</p>
								<VerificadoImage src={verificado} alt="" />
							</ContainerCertified>
						)}
						{imageValid ? (
							<Image
								src={user.profileImg}
								alt="Imagen"
								onError={handleImageError}
							/>
						) : (
							<Image src={noPhoto} alt="Imagen" />
						)}
						<h3>
							{user.name} {user.surname}
						</h3>
						<div>
							<FontAwesomeIcon icon={faPhone} />
							<p>{user.phone}</p>
						</div>
						<div>
							<FontAwesomeIcon icon={faEnvelope} />
							<p>{user.email}</p>
						</div>
					</ContainerTop>
					<ContainerBottom>
						<div>
							<FontAwesomeIcon icon={faLocationDot} />
							<p>{user.location}</p>
						</div>

						<ButtonBlue onClick={() => setActive(false)}>
							Editar perfil
						</ButtonBlue>
					</ContainerBottom>
				</ContainerProfileCard>
			) : (
				<Profile />
			)}
		</>
	);
}

const ContainerProfileCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	padding: 5%;
	border: 1px solid #33333333;
	box-shadow: 0px 0px 4px 0px #00000040;
`;

const ContainerTop = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10%;
	gap: 7px;
	div {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
`;

const ContainerBottom = styled.div`
	padding-top: 5%;
	display: flex;
	justify-content: space-between;
	width: 100%;
	border-top: 1px solid #d0d0d0;
	align-items: center;

	div {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
`;

const VerificadoImage = styled.img`
	width: 1rem;
	height: 1rem;
`;
const Image = styled.img`
	width: 190px;
	height: 210px;
	padding: 1em;
	border-radius: 1.8rem;
	object-fit: cover;
`;

const ContainerCertified = styled.div`
	width: 100%;
	justify-content: right;
`;
