import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  state = {
    x: 2,
    y: 2,
    steps: 0,
    email: ''
  }

  moveSquare = e => {

    if (e.target.id === 'up') {
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        y: Math.max(1, state.y - 1)
      }))
    } else if (e.target.id === 'left') {
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        x: Math.max(1, state.x - 1)
      }))
    } else if (e.target.id === 'right') {
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        x: Math.min(3, state.x + 1)
      }))
    } else if (e.target.id === 'down') {
      this.setState((state) => ({
        ...state,
        steps: state.steps + 1,
        y: Math.min(3, state.y + 1)
      }))
    } else if (e.target.id === 'reset') {
      const input = document.querySelector('#email')
      const messageBox = document.querySelector('#message')
      input.value = ''
      messageBox.value = ''

      this.setState((state) => ({
        ...state,
        x: 2,
        y: 2,
        steps: 0,
        email: '',
      }))
    } else {
      console.log('What is going on..?')
    }
  }

  onChange = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    const messageBox = document.querySelector('#message')
    const input = document.querySelector('#email')
    input.value = ''

    this.setState({
      ...this.state,
      email: '',
    })
    // console.log(messageBox)
    axios.post('http://localhost:9000/api/result', this.state)
    .then(resp => {
      messageBox.innerHTML = resp.data.message
    })
    .catch(error => {
      console.log(error.message)
      messageBox.innerHTML = error.message
    })
  }

  componentDidUpdate() {
    const grid = document.querySelectorAll('div.square')
    // const messageBox = document.querySelector('#message')
    // console.log('update')

    Array.from(grid).map(el => {
      el.classList.remove('active'),
      el.innerHTML = ''
    })
    // axios.post('http://localhost:9000/api/result', this.state)
    // .then(resp => {
    //   messageBox.innerHTML = resp.data.message
    // })
    // .catch(error => {
    //   console.log(error.message)
    //   messageBox.innerHTML = error.message
    // })

    if (this.state.x === 1 && this.state.y === 1) {
      grid[0].classList.add('active')
      grid[0].innerHTML = 'B'
    } else if (this.state.x === 1 && this.state.y === 2) {
      grid[3].classList.add('active')
      grid[3].innerHTML = 'B'
    } else if (this.state.x === 1 && this.state.y === 3) {
      grid[6].classList.add('active')
      grid[6].innerHTML = 'B'
    } else if (this.state.x === 2 && this.state.y === 1) {
      grid[1].classList.add('active')
      grid[1].innerHTML = 'B'
    } else if (this.state.x === 2 && this.state.y === 2) {
      grid[4].classList.add('active')
      grid[4].innerHTML = 'B'
    } else if (this.state.x === 2 && this.state.y === 3) {
      grid[7].classList.add('active')
      grid[7].innerHTML = 'B'
    } else if (this.state.x === 3 && this.state.y === 1) {
      grid[2].classList.add('active')
      grid[2].innerHTML = 'B'
    } else if (this.state.x === 3 && this.state.y === 2) {
      grid[5].classList.add('active')
      grid[5].innerHTML = 'B'
    } else if (this.state.x === 3 && this.state.y === 3) {
      grid[8].classList.add('active')
      grid[8].innerHTML = 'B'
    } else {
      console.log('Not sure how this happened...')
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x},{this.state.y}) </h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps !== 1 ? 'times' : 'time'}</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.moveSquare} id="left">LEFT</button>
          <button onClick={this.moveSquare} id="up">UP</button>
          <button onClick={this.moveSquare} id="right">RIGHT</button>
          <button onClick={this.moveSquare} id="down">DOWN</button>
          <button onClick={this.moveSquare} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input onClick={this.onSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

// disabled={this.state.x <= 1}