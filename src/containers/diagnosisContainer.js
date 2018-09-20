import React from 'react';
import Diagnosis from '../components/diagnosis';


const DiagnosisContainer = ({...props}) =>
	<div>
		{props.displayDiagnosis && <Diagnosis
      diagnosis={props.diagnosis}
      incorrectClick={props.incorrectClick}
      correctClick={props.correctClick} />}
	</div>

export default DiagnosisContainer;