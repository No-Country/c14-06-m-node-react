import styled from 'styled-components';
import { provincias } from '../assets/usefulData';
import { ButtonBlue, ButtonGray } from '../styledcomponents/Buttons';

import { useForm } from 'react-hook-form';
import UploadAndDisplayImage from './UploAndDisplayImage';
import Modal from './Modal';
import { useState } from 'react';

export default function Profile() {
	const userId = JSON.parse(localStorage.getItem('user'))._id;
	const userToken = localStorage.getItem('token');

	const [modalState, changeModalState] = useState(false);
	const [titulo, changeTitulo] = useState('Cargando ...');
	const [parrafo, changeParrafo] = useState('Por favor espera.');

	const url = 'https://serviceclub.onrender.com/api/users';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const removeEmptyFields = (data) => {
		Object.keys(data).forEach((key) => {
			if (data[key] === '' || data[key] == null) {
				delete data[key];
			}
		});
	};

	const addCodeToPhone = (data) => {
		if (data.phone === '' || data.phone == null) {
			data.phone = '';
		} else {
			const parsePhone = `+54 ${data.phone}`;
			console.log(parsePhone);
			data.phone = parsePhone;
		}
	};

	const isDataEmpty = (data) => {
		if (Object.keys(data).length === 0) {
			return true;
		} else {
			return false;
		}
	};

	const onSubmit = handleSubmit((data) => {
		addCodeToPhone(data);
		removeEmptyFields(data);

		if (isDataEmpty(data)) {
			return alert('No se ha realizado ningun cambio');
		} else {
			changeModalState(true);
			const payload = {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'application/json',
					Authorization: userToken,
				},
			};

			fetch(`${url}/${userId}`, payload)
				.then((response) => {
					console.log(response);

					if (response.ok) {
						changeTitulo('Cambios realizados con éxito');
						changeParrafo(
							'Para verlos reflejados debes volver a iniciar sesión'
						);
						setTimeout(() => {
							localStorage.clear();
							location.replace('/iniciar-sesion');
						}, 3000);

						return response.json();
					}
				})
				.then((data) => {
					console.log(data);
				});
		}
	});

	return (
		<ContainerDatos>
			<Modal
				state={modalState}
				changeState={changeModalState}
				titulo={titulo}
				parrafo={parrafo}
			></Modal>
			<h1>Editar perfil</h1>
			<Form onSubmit={onSubmit}>
				<ContainerA>
					<SubContainer>
						<Label htmlFor="">Nombre</Label>
						<Input
							type="text"
							name=""
							id=""
							placeholder="Darío"
							{...register('name', {
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
						<Label htmlFor="">Apellido</Label>
						<Input
							type="text"
							name=""
							id=""
							placeholder="Benedetto"
							{...register('surname', {
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
						<Label htmlFor="">Teléfono</Label>
						<ContainerPhone>
							<AreaCode>+54</AreaCode>
							<Input
								type="tel"
								name=""
								id=""
								{...register('phone', {
									pattern: {
										value: /^\d{10}$/,
										message: 'Telefono debe tener 10 numeros.',
									},
								})}
							/>
						</ContainerPhone>{' '}
						{errors.phone && (
							<StyledSpanErrores>{errors.phone.message}</StyledSpanErrores>
						)}
					</SubContainer>

					<UploadAndDisplayImage />
				</ContainerA>
				<Label htmlFor="">Email</Label>
				<Input
					type="email"
					name=""
					id=""
					{...register('email', {
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: 'Correo no válido',
						},
					})}
				/>
				{errors.email && (
					<StyledSpanErrores>{errors.email.message}</StyledSpanErrores>
				)}
				<Label htmlFor="">Provincia</Label>
				<Select>
					<option value="">Selecciona una provincia</option>
					{provincias.map((provincia) => (
						<option key={provincia.value} value={provincia.value}>
							{provincia.label}
						</option>
					))}
				</Select>
				<ContainerBotones>
					<ButtonBlue>Guardar</ButtonBlue>
					<ButtonGray type="button" onClick={() => reset()} value="Cancelar" />
				</ContainerBotones>
			</Form>
		</ContainerDatos>
	);
}

const ContainerA = styled.div`
	display: flex;
	flex-direction: row;
	div {
		width: 50%;
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}
`;

const SubContainer = styled.div`
	label {
		padding: 2% 0;
	}
`;

const Select = styled.select`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const ContainerDatos = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
	background-color: #ffffff;
	padding: 5%;
	margin: 0 5%;
	border: 1px solid #33333333;

	h1 {
		padding-bottom: 5%;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: left;
	gap: 1rem;
	width: 100%;
`;

const Label = styled.label`
	font-weight: bold;
`;

const Input = styled.input`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
`;
const ContainerBotones = styled.div`
	text-align: right;

	:last-child {
		margin-left: 4%;
	}
`;

const StyledSpanErrores = styled.span`
	color: red;
	display: block;
	font-size: medium;
`;

const ContainerPhone = styled.section`
	display: flex;
	align-items: center;
`;

const AreaCode = styled.p`
	padding-right: 1%;
`;
