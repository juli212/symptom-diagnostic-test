import React from 'react';


const Data = ({...props}) =>
  <div>
    <h2>Symptom: {props.symptom.name}</h2>
    <p>Diagnosed as: {props.diagnosis.name}</p>
  	<DiagnosesData diagnoses={props.symptom.diagnoses} />
  </div>

export default Data;

// returns diagnosis frequencies after a correct diagnosis is confirmed
const DiagnosesData = ({...props}) =>
	<div>
    <h3>Diagnosis Frequencies</h3>
    {props.diagnoses.map(d => {
      return(
      	<p key={d.id}>{d.name} | number of diagnoses: {d.count}</p>
      )
    })}
	</div>