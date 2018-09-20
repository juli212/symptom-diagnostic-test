import React from 'react';


const SymptomDisplay = ({...props}) =>
  <div>
    {props.selectedSymptom ?
      <CurrentSymptom symptom={props.selectedSymptom} /> :
      <SymptomDropdown
        symptoms={props.symptoms}
        handleSelect={props.handleSelect}
        selected={props.selected} /> }
  </div>

export default SymptomDisplay;


// only displayed if a symptom is selected
const CurrentSymptom = ({...props}) =>
  <p>symptom: {props.symptom.name}</p>


// only displayed if a symptom is not selected
const SymptomDropdown = ({...props}) =>
  <div>
    <select
      value={props.selectedSymptom ? props.selectedSymptom.id : 0}
      onChange={(e) => props.handleSelect(e)}>
      <option disabled value={0}>Select Symptom</option>
      {props.symptoms.length > 0 && props.symptoms.map(sym => {
        return(
          <option key={sym.id} value={sym.id}>{sym.name}</option>
        )
      })}
    </select>
  </div>