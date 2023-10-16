import bcrypt from 'bcrypt';

export const createHash = async (password) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

export const evaluatePassword = async (user, password) => {
	const isMatch = await bcrypt.compare(password, user.password);
	return isMatch;
};
