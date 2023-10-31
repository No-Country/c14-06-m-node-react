import { useState } from 'react';
import styled from 'styled-components';
import noPhoto from '../assets/images/noPhoto.png';

const UploadAndDisplayImage = () => {
	const url = 'https://serviceclub.onrender.com/api/users';
	const user = JSON.parse(localStorage.getItem('user'));
	const userToken = localStorage.getItem('token');
	const userImg = user.profileImg;

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
					alert('Imagen cambiada con exito');
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<StyledContainer>
			{!selectedImage && userHasPhoto(imageValid)}
			{selectedImage && (
				<div>
					<img alt="not found" src={URL.createObjectURL(selectedImage)} />
				</div>
			)}
			{/* {imageValid ? (
				<Image
					src={selectedImage}
					// src={URL.createObjectURL(selectedImage)}
					alt="Mi imagen de perfil"
					onError={handleImageError}
				/>
			) : (
				<Image src={noPhoto} alt="Mi perfil sin imagen" />
			)} */}
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
				<button onClick={fileUploadHandler}>Cambiar</button>
			)}
		</StyledContainer>
	);
};

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

// const uploadImage = (img) => {
//
// };

export default UploadAndDisplayImage;
