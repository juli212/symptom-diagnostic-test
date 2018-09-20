import React from 'react';
import Button from './button';


const Diagnosis = ({...props}) =>
  <div>
    <h3>Diagnosis</h3>
    <p>{props.diagnosis.name}</p>
    <p>is this correct?</p>
  	
  	{/* click will confirm diagnosis and display frequency data */}
    <Button handleClick={props.correctClick} label='Yes' />

   	{/* click rejects diagnosis and displays other diagnosis options */}
    <Button handleClick={props.incorrectClick} label='No' />
  </div>


export default Diagnosis;