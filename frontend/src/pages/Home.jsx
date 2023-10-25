import MainScreen from '../components/MainScreen';
import Categories from '../components/Categories';

// const userData =localStorage.getItem('user');
// console.log(userData);

const Home = () => {
	return (
		<>
			<MainScreen />
			<Categories />
		</>
	);
};

export default Home;
