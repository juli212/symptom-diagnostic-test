import React from 'react';
import SymptomDisplay from '../components/symptoms';


const SymptomsContainer = ({...props}) =>
	<div>
		<p>Select a symptom below for a quick diagnostic!</p>
		<SymptomDisplay
			symptoms={props.symptoms}
			selectedSymptom={props.selectedSymptom}
      handleSelect={props.handleSelect} />
	</div>

export default SymptomsContainer;