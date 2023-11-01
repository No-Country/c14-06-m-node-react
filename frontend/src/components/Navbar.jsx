import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';
import logo from '../assets/logo/logo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { HashLink } from 'react-router-hash-link';

const IsLoggedIn = localStorage.token ? true : false;

const loggedOut = () => {
	localStorage.clear();
	location.replace('/');
};

const Navbar = () => {
	const path = useLocation().pathname;
	console.log(path);
	return (
		<NavbarPrincipal>
			<Link to="/">
				<Logo src={logo} alt="logo" />
				<TextLogo>
					<span>Servicios</span>
					<BlueText>Club</BlueText>
				</TextLogo>
			</Link>
			{/* <Burger>
				<BurgerSpan></BurgerSpan>
				<BurgerSpan></BurgerSpan>
				<BurgerSpan></BurgerSpan>
			</Burger> */}
			<NavUl>
				<HideOnMobile>
					<Li>
						<StyledLink to="/">Home</StyledLink>
					</Li>
				</HideOnMobile>
				{IsLoggedIn ? (
					<HideOnMobile>
						<Li>
							<StyledLink to="/mi-perfil">Mi Perfil</StyledLink>
						</Li>
					</HideOnMobile>
				) : (
					<Invisible />
				)}

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
				{IsLoggedIn ? (
					<Invisible />
				) : (
					<HideOnMobile>
						<Li>
							<Link
								to={{
									pathname: '../crear-cuenta',
								}}
								state={{ returnTo: path }}
							>
								<ButtonBlue>Registrarse</ButtonBlue>
							</Link>
						</Li>
					</HideOnMobile>
				)}
				{IsLoggedIn ? (
					<Link onClick={loggedOut}>
						<StyledButtonBlue>Cerrar Sesión</StyledButtonBlue>
					</Link>
				) : (
					<Li>
						<StyledLink
							to={{
								pathname: '../iniciar-sesion',
							}}
							state={{ returnTo: path }}
						>
							Iniciar Sesion
						</StyledLink>
					</Li>
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
	position: sticky;
	top: 0;
	background-color: #ffffff;
	z-index: 1100;
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
	@media (max-width: 460px) {
		display: none;
	}
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

const StyledButtonBlue = styled(ButtonBlue)`
	padding: 0.7rem 0.4rem;
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

// const Burger = styled.div`
// 	display: flex;
// 	position: absolute;
// 	top: 1rem;
// 	right: 1.75rem;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	width: 2.25rem;
// 	height: 2rem;
// `;

// const BurgerSpan = styled.span`
// 	height: 0.4rem;
// 	width: 100%;
// 	background-color: #333333;
// 	border-radius: 0.2rem;
// `;

export default Navbar;
