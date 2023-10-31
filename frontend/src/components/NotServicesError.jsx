import styled from 'styled-components';

/* eslint-disable react/prop-types */
const NotServicesError = ({ state, message }) => {
	return (
		<>
			{state && (
				<Container>
					<h1>{message}</h1>
				</Container>
			)}
		</>
	);
};

export default NotServicesError;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;
