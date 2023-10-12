import { NavbarPrincipal, NavUl, Navli } from '../styledcomponents/NavbarStyle';
import { ButtonBlue } from '../styledcomponents/Buttons';
import serviciosclub from '../assets/logo/ServiciosClubBlue.svg';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<NavbarPrincipal>
			<Link to="/">
				<img src={serviciosclub} className="logo" alt="" />
			</Link>
			<NavUl>
				<Navli>
					<Link to="/">Home</Link>
				</Navli>
				<Navli>
					<ButtonBlue>Solo estoy viendo</ButtonBlue>
				</Navli>
				<Navli>
					<Link to="/categorias">Explorar</Link>
				</Navli>
			</NavUl>
			<NavUl>
				<li>
					<Link to="/crear-cuenta">Registrarse</Link>
				</li>
				<li>
					<Link to="/iniciar-sesion">Iniciar Sesion</Link>
				</li>
			</NavUl>
		</NavbarPrincipal>
	);
};

export default Navbar;
