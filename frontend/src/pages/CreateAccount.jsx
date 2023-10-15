import { Link } from 'react-router-dom';
import styled from 'styled-components';
import meta from '../assets/images/meta.svg';
import google from '../assets/images/google.svg';

const DivContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 2rem;
	gap: 0.8rem;
	a {
		color: var(--primary);
	}
	span {
		padding: 0.4rem;
	}
`;

const StyledTitle = styled.span`
	padding-bottom: 1rem;
	font-size: 1.8rem;
	font-weight: bold;
`;

const StyledSpan = styled.span`
	color: var(--primary);
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 1.8rem;
	border: 1px solid black;
	border-radius: 10px;
	max-width: 540px;
	margin: 0 auto;
	gap: 0.2rem;
	text-align: start;
`;

const HorizontalDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9rem;
	gap: 1rem;
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

const DivButton = styled.div`
	padding: 1.2rem 0;
`;
const ButtonForm = styled.button`
	color: #ffffff;
	background-color: var(--primary);
	width: 100%;
	height: 3rem;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;
	&:active {
		background-color: #015ea5;
	}
`;

const ButtonSM = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	margin-top: 0.2rem;
	width: 100%;
	flex-wrap: nowrap;
	background-color: white;
	border: 1px solid var(--primary);
	height: 2rem;
	font-weight: 600;
	font-size: 1rem;
	cursor: pointer;

	&:hover {
		color: var(--primary);
	}
`;

const DivInfoContraseña = styled.div`
	display: flex;
	flex-direction: column;

	color: rgb(0, 0, 0, 0.5);

	ul {
		padding-left: 2.4rem;
	}
`;

const TextTerms = styled.span`
	margin-top: 8px;
`;
const Divider = styled.div`
	width: 100%;
	border-top: 1px solid #000;
	margin: 10px 0;
`;
const DivSecundario = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	gap: 0.4rem;
`;

const CreateAccount = () => {
	return (
		<DivContainer>
			<StyledTitle>
				Crea tu<StyledSpan>Cuenta</StyledSpan>
			</StyledTitle>
			<StyledForm action="" method="">
				<HorizontalDiv>
					<LabelDiv>
						<label htmlFor="">Nombre</label>
						<StyledInput type="text" name="" id="" />
					</LabelDiv>
					<LabelDiv>
						<label htmlFor="">Apellido</label>
						<StyledInput type="text" name="" id="" />
					</LabelDiv>
				</HorizontalDiv>
				<LabelDiv>
					<label htmlFor="">Email</label>
					<StyledInput type="email" name="" id="" />
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="">Contraseña</label>
					<StyledInput type="password" name="" id="" />
				</LabelDiv>
				<DivInfoContraseña>
					<span>Su contraseña debe:</span>
					<ul>
						<li>tener entre 6 y 12 caracteres</li>
						<li>solo contener letras y/o números</li>
					</ul>
				</DivInfoContraseña>
				<TextTerms>
					Al hacer clic en Crear cuenta, acepta las Condiciones de uso y la
					Política de privacidad.
				</TextTerms>
				<DivButton>
					<ButtonForm type="">Crear Cuenta</ButtonForm>
				</DivButton>
				<Divider />
				<DivSecundario>
					<span>
						Al hacer clic en Regístrate con Facebook o Regístrate con Google,
						aceptas las Condiciones de uso y la Política de privacidad.
					</span>
					<ButtonSM>
						<img src={meta} alt="meta icon" />
						Iniciar sesión con Meta
					</ButtonSM>
					<ButtonSM>
						<img src={google} alt="google icon" />
						Iniciar sesión con Google
					</ButtonSM>
				</DivSecundario>
			</StyledForm>
			<span>
				¿Ya tiene una cuenta? Clickea aquí para&nbsp;
				<Link to="/iniciar-sesion">iniciar sesión.</Link>
			</span>
		</DivContainer>
	);
};

export default CreateAccount;
