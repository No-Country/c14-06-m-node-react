import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
const Modal = ({ state, titulo, parrafo }) => {
	return (
		<>
			{state && (
				<Overlay>
					<ModalContainer>
						<ModalHeader>
							<h2>{titulo}</h2>
						</ModalHeader>
						<LoaderContainer>
							<Loader />
						</LoaderContainer>
						<p>{parrafo}</p>
					</ModalContainer>
				</Overlay>
			)}
		</>
	);
};

const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
`;
const ModalContainer = styled.div`
	width: 500px;
	height: 400px;
	border-radius: 10px;
	background-color: #fff;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.25);
	padding: 20px;
`;

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;

	justify-content: center;

	h2 {
		padding-top: 30px;
	}
`;

const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: 50px;
`;
const Loader = styled.div`
	border: 10px solid #f3f3f3; /* Light grey */
	border-top: 10px solid #3498db; /* Blue */
	border-radius: 50%;
	width: 90px;
	height: 90px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
export default Modal;
