import styled from 'styled-components';
import MainScreen from '../components/MainScreen';
import Categories from '../components/Categories';

export const Container = styled.div`
	width: 1300px;
	margin: 0 auto;
`;

const Home = () => {
	return (
		<Container>
			<MainScreen />
			<Categories />
		</Container>
	);
};

export default Home;
