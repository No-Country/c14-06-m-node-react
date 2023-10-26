import styled from 'styled-components';

const Button = styled.span`
	content: '';
	position: absolute;
	top: 3.7px;
	left: 5px;
	width: 23px;
	height: 23px;
	border-radius: 45px;
	transition: 0.2s;
	background: #fff;
	box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	width: 60px;
	height: 30px;
	background: rgba(205, 205, 205, 1);
	border-radius: 100px;
	position: relative;
	transition: background-color 0.2s;
	&:active ${Button} {
		width: 50px;
	}
`;

const Input = styled.input`
	height: 0;
	width: 0;
	visibility: hidden;
	&:checked + ${Label} ${Button} {
		left: calc(100% - 5px);
		transform: translateX(-100%);
	}
`;

// eslint-disable-next-line react/prop-types
const Switch = ({ isOn, handleToggle, onColor }) => {
	return (
		<>
			<Input
				checked={isOn}
				onChange={handleToggle}
				className="react-switch-checkbox"
				id={'react-switch-new'}
				type="checkbox"
			/>
			<Label
				style={{ background: isOn && onColor }}
				className="react-switch-label"
				htmlFor={'react-switch-new'}
			>
				<Button className={'react-switch-button'} />
			</Label>
		</>
	);
};

export default Switch;
