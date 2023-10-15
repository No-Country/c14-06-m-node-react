import styled from 'styled-components';
import logo from '../assets/logo/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const StyledFooter = styled.footer`
	padding: 2rem 0 0.5rem 0;
	color: #00000080;
	display: grid;
	grid-template-areas:
		'logo about support socialmedia'
		'copyright copyright copyright copyright';
	gap: 2rem;
	text-align: justify;

	@media (max-width: 900px) {
		grid-template-areas:
			'logo'
			'socialmedia'
			'about'
			'support'
			'copyright';
		text-align: center;
	}
`;

const DivLogo = styled.div`
	grid-area: logo;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 50px;
		height: 50px;
	}
	a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;

const TextLogo = styled.div`
	color: rgb(0, 0, 0, 0.8);
	font-size: 1.5rem;
	font-weight: bolder;
	padding-left: 1rem;
	padding-top: 4px;
`;

const BlueText = styled.span`
	color: var(--primary);
`;

const About = styled.div`
	grid-area: about;
	display: flex;
	flex-direction: column;
`;

const Support = styled.div`
	grid-area: support;
	display: flex;
	flex-direction: column;
`;
const SocialMedia = styled.div`
	grid-area: socialmedia;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

const SectionTitle = styled.span`
	color: #0e76a8;
	font-weight: 700;
	font-size: 1.1rem;
`;

const StyledUl = styled.ul`
	color: #00000080;
	list-style: none;
	padding: 0.4rem 0;

	li {
		padding-top: 8px;
	}
`;

const IconsUl = styled.ul`
	display: flex;
	gap: 1rem;
	color: var(--primary);
	justify-content: center;
	align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
	width: 2rem;
	height: auto;
`;

const Copyright = styled.div`
	grid-area: copyright;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
`;
const Footer = () => {
	return (
		<StyledFooter>
			<DivLogo>
				<Link to="/">
					<img src={logo} alt="" />
					<TextLogo>
						<span>Servicios</span>
						<BlueText>Club</BlueText>
					</TextLogo>
				</Link>
			</DivLogo>
			<About>
				<SectionTitle>Sobre Nosotros</SectionTitle>
				<StyledUl>
					<li>
						<Link to="/sobre-nosotros">Nuestro equipo</Link>
					</li>
					<li>
						<Link to="/contacto">Contacto</Link>
					</li>
				</StyledUl>
			</About>
			<Support>
				<SectionTitle>Soporte</SectionTitle>
				<StyledUl>
					<li>
						<Link to="/como-funciona">¿Cómo funciona?</Link>
					</li>
					<li>
						<Link to="/ayuda">Ayuda</Link>
					</li>
					<li>
						<Link to="/terminos-y-condiciones">Termino y condiciones</Link>
					</li>
				</StyledUl>
			</Support>
			<SocialMedia>
				<IconsUl>
					<a href="https://www.facebook.com/servici0sclub">
						<StyledIcon icon={faFacebook} />
					</a>
					<a href="https://www.instagram.com/servicios.club">
						<StyledIcon icon={faInstagram} />
					</a>
				</IconsUl>
			</SocialMedia>
			<Copyright>Copyright © 2023 ServiciosClub</Copyright>
		</StyledFooter>
	);
};

export default Footer;
