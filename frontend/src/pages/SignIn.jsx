import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem 20rem;
	color: #000000;
	font-size: 20px;
`;

const StyledH1 = styled.h1`
	padding: 2rem;
`;

const StyledSpan = styled.span`
	color: #0e76a8;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 60vh;
	padding: 2rem;
	border: 1px solid black;
	border-radius: 10px;
`;

const NameDiv = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 5%;
`;
const LabelDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.8rem 0;
`;

const StyledInput = styled.input`
	height: 2.5rem;
`;

// const DivPassRequirement = styled.div``;

// const StyledUl = styled.ul`
// 	margin: 5%;
// `;
const DivButton = styled.div`
	padding: 2rem 0;
`;
const ButtonForm = styled.button`
	color: #ffffff;
	background-color: #0e76a8;
	width: 100%;
	height: 3rem;
	font-weight: 600;
	font-size: 14px;
`;

const SignIn = () => {
	return (
		<DivContainer>
			<StyledH1>
				Bienvenido a Servicios<StyledSpan>Club</StyledSpan>
			</StyledH1>
			<StyledForm action="" method="">
				<LabelDiv>
					<label htmlFor="">Email</label>
					<StyledInput type="email" name="" id="" />
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="">Contraseña</label>
					<StyledInput type="password" name="" id="" />
				</LabelDiv>
				<NameDiv>
					<div>
						<input type="checkbox"></input>
						<label>Recordarme</label>
					</div>
					<div>
						<Link to="/recuperar-pass">¿Olvidaste tu contraseña?</Link>
					</div>
				</NameDiv>

				<DivButton>
					<ButtonForm type="">Iniciar Sesión</ButtonForm>
				</DivButton>
			</StyledForm>
		</DivContainer>
	);
};

export default SignIn;
