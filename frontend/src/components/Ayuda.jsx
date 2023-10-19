const Ayuda = () => {
	const url = 'https://serviceclub.onrender.com/api/session';

	function buscarUsuario() {
		const token = localStorage.getItem('token');

		const payloadCurrentUser = {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		};
		//Obtener datos usuario usando token
		fetch(`${url}/current`, payloadCurrentUser)
			.then((response) => response.json())
			.then((data) => {
				console.log(data._id);
				localStorage.setItem('id', data._id);
			});
	}
	return <button onClick={buscarUsuario}>Ayuda</button>;
};

export default Ayuda;
