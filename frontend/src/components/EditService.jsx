import styled from 'styled-components';
import { ButtonBlue, ButtonGray } from '../styledcomponents/Buttons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const EditService = ({ service }) => {
	const [edit, setEdit] = useState(false);
	const url = 'https://serviceclub.onrender.com/api/services/';
	const getToken = localStorage.getItem('token');

	if (!getToken) {
		location.replace('/');
	}

	const { control, handleSubmit } = useForm();
	const onSubmit = handleSubmit((data) => {
		const payload = {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json',
				Authorization: getToken,
			},
		};

		fetch(url + service._id, payload)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				if (data.status === 'success') {
					location.replace(window.location.origin + '/servicio/' + service._id);
				} else {
					console.log(data.response);
					alert(
						'Error al modificar el servicio. Intente nuevamente más tarde.'
					);
				}
			});
	});
	return (
		<ContainerServicios>
			<Service>
				<div>
					<h5>{service.category.categoryName}</h5>
					<span>Servicio</span>
				</div>
				<div>
					{!edit && (
						<ButtonBlue onClick={() => setEdit(!edit)}>Editar</ButtonBlue>
					)}
				</div>
			</Service>
			{edit && (
				<Edit>
					<Form onSubmit={onSubmit}>
						<Column>
							<Label htmlFor="description">Descripción</Label>
							<Controller
								name="description"
								control={control}
								defaultValue={service.description}
								render={({ field }) => (
									<TextArea
										id="description"
										placeholder="Ej: 7 años de experiencia en..."
										{...field}
									/>
								)}
							/>
						</Column>

						<Column>
							<Label htmlFor="serviceLocation">Localidad</Label>
							<Controller
								name="serviceLocation"
								control={control}
								defaultValue={service.serviceLocation}
								render={({ field }) => (
									<input
										id="serviceLocation"
										placeholder="Ej: Las Flores"
										maxLength={20}
										{...field}
									/>
								)}
							/>
						</Column>
						<Buttons>
							<ButtonBlue>Guardar</ButtonBlue>
							<ButtonGray onClick={() => setEdit(!edit)}>Cancelar</ButtonGray>
						</Buttons>
					</Form>
				</Edit>
			)}
		</ContainerServicios>
	);
};

const ContainerServicios = styled.div`
	margin: 0.8rem 0;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(212, 212, 212, 1);
	padding: 2%;
	gap: 0.8rem;
	h5 {
		font-size: 0.9rem;
	}
	span {
		font-size: 0.8rem;
	}
`;

const Service = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;
const Edit = styled.div``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	width: 100%;
	font-size: 0.8rem;

	input {
		padding: 0.6rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
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
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	resize: none;
	width: 100%;
	height: 10rem;
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.8rem;
`;

EditService.propTypes = {
	service: PropTypes.object,
};
export default EditService;
