import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';
import serviciosclub from '../assets/logo/ServiciosClubBlue.svg';
import { NavLink } from 'react-router-dom';

export const NavbarPrincipal = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 3rem;
	height: var(--navbar-height);
	border-bottom: 1px solid #cdcdcd;
	color: rgb(0, 0, 0, 0.6);
	gap: 10px;
`;

export const Logo = styled.img`
	max-width: 200px;
	height: auto;
`;

export const NavUl = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	gap: 1.5rem;
	align-items: center;
`;

const StyledLink = styled(NavLink)`
	&:hover {
		color: var(--primary);
	}
`;

const HideOnMobile = styled.div`
	display: block;

	@media (max-width: 920px) {
		display: none;
	}
`;

const HideOnXsMobile = styled.div`
	display: block;

	@media (max-width: 580px) {
		display: none;
	}
`;

const Navbar = () => {
	return (
		<NavbarPrincipal>
			<StyledLink to="/">
				<Logo src={serviciosclub} alt="logo" />
			</StyledLink>
			<NavUl>
				<HideOnMobile>
					<li>
						<StyledLink to="/">Home</StyledLink>
					</li>
				</HideOnMobile>
				<HideOnXsMobile>
					<li>
						<StyledLink to="/categorias">Servicios</StyledLink>
					</li>
				</HideOnXsMobile>
			</NavUl>
			<NavUl>
				<HideOnMobile>
					<li>
						<ButtonBlue>Solo estoy viendo</ButtonBlue>
					</li>
				</HideOnMobile>
				<HideOnMobile>
					<li>
						<StyledLink to="/crear-cuenta">Registrarse</StyledLink>
					</li>
				</HideOnMobile>
				<li>
					<StyledLink to="/iniciar-sesion">Iniciar Sesion</StyledLink>
				</li>
			</NavUl>
		</NavbarPrincipal>
	);
};

export default Navbar;
