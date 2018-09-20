import React from 'react';
import Data from '../components/data';


const DataContainer = ({...props}) =>
	<div>
		{props.displayData && <Data
			symptom={props.symptom}
			diagnosis={props.diagnosis} />}
	</div>

export default DataContainer;