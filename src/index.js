import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Button';


class Buttons extends React.Component {
  state = {
    numbers: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    displayNum: 0,
    numberArr: [],
    firstNumber: 0,
    secondNumber: 0,
    swtichNum: true,
    operator: 0
  }
  NumberClickHandler = (number) => {
    if (this.state.swtichNum) {
      const numberArr = [...this.state.numberArr];
      numberArr.push(number);
      const newNumber = numberArr.join('');
      this.setState({
        displayNum: newNumber,
        numberArr: numberArr,
        firstNumber: newNumber
      })
    }else{
      const numberArr = [...this.state.numberArr];
      numberArr.push(number);
      const newNumber = numberArr.join('');
      this.setState({
        displayNum: newNumber,
        numberArr: numberArr,
        secondNumber: newNumber
    })
  }
}
  operatorHandler = (event) => {
    let operator = event.target.textContent;
    if (operator !== 'Clear' && operator !== '=') {
      //const result = eval(`${this.state.displayNum}` + operator + `${this.state.displayNum}`);
      //console.log(result);
      this.setState({
        numberArr: [],
        displayNum: operator,
        operator: operator,
        swtichNum: false
      })
    }else if( operator === '=' ){
      const result = eval(parseFloat(this.state.firstNumber) + this.state.operator + parseFloat(this.state.secondNumber));
      this.setState({
        displayNum: result,
        numberArr: [],
        firstNumber: result,
        secondNumber: 0,
        swtichNum: true,
        operator: 0
      })
    }else if( operator === 'Clear'){
      this.setState({
        displayNum: 0,
        numberArr: [],
        firstNumber: 0,
        secondNumber: 0,
        swtichNum: true,
        operator: 0
      })
    }
  }
  render(){
    const numbers = (
      <div className="numbers-container">
        {this.state.numbers.map(num => <Button key={num} number={num} click={this.NumberClickHandler.bind(this, num)} />)}
        <button key="." onClick={this.NumberClickHandler.bind(this, '.')}>.</button>
      </div>
    );
    const operators = (
      <div className="operators-container">
        <button onClick={this.operatorHandler}>Clear</button>
        <button onClick={this.operatorHandler}>+</button>
        <button onClick={this.operatorHandler}>-</button>
        <button onClick={this.operatorHandler}>*</button>
        <button onClick={this.operatorHandler}>/</button>
        <button onClick={this.operatorHandler}>=</button>
      </div>
    )
    return (
      <div className="main-container">
        <div className="display">
          <span>{this.state.displayNum}</span>
        </div>
        <div className="secondary-container">
          {numbers}
          {operators}
        </div>
      </div>

    )
  }
}


class Main extends React.Component {
  render() {
    return (
      <div className="flex-container">
        <Buttons />
      </div>

    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

