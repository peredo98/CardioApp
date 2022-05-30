import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FormularioDiario from './formularios';
import FormularioSemanal from './formularios';
import FormularioMensual from './formularios';


ReactDOM.render(
	<React.StrictMode>
		<div className="contenedor">
			<FormularioSemanal />
		</div>
	</React.StrictMode>,
	document.getElementById('root')
);
