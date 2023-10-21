import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ButtonBlue } from '../styledcomponents/Buttons';
import { provincias } from './CreateAccount';

const url = 'https://serviceclub.onrender.com/api/services/';

const OfrecerServicio = () => {
	const professions = [
		{
			label: 'Pintores',
			value: 'painter',
		},
		{
			label: 'Plomeros',
			value: 'plumber',
		},
		{
			label: 'Electricistas',
			value: 'electrician',
		},
		{
			label: 'Albañiles',
			value: 'bricklayer',
		},
		{
			label: 'Carpinteros',
			value: 'carpenter',
		},
		{
			label: 'Fleteros',
			value: 'freight',
		},
		{
			label: 'Cerrajeros',
			value: 'locksmith',
		},
		{
			label: 'Jardineros',
			value: 'gardener',
		},
		{
			label: 'Gasistas',
			value: 'gas-fitter',
		},
		{
			label: 'Fumigadores',
			value: 'fumigator',
		},
		{
			label: 'Técnicos en Aire Acondicionado',
			value: 'air-conditioner',
		},
		{
			label: 'Técnicos en Electrodomesticos',
			value: 'appliance',
		},
	];

	const { register, handleSubmit } = useForm();
	const onSubmit = handleSubmit((data) => {
		const userId = localStorage.getItem('id');
		data.userId = userId;
		data.certified = true;

		const payload = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
			},
		};

		fetch(url, payload)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data.status === 'created') {
					alert('Servicio Creado con éxito');
				} else {
					alert(data.response);
				}
			});
	});

	return (
		<Container>
			<Title>
				Quiero ofrecer un <BlueText>servicio.</BlueText>
			</Title>
			<Form onSubmit={onSubmit}>
				<Column>
					<Label htmlFor="category">Categoría</Label>
					<Select id="category" {...register('category')}>
						<option value="">Selecciona una categoría</option>
						{professions.map((category) => (
							<option key={category.value} value={category.value}>
								{category.label}
							</option>
						))}
					</Select>
				</Column>
				<Column>
					<Label htmlFor="description">Descripción</Label>
					<TextArea
						id="description"
						placeholder="Ej: 7 años de experiencia en..."
						{...register('description')}
					></TextArea>
				</Column>

				<Column>
					<Label htmlFor="serviceLocation">Localidad</Label>
					<Select id="serviceLocation" {...register('serviceLocation')}>
						<option value="">Selecciona una provincia</option>
						{provincias.map((provincia) => (
							<option key={provincia.value} value={provincia.value}>
								{provincia.label}
							</option>
						))}
					</Select>
				</Column>
				<ButtonBlue>Publicar</ButtonBlue>
			</Form>
		</Container>
	);
};
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3rem;
	align-self: center;
`;

const Title = styled.h1`
	font-weight: bold;
	font-size: 1.3rem;
	margin: 1rem 0 2rem 0;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 80%;
`;

/*const Row = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;*/

const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Label = styled.label`
	font-weight: bold;
`;

const TextArea = styled.textarea`
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	height: 100px;
	resize: none;
	width: 100%;
	height: 10rem;
`;

const Select = styled.select`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const BlueText = styled.span`
	color: var(--primary);
`;

export default OfrecerServicio;
