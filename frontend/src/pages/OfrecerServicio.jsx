import styled from 'styled-components';
import { ButtonBlue } from '../styledcomponents/Buttons';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	width: 80vw;
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

const Row = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Label = styled.label`
	font-weight: bold;
`;

const TextArea = styled.textarea`
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	height: 100px;
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

const OfrecerServicio = () => {
	const professions = [
		'Pintores',
		'Plomeros',
		'Electricistas',
		'Albañiles',
		'Carpinteros',
		'Fleteros',
		'Cerrajeros',
		'Jardineros',
		'Gasistas',
		'Fumigadores',
		'Técnicos en Aire Acondicionado',
		'Técnicos en Electrodomesticos',
	];

	const provincias = [
		{ label: 'Buenos Aires', value: 'Buenos Aires' },
		{ label: 'Catamarca', value: 'Catamarca' },
		{ label: 'Chaco', value: 'Chaco' },
		{ label: 'Chubut', value: 'Chubut' },
		{ label: 'Córdoba', value: 'Córdoba' },
		{ label: 'Corrientes', value: 'Corrientes' },
		{ label: 'Entre Ríos', value: 'Entre Ríos' },
		{ label: 'Formosa', value: 'Formosa' },
		{ label: 'Jujuy', value: 'Jujuy' },
		{ label: 'La Pampa', value: 'La Pampa' },
		{ label: 'La Rioja', value: 'La Rioja' },
		{ label: 'Mendoza', value: 'Mendoza' },
		{ label: 'Misiones', value: 'Misiones' },
		{ label: 'Neuquén', value: 'Neuquén' },
		{ label: 'Río Negro', value: 'Río Negro' },
		{ label: 'Salta', value: 'Salta' },
		{ label: 'San Juan', value: 'San Juan' },
		{ label: 'San Luis', value: 'San Luis' },
		{ label: 'Santa Cruz', value: 'Santa Cruz' },
		{ label: 'Santa Fe', value: 'Santa Fe' },
		{ label: 'Santiago del Estero', value: 'Santiago del Estero' },
		{ label: 'Tierra del Fuego', value: 'Tierra del Fuego' },
		{ label: 'Tucumán', value: 'Tucumán' },
	];

	return (
		<Container>
			<Title>
				Quiero ofrecer un <BlueText>servicio.</BlueText>
			</Title>
			<Form>
				<Row>
					<Column>
						<Label htmlFor="description">Descripción</Label>
						<TextArea
							id="description"
							placeholder="Ej: 7 años de experiencia en..."
						></TextArea>
					</Column>
					<Column>
						<Label htmlFor="profession">Categoría</Label>
						<Select id="profession">
							<option value="">Selecciona una categoría</option>
							{professions.map((profession) => (
								<option key={profession} value={profession}>
									{profession}
								</option>
							))}
						</Select>
					</Column>
				</Row>
				<Column>
					<Label htmlFor="province">Localidad</Label>
					<Select id="province">
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

export default OfrecerServicio;
