import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Formulario = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{

					sistolica: '',
					distolica: '',
					pulso: '',
					peso: '',

				}}
				validate={(valores) => {
					let errores = {};


					// Validación sistólica
					if(!valores.sistolica){
						errores.sistolica = 'Por favor ingresa una presión sistólica'
					} else if(!/^[0-9]*$/.test(valores.sistolica)){
						errores.sistolica = 'La presión sistólica solo puede contener números'

					}

					// Validación sistólica
					if(!valores.distolica){
						errores.distolica = 'Por favor ingresa una presión distólica'
					} else if(!/^[0-9]*$/.test(valores.distolica)){
						errores.distolica = 'La presión distólica solo puede contener números'

					}

					// Validación pulso
					if(!valores.pulso){
						errores.pulso = 'Por favor ingresa un pulso'
					} else if(!/^[0-9]*$/.test(valores.pulso)){
						errores.pulso = 'La presión distólica solo puede contener números'

					}

					// Validación peso
					if(!valores.peso){
						errores.peso = 'Por favor ingresa un peso'
					} else if(!/^[0-9]*$/.test(valores.peso)){
						errores.peso = 'El peso solo puede contener números'

					}
					


					return errores;
				}}

				onSubmit={(valores, {resetForm}) => {
					resetForm();
					console.log('Formulario enviado');
					cambiarFormularioEnviado(true);
					setTimeout(() => cambiarFormularioEnviado(false), 5000);
				}}
			>
				{({errors}) => ( 
					<Form className='formulario'>


						<div>
							<label htmlFor="sistolica">Presión sistólica</label>
							<Field
								type="text" 
								id="sistolica" 
								name="sistolica" 
								placeholder="Ej. 120"  	
							/>
							<ErrorMessage name="sistolica" component={() => (
								<div className='error'>{errors.sistolica}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="distolica">Presión distólica</label>
							<Field
								type="text" 
								id="distolica" 
								name="distolica" 
								placeholder="Ej. 80"  	
							/>
							<ErrorMessage name="distolica" component={() => (
								<div className='error'>{errors.distolica}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="pulso">Pulso</label>
							<Field
								type="text" 
								id="pulso" 
								name="pulso" 
								placeholder="Ej. 100"  	
							/>
							<ErrorMessage name="pulso" component={() => (
								<div className='error'>{errors.pulso}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="peso">Peso</label>
							<Field
								type="text" 
								id="pulso" 
								name="peso" 
								placeholder="Ej. 70"  	
							/>
							<ErrorMessage name="peso" component={() => (
								<div className='error'>{errors.peso}</div>
							)}/>
						</div>

					
						<div>
							<label>
								<Field type="radio" name="sexo" value="hombre" /> hombre
							</label>
							<label>
								<Field type="radio" name="sexo" value="mujer" /> mujer
							</label>
						</div>

						<div>
						
							<Field name ="mensaje" as="textarea" placeholder="Comentarios para el doctor"/>
						</div>

						<button type="submit">Enviar</button>
						{formularioEnviado && <p className='exito'>Formulario enviado con éxito!</p>}
					</Form>
				)}

			</Formik>
		</>
	);
}
 
export default Formulario;