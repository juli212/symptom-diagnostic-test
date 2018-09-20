import React from 'react';
import Results from '../components/results';


const ResultsContainer = ({...props}) =>
	<div>
		{props.displayResults && <Results
      symptom={props.symptom}
      selectDiagnosis={props.selectDiagnosis}
      correctResult={props.correctResult} />
		}
	</div>

export default ResultsContainer;