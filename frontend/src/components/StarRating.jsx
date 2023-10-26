import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const StarRating = ({ rating = 0 }) => {
	const [stars, setStars] = useState('☆☆☆☆☆');

	useEffect(() => {
		// Calcula las estrellas completas
		const fullStars = '★'.repeat(rating);

		// Calcula las estrellas vacías
		const emptyStars = '☆'.repeat(5 - fullStars.length);

		// Combina las estrellas
		setStars(fullStars + emptyStars);
	}, [rating]);
	return <div>{stars}</div>;
};
StarRating.propTypes = {
	rating: PropTypes.number,
};
export default StarRating;
