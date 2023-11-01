import styled from 'styled-components';
import { provincias } from '../assets/usefulData';
import { ButtonBlue, ButtonGrayInput } from '../styledcomponents/Buttons';
import UserProfileCard from './UserProfileCard';
import { useForm } from 'react-hook-form';

import Modal from './Modal';
import { useState } from 'react';
import noPhoto from '../assets/images/noPhoto.png';

export default function Profile() {
	let user = JSON.parse(localStorage.getItem('user'));
	const userToken = localStorage.getItem('token');
	const userImg = user.profileImg;
	const [active, setActive] = useState(true);
	const [modalState, changeModalState] = useState(false);
	const [titulo, changeTitulo] = useState('Cargando ...');
	const [parrafo] = useState('Por favor espera.');

	const url = 'https://serviceclub.onrender.com/api/users';

	const {
		register,
		handleSubmit,
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
			// console.log(parsePhone);
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

	const dataToLocalStorage = (data) => {
		const dataKeys = Object.keys(data);

		dataKeys.forEach((e) => {
			user[e] = data[e];
			localStorage.setItem('user', JSON.stringify(user));
		});
	};

	//ESTADO BOTON ENVIAR FOTO
	const [hideImgButton, setImgButton] = useState(true);

	const [imageValid, setImageValid] = useState(true);
	const handleImageError = () => {
		setImageValid(false);
	};
	// console.log(userImg);
	const [selectedImage, setSelectedImage] = useState(null);

	const userHasPhoto = (valid) => {
		if (valid) {
			return (
				<Image
					src={userImg}
					// src={URL.createObjectURL(selectedImage)}
					alt="Mi imagen de perfil"
					onError={handleImageError}
				/>
			);
		} else {
			return <Image src={noPhoto} alt="Mi perfil sin imagen" />;
		}
	};

	const fileSelectedHandler = (event) => {
		// console.log(userImg);
		const imgSeleccionada = event.target.files[0];

		if (imgSeleccionada.size < 5242880) {
			console.log(imgSeleccionada);
			setSelectedImage(imgSeleccionada);
			setImgButton(false);
		} else {
			alert('Tamaño de imagen no puede ser superior a 5 mb');
		}
	};

	const fileUploadHandler = () => {
		changeModalState(true);
		const formData = new FormData();
		formData.append('image', selectedImage, selectedImage.name);

		const payload = {
			method: 'PATCH',
			body: formData,
			headers: {
				Authorization: userToken,
			},
		};

		fetch(`${url}/${user._id}/image`, payload)
			.then((response) => {
				// console.log(response);
				if (response.ok) {
					changeTitulo('Imagen cambiada con éxito');
					return response.json();
				} else {
					changeTitulo('Error al cargar la foto');
					setTimeout(() => {
						changeModalState(false);
					}, 2000);
				}
			})
			.then((data) => {
				user.profileImg = data.response.profileImg;
				localStorage.setItem('user', JSON.stringify(user));
				setTimeout(() => {
					changeModalState(false);
					setActive(false);
				}, 2000);
			});
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

			fetch(`${url}/${user._id}`, payload)
				.then((response) => {
					// console.log(response);
					// console.log(data);

					if (response.ok) {
						changeTitulo('Cambios realizados con éxito');
						dataToLocalStorage(data);
						setTimeout(() => {
							changeModalState(false);
						}, 3000);
						return response.json();
					} else {
						changeTitulo('ERROR');
						setTimeout(() => {
							changeModalState(false);
						}, 3000);
					}
				})
				.then(() => {
					setActive(false);
				});
		}
	});

	return (
		<>
			{active ? (
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
									name="name"
									id=""
									defaultValue={user.name}
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
											value:
												/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/, //eslint-disable-line
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
									defaultValue={user.surname}
									{...register('surname', {
										minLength: {
											value: 2,
											message: 'Apellido debe tener al menos 2 caracteres',
										},
										maxLength: {
											value: 30,
											message: 'Apellido no puede tener mas de 30 caracteres',
										},
										pattern: {
											value:
												/^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/, //eslint-disable-line
											message: 'Apellido solo acepta letras',
										},
									})}
								/>
								{errors.surname && (
									<StyledSpanErrores>
										{errors.surname.message}
									</StyledSpanErrores>
								)}
								<Label htmlFor="">Teléfono</Label>
								<ContainerPhone>
									<AreaCode>+54</AreaCode>
									<Input
										type="tel"
										name=""
										id=""
										defaultValue={user.phone.slice(4)}
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
							<StyledContainer>
								{/* <Modal
				state={modal}
				changeState={changeModal}
				titulo={titulo}
				parrafo={parrafo}
			></Modal> */}
								{!selectedImage && userHasPhoto(imageValid)}
								{selectedImage && (
									<div>
										<img
											alt="not found"
											src={URL.createObjectURL(selectedImage)}
										/>
									</div>
								)}
								<StyledLabel>
									<StyledInputFile
										type="file"
										name="myImage"
										accept="image/png, image/jpeg"
										onChange={fileSelectedHandler}
									/>
									Editar
								</StyledLabel>
								{hideImgButton ? (
									<Invisible />
								) : (
									<>
										<ButtonGrayInput
											type="button"
											onClick={fileUploadHandler}
											value="Cambiar Imagen"
										/>
									</>
								)}
							</StyledContainer>

							{/* <UploadAndDisplayImage /> */}
						</ContainerA>
						{/* <Label htmlFor="">Email</Label>
						<Input type="email" name="" id="" value={user.email} disabled />
						{errors.email && (
							<StyledSpanErrores>{errors.email.message}</StyledSpanErrores>
						)} */}
						<Label htmlFor="">Provincia</Label>
						<Select {...register('location')}>
							<option value="">{user.location}</option>
							{provincias.map((provincia) => (
								<option key={provincia.value} value={provincia.value}>
									{provincia.label}
								</option>
							))}
						</Select>
						<ContainerBotones>
							<ButtonBlue>Guardar</ButtonBlue>
							<ButtonGrayInput
								type="button"
								onClick={() => setActive()}
								value="Cancelar"
							/>
						</ContainerBotones>
					</Form>
				</ContainerDatos>
			) : (
				<UserProfileCard />
			)}
		</>
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

const StyledInputFile = styled.input`
	display: none;
`;

const StyledLabel = styled.label`
	background-color: var(--primary);
	color: #ffffff;
	border-radius: 4px;
	padding: 0.7rem 1rem;
	border: none;
	cursor: pointer;
`;

const StyledContainer = styled.div`
	align-items: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 2rem 0 3rem;
	gap: 1rem;
`;

const Image = styled.img`
	max-width: 200px;
	height: auto;
	object-fit: cover;
`;
const Invisible = styled.div`
	display: none;
	visibility: hidden;
`;
