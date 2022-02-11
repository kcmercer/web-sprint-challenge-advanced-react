import React, { useState, useEffect } from 'react'
import axios from 'axios';

const initialState = {
    x: 2,
    y: 2,
    steps: 0,
    email: ''
}

export default function AppFunctional(props) {
  const [ value, setValue ] = useState(initialState)

  const moveSquare = e => {

    if (e.target.id === 'up') {
      setValue({
        ...value,
        steps: value.steps + 1,
        y: Math.max(1, value.y - 1)
      })
    } else if (e.target.id === 'left') {
      setValue({
        ...value,
        steps: value.steps + 1,
        x: Math.max(1, value.x - 1)
      })
    } else if (e.target.id === 'right') {
      setValue({
        ...value,
        steps: value.steps + 1,
        x: Math.min(3, value.x + 1)
      })
    } else if (e.target.id === 'down') {
      setValue({
        ...value,
        steps: value.steps + 1,
        y: Math.min(3, value.y + 1)
      })
    } else if (e.target.id === 'reset') {
      setValue({
        ...value,
        x: 2,
        y: 2,
        steps: 0,
      })
    } else {
      console.log('What is going on..?')
    }
  }

  const onChange = e => {
    setValue({
      email: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    const messageBox = document.querySelector('#message')
    // console.log(messageBox)

    axios.post('http://localhost:9000/api/result', value)
    .then(resp => {
      messageBox.innerHTML = resp.data.message
    })
    .catch(error => {
      console.log(error.message)
      messageBox.innerHTML = error.message
    })
  }

  useEffect(() => {
    const grid = document.querySelectorAll('div.square')
    const messageBox = document.querySelector('#message')

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

    if (value.x === 1 && value.y === 1) {
      grid[0].classList.add('active')
      grid[0].innerHTML = 'B'
    } else if (value.x === 1 && value.y === 2) {
      grid[3].classList.add('active')
      grid[3].innerHTML = 'B'
    } else if (value.x === 1 && value.y === 3) {
      grid[6].classList.add('active')
      grid[6].innerHTML = 'B'
    } else if (value.x === 2 && value.y === 1) {
      grid[1].classList.add('active')
      grid[1].innerHTML = 'B'
    } else if (value.x === 2 && value.y === 2) {
      grid[4].classList.add('active')
      grid[4].innerHTML = 'B'
    } else if (value.x === 2 && value.y === 3) {
      grid[7].classList.add('active')
      grid[7].innerHTML = 'B'
    } else if (value.x === 3 && value.y === 1) {
      grid[2].classList.add('active')
      grid[2].innerHTML = 'B'
    } else if (value.x === 3 && value.y === 2) {
      grid[5].classList.add('active')
      grid[5].innerHTML = 'B'
    } else if (value.x === 3 && value.y === 3) {
      grid[8].classList.add('active')
      grid[8].innerHTML = 'B'
    } else {
      console.log('Not sure how this happened...')
    }
  })


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({value.x}, {value.y})</h3>
        <h3 id="steps">You moved {value.steps} times</h3>
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
        <button onClick={moveSquare} id="left">LEFT</button>
        <button onClick={moveSquare} id="up">UP</button>
        <button onClick={moveSquare} id="right">RIGHT</button>
        <button onClick={moveSquare} id="down">DOWN</button>
        <button onClick={moveSquare} id="reset">reset</button>
      </div>
      <form>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input onClick={onSubmit} id="submit" type="submit"></input>
      </form>
    </div>
  )
}
