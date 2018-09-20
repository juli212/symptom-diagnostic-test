import React from 'react';
import Button from './button';

const Results = ({...props}) =>
  <div>
    { props.correctResult ?
    	<CorrectPrompt /> :
    	<IncorrectPrompt
    		diagnoses={props.symptom.diagnoses}
    		selectDiagnosis={props.selectDiagnosis} /> }
  </div>

export default Results;


const CorrectPrompt = ({...props}) =>
  <div>
    <p>Thank you for using our diagnosis tool!</p>
  </div>


const IncorrectPrompt = ({...props}) =>
  <div>
    <p>please select the correct diagnosis below</p>
    <DiagnosisButtonList
    	selectDiagnosis={props.selectDiagnosis}
    	diagnoses={props.diagnoses} />
  </div>


const DiagnosisButtonList = ({...props}) =>
	<div>
		{props.diagnoses.map(d => {
    	return(
				// click will select diagnosis and display frequency data
     		<Button
     			key={d.id}
     			handleClick={(e) => {props.selectDiagnosis(e, d.id) }}
     			label={d.name} />)
    })}
   </div>