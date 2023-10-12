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

const DivPassRequirement = styled.div``;

const StyledUl = styled.ul`
	margin: 5%;
`;
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
const CreateAccount = () => {
	return (
		<DivContainer>
			<StyledH1>
				Crea tu <StyledSpan>cuenta</StyledSpan>
			</StyledH1>
			<StyledForm action="" method="">
				<NameDiv>
					<LabelDiv>
						<label htmlFor="">Nombre</label>
						<StyledInput type="text" name="" id="" placeholder="" />
					</LabelDiv>
					<LabelDiv>
						<label htmlFor="">Apellido</label>
						<StyledInput type="text" name="" id="" placeholder="" />
					</LabelDiv>
				</NameDiv>
				<LabelDiv>
					<label htmlFor="">Email</label>
					<StyledInput type="email" name="" id="" />
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="">Contraseña</label>
					<StyledInput type="password" name="" id="" />
				</LabelDiv>
				<DivPassRequirement>
					<p>Su contraseña debe:</p>
					<StyledUl>
						<li>tener entre 8 y 71 caracteres</li>

						<li>no contenga su nombre o correo electrónico</li>

						<li>
							no ser de uso común, fácil de adivinar o contener cualquier
							variación de la palabra “ServiciosClub”
						</li>
					</StyledUl>
				</DivPassRequirement>
				<div>
					<p>
						Al hacer clic en Crear cuenta, acepta las Condiciones de uso y la
						Política de privacidad.
					</p>
				</div>
				<DivButton>
					<ButtonForm type="">Crear cuenta</ButtonForm>
				</DivButton>
			</StyledForm>
		</DivContainer>
	);
};

export default CreateAccount;
