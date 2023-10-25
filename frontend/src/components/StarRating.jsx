import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const StarRating = ({ rating = 0 }) => {
	const [stars, setStars] = useState('☆☆☆☆☆');

	useEffect(() => {
		// Redondea la calificación al número entero más cercano
		const roundedRating = Math.round(rating / 20); // Dividido por 20 ya que 100 / 5 = 20

		// Calcula las estrellas completas
		const fullStars = '★'.repeat(roundedRating);

		// Calcula las estrellas vacías
		const emptyStars = '☆'.repeat(5 - fullStars.length);

		// Combina las estrellas
		setStars(fullStars + emptyStars);
	}, [rating]);
	return <div>{stars}</div>;
};
StarRating.propTypes = {
	rating: PropTypes.number.isRequired,
};
export default StarRating;
