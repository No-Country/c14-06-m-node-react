import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';
import logo from '../assets/logo/logo.png';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';

const IsLoggedIn = localStorage.token ? true : false;

const loggedOut = () => {
	localStorage.clear();
	location.replace('/');
};

const Navbar = () => {
	return (
		<NavbarPrincipal>
			<Link to="/">
				<Logo src={logo} alt="logo" />
				<TextLogo>
					<span>Servicios</span>
					<BlueText>Club</BlueText>
				</TextLogo>
			</Link>
			<NavUl>
				<HideOnMobile>
					<Li>
						<StyledLink to="/">Home</StyledLink>
					</Li>
				</HideOnMobile>
				<HideOnXsMobile>
					<Li>
						<HashLink smooth to="/#categories">
							Categorias <ArrowIcon icon={faChevronDown} />
						</HashLink>
					</Li>
				</HideOnXsMobile>
			</NavUl>
			<NavUl>
				{IsLoggedIn ? (
					<Invisible />
				) : (
					<HideOnMobile>
						<Li>
							<Link to="/crear-cuenta">
								<ButtonBlue>Registrarse</ButtonBlue>
							</Link>
						</Li>
					</HideOnMobile>
				)}
				{IsLoggedIn ? (
					<Link onClick={loggedOut}>
						<ButtonBlue>Cerrar Sesión</ButtonBlue>
					</Link>
				) : (
					<Li>
						<StyledLink to="/iniciar-sesion">Iniciar Sesion</StyledLink>
					</Li>
				)}

				{IsLoggedIn ? (
					<HideOnMobile>
						<Li>
							<StyledLink to="/ofrecer-servicio">
								Ofrecer un servicio
							</StyledLink>
						</Li>
					</HideOnMobile>
				) : (
					<Invisible />
				)}
			</NavUl>
		</NavbarPrincipal>
	);
};

const Invisible = styled.div`
	display: none;
	visibility: hidden;
`;
const NavbarPrincipal = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 3rem;
	height: var(--navbar-height);
	border-bottom: 1px solid #cdcdcd;
	color: rgb(0, 0, 0, 0.8);
	gap: 10px;
`;

const Logo = styled.img`
	max-width: 45px;
	height: auto;
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

const NavUl = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	gap: 1.5rem;
	align-items: center;
	font-size: 0.9rem;
	height: 100%;
`;

const Li = styled.li`
	height: 100%;
	&:hover {
		color: var(--primary);
		cursor: pointer;
	}
`;

const Link = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

const StyledLink = styled(NavLink)`
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 100%;
	&.active {
		border-bottom: 3px solid var(--primary);
	}
`;

const ArrowIcon = styled(FontAwesomeIcon)`
	font-size: 0.6rem;
	margin-left: 4px;
`;

const HideOnMobile = styled.div`
	display: block;
	height: 100%;
	@media (max-width: 940px) {
		display: none;
	}
`;

const HideOnXsMobile = styled.div`
	display: block;
	@media (max-width: 600px) {
		display: none;
	}
`;
export default Navbar;
