import { useState } from 'react';
// import person1 from '../assets/images/person1.jpg';
import styled from 'styled-components';

const UploadAndDisplayImage = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	const userImg = JSON.parse(localStorage.getItem('user')).profileImg;

	return (
		<StyledContainer>
			{!selectedImage && (
				<div>
					<img alt="not found" src={userImg} />
				</div>
			)}
			{selectedImage && (
				<div>
					<img alt="not found" src={URL.createObjectURL(selectedImage)} />
				</div>
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
	margin-left: 5%;
	width: 100%;
	padding-top: 5%;
	display: flex;
	justify-content: space-between;

	img {
		border-radius: 10px;
	}
`;

export default UploadAndDisplayImage;
