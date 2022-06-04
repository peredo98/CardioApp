import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const FormularioDiario = () => {
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
						errores.distolica = 'Por favor ingresa una presión diastólica'
					} else if(!/^[0-9]*$/.test(valores.distolica)){
						errores.distolica = 'La presión diastólica solo puede contener números'

					}

					// Validación pulso
					if(!valores.pulso){
						errores.pulso = 'Por favor ingresa un pulso'
					} else if(!/^[0-9]*$/.test(valores.pulso)){
						errores.pulso = 'La presión diastólica solo puede contener números'

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
							<label htmlFor="distolica">Presión diastólica</label>
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


const FormularioSemanal = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{
					diametroAbdominal: '',
					peso: '',

				}}
				validate={(valores) => {
					let errores = {};


					// Validación diametroAbdominal
					if(!valores.diametroAbdominal){
						errores.diametroAbdominal = 'Por favor ingresa tu diámetro abdominal'
					} else if(!/^[0-9]*$/.test(valores.diametroAbdominal)){
						errores.diametroAbdominal = 'La presión diastólica solo puede contener números'

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
							<label htmlFor="diametroAbdominal">Diametro abdominal</label>
							<Field
								type="text" 
								id="diametroAbdominal" 
								name="diametroAbdominal" 
								placeholder="Ej. 100"  	
							/>
							<ErrorMessage name="diametroAbdominal" component={() => (
								<div className='error'>{errors.diametroAbdominal}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="peso">Peso</label>
							<Field
								type="text" 
								id="diametroAbdominal" 
								name="peso" 
								placeholder="Ej. 70"  	
							/>
							<ErrorMessage name="peso" component={() => (
								<div className='error'>{errors.peso}</div>
							)}/>
						</div>

					

						<button type="submit">Enviar</button>
						{formularioEnviado && <p className='exito'>Formulario enviado con éxito!</p>}
					</Form>
				)}

			</Formik>
		</>
	);
}


const FormularioMensual = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	return (
		<>
			<Formik
				initialValues={{

					glucosa: '',
					trigliceridos: '',
					LDL: '',
					HDL: '',

				}}
				validate={(valores) => {
					let errores = {};


					// Validación sistólica
					if(!valores.glucosa){
						errores.glucosa = 'Por favor ingresa tu glucosa'
					} else if(!/^[0-9]*$/.test(valores.glucosa)){
						errores.glucosa = 'La presión sistólica solo puede contener números'

					}

					// Validación sistólica
					if(!valores.trigliceridos){
						errores.trigliceridos = 'Por favor ingresa tus triglicéridos'
					} else if(!/^[0-9]*$/.test(valores.trigliceridos)){
						errores.trigliceridos = 'La presión diastólica solo puede contener números'

					}

					// Validación LDL
					if(!valores.LDL){   
						errores.LDL = 'Por favor ingresa un LDL'
					} else if(!/^[0-9]*$/.test(valores.LDL)){
						errores.LDL = 'La presión diastólica solo puede SADDDDDDDDDDDDDDDD'

					}

					// Validación HDL
					if(!valores.HDL){
						errores.HDL = 'Por favor ingresa un HDL'
					} else if(!/^[0-9]*$/.test(valores.HDL)){
						errores.HDL = 'El HDL solo puede contener números'

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
							<label htmlFor="glucosa">Glucosa</label>
							<Field
								type="text" 
								id="glucosa" 
								name="glucosa" 
								placeholder="Ej. 120"  	
							/>
							<ErrorMessage name="glucosa" component={() => (
								<div className='error'>{errors.glucosa}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="trigliceridos">Triglicéridos</label>
							<Field
								type="text" 
								id="trigliceridos" 
								name="trigliceridos" 
								placeholder="Ej. 80"  	
							/>
							<ErrorMessage name="trigliceridos" component={() => (
								<div className='error'>{errors.trigliceridos}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="LDL">LDL</label>
							<Field
								type="text" 
								id="LDL" 
								name="LDL" 
								placeholder="Ej. 100"  	
							/>
							<ErrorMessage name="LDL" component={() => (
								<div className='error'>{errors.LDL}</div>
							)}/>
						</div>

						<div>
							<label htmlFor="HDL">HDL</label>
							<Field
								type="text" 
								id="LDL" 
								name="HDL" 
								placeholder="Ej. 70"  	
							/>
							<ErrorMessage name="HDL" component={() => (
								<div className='error'>{errors.HDL}</div>
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


export default (FormularioMensual, FormularioDiario, FormularioSemanal);