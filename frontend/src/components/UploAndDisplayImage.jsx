import { useState } from 'react';
import styled from 'styled-components';
import noPhoto from '../assets/images/noPhoto.png';

const UploadAndDisplayImage = () => {
	const [, /*selectedImage*/ setSelectedImage] = useState(null);
	const userImg = JSON.parse(localStorage.getItem('user')).profileImg;

	const [imageValid, setImageValid] = useState(true);
	const handleImageError = () => {
		setImageValid(false);
	};
	console.log(userImg);

	return (
		<StyledContainer>
			{imageValid ? (
				<Image
					src={userImg}
					alt="Mi imagen de perfil"
					onError={handleImageError}
				/>
			) : (
				<Image src={noPhoto} alt="Mi perfil sin imagen" />
			)}
			<StyledLabel>
				<StyledInputFile
					type="file"
					name="myImage"
					accept="image/png, image/jpeg"
					onChange={(event) => {
						console.log(event.target.files[0]);
						setSelectedImage(event.target.files[0]);
					}}
				/>
				Editar
			</StyledLabel>
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

export default UploadAndDisplayImage;
