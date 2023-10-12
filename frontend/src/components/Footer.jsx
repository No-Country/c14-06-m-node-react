import styled from 'styled-components';
import serviciosClubBlue from '../assets/logo/ServiciosClubBlue.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFacebook,
	faInstagram,
	faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
const DivLogo = styled.div`
	display: flex;
`;
const StyledFooter = styled.footer`
	margin-top: auto;
	background-color: #d9d9d9b2;
	color: #00000080;
	display: flex;
	gap: 2rem;
	justify-content: space-between;
	padding: 1rem 3rem;
	text-align: justify;
`;

const StyledH2 = styled.h2`
	color: #0e76a8;
	font-weight: 700;
	font-size: 1.5em;
`;

const StyledUl = styled.ul`
	color: #00000080;
	list-style: none;
	padding: 2rem 0;
`;

// const DivIcons = styled.div``;

const IconsUl = styled.ul`
	display: flex;
	list-style: none;
	gap: 2rem;
	width: 100%;
	text-align: center;
	color: #0e76a8;
`;

const Footer = () => {
	return (
		<StyledFooter>
			<DivLogo>
				<img src={serviciosClubBlue} alt="" />
			</DivLogo>
			<div>
				<StyledH2>Sobre Nosotros</StyledH2>
				<StyledUl>
					<li>
						<Link>Contacto</Link>
					</li>
					<li>
						<Link>Nuestro equipo</Link>
					</li>
					<li>
						<Link>Termino y condiciones</Link>
					</li>
				</StyledUl>
			</div>
			<div>
				<StyledH2>Soporte</StyledH2>
				<StyledUl>
					<li>
						<Link>Ayuda</Link>
					</li>
				</StyledUl>
			</div>
			<div>
				<IconsUl>
					<li>
						<FontAwesomeIcon icon={faFacebook} />
					</li>
					<li>
						<FontAwesomeIcon icon={faInstagram} />
					</li>
					<li>
						<FontAwesomeIcon icon={faLinkedin} />
					</li>
				</IconsUl>

				<StyledUl>
					<li>
						<Link>Descarga La App</Link>
					</li>
				</StyledUl>
			</div>
		</StyledFooter>
	);
};

export default Footer;
