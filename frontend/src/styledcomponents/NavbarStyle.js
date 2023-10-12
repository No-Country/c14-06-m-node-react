import styled from 'styled-components';

export const NavbarPrincipal = styled.nav`
	background-color: #d9d9d9b2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem;
	border-bottom: 1px solid #cdcdcd;
`;

export const NavUl = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	display: flex;
	gap: 2rem;
`;

export const Navli = styled.li`
	&:hover {
		font-weight: 700;
	}
`;

export const Nava = styled.a`
	text-decoration: none;
`;
