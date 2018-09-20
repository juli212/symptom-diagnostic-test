import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Button from '../components/button';
import SymptomsContainer from './symptomsContainer';
import DiagnosisContainer from './diagnosisContainer';
import ResultsContainer from './resultsContainer';
import DataContainer from './dataContainer';
	

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      symptoms: [],
      selectedSymptom: null,
      diagnosis: null,
      correctResult: null
    }

    this.fetchSymptoms = this.fetchSymptoms.bind(this);
    this.getSymptom = this.getSymptom.bind(this);
    this.getDiagnosis = this.getDiagnosis.bind(this);
    this.randomSelectDiagnosis = this.randomSelectDiagnosis.bind(this);
    this.selectSymptom = this.selectSymptom.bind(this);
    this.reset = this.reset.bind(this);
    this.incorrectClick = this.incorrectClick.bind(this);
    this.correctClick = this.correctClick.bind(this);
    this.updateDiagnostic = this.updateDiagnostic.bind(this);
    this.selectNewDiagnosis = this.selectNewDiagnosis.bind(this);
  }

  componentDidMount() {
    this.fetchSymptoms()
  }

  fetchSymptoms() {
    axios.get(`${BASE_URL}/symptoms`)
      .then(res => {
        const syms = res.data
        this.setState({ symptoms: syms})
      })
      .catch(err => {
        console.log(err)
      })
  }

  selectSymptom(e) {
    if (e) e.preventDefault();

    let id = parseInt(e.target.value, 10)
    let selected = this.getSymptom(id)
    
    this.setState({selectedSymptom: selected})
    this.randomSelectDiagnosis(selected.id)
  }

  getSymptom(id) {
    return this.state.symptoms.find(sym => sym.id === id)
  }

  getDiagnosis(id) {
    return this.state.selectedSymptom.diagnoses.find(d => d.id === id)
  }

  randomSelectDiagnosis(symptomId) {
  	let diagnoses = this.getSymptom(symptomId).diagnoses

    var highestCount = 0
  	
  	// find frequency of the most selected diagnosis
    diagnoses.map(function(d){
      if (d.count > highestCount) highestCount = d.count; 
    })

    // collect all diagnoses with highest frequency
    diagnoses = diagnoses.filter(d => d.count === highestCount)

    // choose random diagnosis from collection of highest frequency
    let randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
    this.setState({diagnosis: randomDiagnosis})
  }

  incorrectClick() {
    this.setState({ correctResult: false })
  }

  correctClick() {
    this.setState({ correctResult: true })
    this.updateDiagnostic(this.state.diagnosis.id)
  }

  selectNewDiagnosis(e, id) {
  	let diagnosis = this.getDiagnosis(id)

    this.setState({
      diagnosis: diagnosis,
      correctResult: true})
    this.updateDiagnostic(id)
  }

  updateDiagnostic(id) {
  	let diagnosis = this.getDiagnosis(id)
    diagnosis.count += 1

  {/* increases the number of times a diagnosis object
  	is selected as thecorrect diagnosis */}
    axios.put(`${BASE_URL}/diagnoses/${id}/`, diagnosis)
      .then(res => {
        let d = res.data
        console.log(d)
      })
      .catch(err => {
        console.log(err)
      })
  }

  reset() {
    this.setState({
      selectedSymptom: null,
      diagnosis: null,
      correctResult: null
    })
    this.fetchSymptoms()
  }

  render() {
  	let { symptoms, correctResult, diagnosis, selectedSymptom } = this.state;

    return (
      <div className='main'>

    		{/* symptom dropdown or selected symptom */}
        <SymptomsContainer
        	symptoms={symptoms}
        	selectedSymptom={selectedSymptom}
        	handleSelect={this.selectSymptom} />

        {/* initial random diagnosis with option to confirm or deny */}
        <DiagnosisContainer
        	diagnosis={diagnosis}
        	incorrectClick={this.incorrectClick}
        	displayDiagnosis={selectedSymptom && correctResult === null}
        	correctClick={this.correctClick} />

        {/* buttons for user to select correct diagnosis and/or correct result */}
        <ResultsContainer
        	symptom={selectedSymptom}
        	displayResults={correctResult !== null}
        	selectDiagnosis={this.selectNewDiagnosis}
        	correctResult={correctResult} />

        {/* frequencies of all diagnoses for selected symptom */}
        <DataContainer
        	displayData={correctResult}
        	symptom={selectedSymptom}
        	diagnosis={diagnosis} />

        <Button handleClick={this.reset} label="Start Over" />
      </div>
    );
  }
}

export default Main;
