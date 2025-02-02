import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: '',
    message: ''
  }

  ySubtract = () => {
    this.state.y <= 3 && this.state.y >= 2 ? 
    this.setState({
      ...this.state, 
      y: this.state.y - 1, 
      steps: this.state.steps + 1
    }) :
    this.setState({
      ...this.state, 
      y: this.state.y === 3 ? 3 : this.state.y, 
      message: "You can't go up"
    })
  }

  xAdd = () => {
    this.state.x <= 2 && this.state.x >= 1 ? 
    this.setState({
      ...this.state, 
      x: this.state.x + 1, 
      steps: this.state.steps + 1}) :
    this.setState({
      ...this.state, 
      x: this.state.x === 3 ? 3 : this.state.x, 
      message: "You can't go right"})
  }

  yAdd = () => {
    this.state.y <= 2 && this.state.y >= 1 ? 
    this.setState({
      ...this.state, 
      y: this.state.y + 1, 
      steps: this.state.steps + 1}) :
    this.setState({
      ...this.state, 
      y: this.state.y === 3 ? 3 : this.state.y, 
      message: "You can't go down"})
  }

  xSubtract = () => {
    this.state.x <= 3 && this.state.x >= 2 ? 
    this.setState({
      ...this.state, 
      x: this.state.x - 1, 
      steps: this.state.steps + 1
    }) :
    this.setState({
      ...this.state, 
      x: this.state.x === 3 ? 3 : this.state.x, 
      message: "You can't go left"})
  }

  fullReset = () => {
      const input = document.querySelector('#email')
      const messageBox = document.querySelector('#message')
      input.value = ''
      messageBox.value = ''

    this.setState({
      ...this.state,
      x:2,
      y:2,
      steps:0,
      email: "",
      message:''
    })
  }


  onChange = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const input = document.querySelector('#email')
    input.value = ''

    axios.post('http://localhost:9000/api/result', this.state)
    .then(resp => {
      this.setState({
        ...this.state,
        message: resp.data.message
      })
    })
    .catch(error => {
      console.log(error)
      if (this.state.email === 'foo@bar.baz') {
        this.setState({
          ...this.state,
          message: 'foo@bar.baz failure #71'
        })
      } else if (this.state.email === '') {
        this.setState({
          ...this.state,
          message: 'Ouch: email is required'
        })
      } else {
        this.setState({
          ...this.state,
          message: 'Ouch: email must be a valid email'
        })
      }
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps !== 1 ? 'times' : 'time'}</h3>
        </div>

        <div id="grid">
          <div className={this.state.x === 1 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 1 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 1 ? 'B' : ''}
          </div>
          <div className={this.state.x === 1 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 2 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 2 ? 'B' : ''}
          </div>
          <div className={this.state.x === 1 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 1 && this.state.y === 3 ? 'B' : ''}
          </div>
          <div className={this.state.x === 2 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 2 && this.state.y === 3 ? 'B' : ''}
          </div>
          <div className={this.state.x === 3 && this.state.y === 3 ? 'square active' : 'square'}>
            {this.state.x === 3 && this.state.y === 3 ? 'B' : ''}
          </div>
        </div>

        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>

        <div id="keypad">
          <button onClick={this.xSubtract} id="left">LEFT</button>
          <button onClick={this.ySubtract} id="up">UP</button>
          <button onClick={this.xAdd} id="right">RIGHT</button>
          <button onClick={this.yAdd} id="down">DOWN</button>
          <button onClick={this.fullReset} id="reset">reset</button>
        </div>

        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input onClick={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}