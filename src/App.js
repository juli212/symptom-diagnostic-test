import React from 'react';
import axios from 'axios';
import { BASE_URL } from './constants.js';


class App extends React.Component {
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
    diagnoses.map(function(d){
      if (d.count >= highestCount) highestCount = d.count; 
    })
    
    diagnoses = diagnoses.filter(d => d.count === highestCount)

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
    let symptoms = this.state.symptoms
    let selected = this.state.selectedSymptom
    let selectedId = selected ? selected.id : 0
    let diagnosis = this.state.diagnosis
    let correctResult = this.state.correctResult

    return (
      <div className="App">
        <header>
          <h1>Symptom Diagnostic Test App</h1>
        </header>
        <p className="App-intro">
          Select a symptom below for a quick diagnostic!
        </p>
        {<SymptomDropdown
          symptoms={symptoms}
          selectedSymptom={selected}
          handleSelect={this.selectSymptom}
          selected={selectedId} />}

        {selected && correctResult === null && <Diagnosis
          diagnosis={diagnosis}
          incorrectClick={this.incorrectClick}
          correctClick={this.correctClick} />}

        {correctResult !== null && <Results
          symptom={selected}
          selectDiagnosis={this.selectNewDiagnosis}
          correctResult={correctResult} />}

        {correctResult && <DiagnosticData symptom={selected} diagnosis={diagnosis} />}
        <StartOverButton resetApp={this.reset} />
      </div>
    );
  }
}

export default App;


const SymptomDropdown = ({...props}) =>
  <div>
    {props.selectedSymptom ? <p>symptom: {props.selectedSymptom.name}</p> : <select
      value={props.selected}
      onChange={(e) => props.handleSelect(e)}>
      <option disabled value={0}>Select Symptom</option>
      {props.symptoms.length > 0 && props.symptoms.map(sym => {
        return(
          <option key={sym.id} value={sym.id}>{sym.name}</option>
        )
      })}
    </select>}
  </div>


const Diagnosis = ({...props}) =>
  <div>
    <h2>Diagnosis:</h2>
    <p>{props.diagnosis.name}</p>
    <p>is this correct?</p>
    <button onClick={props.correctClick}>yes</button>
    <button onClick={props.incorrectClick}>no</button>
  </div>


const Results = ({...props}) =>
  <div>
    { props.correctResult ? <CorrectPrompt /> : <IncorrectPrompt symptom={props.symptom} selectDiagnosis={props.selectDiagnosis} /> }
  </div>


const StartOverButton = ({...props}) =>
  <button onClick={props.resetApp}>Start Over</button>


const CorrectPrompt = ({...props}) =>
  <div>
    <p>Thank you for using our diagnosis tool!</p>
  </div>


const IncorrectPrompt = ({...props}) =>
  <div>
    <p>please select the correct diagnosis below</p>
    {props.symptom.diagnoses.map(d => {
     return(<button onClick={(e) => {props.selectDiagnosis(e, d.id) }}>{d.name}</button>)
    })}
  </div>


const DiagnosticData = ({...props}) =>
  <div>
    <h2>Symptom: {props.symptom.name}</h2>
    <p>Diagnosed as: {props.diagnosis.name}</p>
    <h3>Diagnosis Frequencies</h3>
    {props.symptom.diagnoses.map(d => {
      return(<p>{d.name} | number of diagnoses: {d.count}</p>)
    })}
  </div>