import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Modal from '../components/Modal';
import { provincias } from '../assets/usefulData';

const endpoint = 'https://serviceclub.onrender.com/api/session/register';

const CreateAccount = () => {
	const [modalState, changeModalState] = useState(false);
	const [titulo, changeTitulo] = useState('Cargando ...');
	const [parrafo, changeParrafo] = useState('Por favor espera.');
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		changeModalState(true);
		data.role = 'user';
		data.profileImg = '';
		const payload = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
			},
		};

		fetch(endpoint, payload)
			.then((response) => {
				if (response.status === 201) {
					//APARECE MODEAL DE REGISTRO EXITOSO
					changeTitulo('Te registraste exitosamente!');
					changeParrafo('Redirigiendo a la web de ServiciosClub');
					setTimeout(() => {
						location.replace('/iniciar-sesion');
					}, 3000);

					return response.json();
				} else if (response.status === 400) {
					//Cambia titulo y parrafo de Modal
					changeTitulo('Correo usado');
					changeParrafo('Intenta con otro correo');
					setTimeout(() => {
						//Modal vuelve a su estado original
						changeModalState(false);
						changeTitulo('Cargando ...');
						changeParrafo('Por favor espera.');
					}, 3000);
				}
			})
			.then((data) => data);
	});
	return (
		<DivContainer>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>
			<StyledTitle>
				Crea tu<StyledSpan>Cuenta</StyledSpan>
			</StyledTitle>
			<StyledForm onSubmit={onSubmit}>
				{/* <HorizontalDiv> */}
				<LabelDiv>
					<label htmlFor="name">Nombre</label>
					<StyledInput
						type="text"
						name="name"
						id="name"
						placeholder="John"
						{...register('name', {
							required: { value: true, message: 'Nombre es requerido' },
							minLength: {
								value: 2,
								message: 'Nombre debe tener al menos 2 caracteres',
							},
							maxLength: {
								value: 30,
								message: 'Nombre no puede tener mas de 30 caracteres',
							},
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: 'Nombre solo acepta letras',
							},
						})}
					/>
					{errors.name && (
						<StyledSpanErrores>{errors.name.message}</StyledSpanErrores>
					)}
				</LabelDiv>

				{/* //INPUT APELLIDO USUARIO */}
				<LabelDiv>
					<label htmlFor="surname">Apellido</label>
					<StyledInput
						type="text"
						name="surname"
						id="surname"
						placeholder="Wayne"
						{...register('surname', {
							required: { value: true, message: 'Apellido es requerido' },
							minLength: {
								value: 2,
								message: 'Apellido debe tener al menos 2 caracteres',
							},
							maxLength: {
								value: 20,
								message: 'Apellido no puede tener mas de 30 caracteres',
							},
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: 'Apellido solo acepta letras',
							},
						})}
					/>
					{errors.surname && (
						<StyledSpanErrores>{errors.surname.message}</StyledSpanErrores>
					)}
				</LabelDiv>
				{/* </HorizontalDiv> */}

				{/* //INPUT EMAIL USUARIO */}
				<LabelDiv>
					<label htmlFor="email">Email</label>
					<StyledInput
						type="email"
						name="email"
						id="email"
						placeholder="gotham@city.go"
						{...register('email', {
							required: { value: true, message: 'Correo es requerido' },
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Correo no válido',
							},
						})}
					/>
					{errors.email && (
						<StyledSpanErrores>{errors.email.message}</StyledSpanErrores>
					)}
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="phone">Telefono</label>
					<ContainerPhone>
						<AreaCode>+54</AreaCode>
						<StyledInputPhone
							type="tel"
							name="phone"
							placeholder="1234567890"
							id="phone"
							{...register('phone', {
								required: {
									value: true,
									message: 'Telefono es requerido',
								},
								pattern: {
									value: /^\d{10}$/,
									message: 'Telefono debe tener 10 numeros.',
								},
							})}
						/>
					</ContainerPhone>

					{errors.phone && (
						<StyledSpanErrores>{errors.phone.message}</StyledSpanErrores>
					)}
				</LabelDiv>

				<LabelDiv>
					<label htmlFor="location">Provincia</label>
					<Select
						id="location"
						{...register('location', {
							required: {
								value: true,
								message: 'Debe seleccionar una provincia',
							},
						})}
					>
						<option value="">Selecciona una provincia</option>
						{provincias.map((provincia) => (
							<option key={provincia.value} value={provincia.value}>
								{provincia.label}
							</option>
						))}
					</Select>
					{errors.location && (
						<StyledSpanErrores>{errors.location.message}</StyledSpanErrores>
					)}
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="password">Contraseña</label>
					<StyledInput
						type="password"
						name=""
						id="password"
						{...register('password', {
							required: {
								value: true,
								message: 'Contraseña es requerida',
							},
							minLength: {
								value: 6,
								message: 'Contraseña debe tener al menos 6 caracteres',
							},
							maxLength: {
								value: 50,
								message: 'Contraseña no debe tener más de 50 caracteres',
							},
						})}
					/>
					{errors.password && (
						<StyledSpanErrores>{errors.password.message}</StyledSpanErrores>
					)}
				</LabelDiv>
				<LabelDiv>
					<label htmlFor="confirmPassword">Confirmar Contraseña</label>
					<StyledInput
						type="password"
						name=""
						id="confirmPassword"
						{...register('confirmPassword', {
							required: {
								value: true,
								message: 'Debe confirmar su contraseña',
							},
							validate: (value) =>
								value === watch('password') || 'Las contraseñas no coinciden',
						})}
					/>
					{errors.confirmPassword && (
						<StyledSpanErrores>
							{errors.confirmPassword.message}
						</StyledSpanErrores>
					)}
				</LabelDiv>
				<DivInfoContraseña>
					<span>Su contraseña debe:</span>
					<ul>
						<li>tener entre 6 y 50 caracteres</li>
					</ul>
				</DivInfoContraseña>
				<TextTerms>
					Al hacer clic en Crear cuenta, acepta las Condiciones de uso y la
					Política de privacidad.
				</TextTerms>
				<DivButton>
					<ButtonForm type="">Crear Cuenta</ButtonForm>
				</DivButton>
			</StyledForm>
			<span>
				¿Ya tienes una cuenta? Clickea aquí para&nbsp;
				<Link to="/iniciar-sesion">iniciar sesión.</Link>
			</span>
		</DivContainer>
	);
};

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

const LabelDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.8rem 0;
`;

const StyledSpanErrores = styled.span`
	color: red;
	display: block;
	font-size: medium;
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

const Select = styled.select`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const ContainerPhone = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;

const StyledInput = styled.input`
	height: 2.5rem;
`;

const StyledInputPhone = styled.input`
	height: 2.5rem;
	width: 100%;
`;

const AreaCode = styled.p`
	padding-right: 1%;
`;
export default CreateAccount;
