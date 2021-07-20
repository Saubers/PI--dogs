import React, { useEffect, useState } from 'react';
import style from './forms.css';
import fetch from 'node-fetch';
import { connect } from 'react-redux';
import { getTemp } from '../../actions/index'


function Form(props) {

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    gender: "",
    tempName: ""
  })


  async function handleSubmit(event) {
    event.preventDefault();
    window.location.href = "http://localhost:3000/home"
    await fetch('http://localhost:3001/dogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

  }


  function handleChange(e) {

    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  useEffect(() => {

    handleDispatch();
  }, [])

  function handleDispatch() {
    props.getTemp()
  }



  return (
    <section className={style.container}>

      <form onSubmit={handleSubmit} className={style.formul}>

        <div>
          <input
            placeholder="Name"
            type="text"
            name="name"
            required="required"
            value={input.name}
            onChange={handleChange}
          />
        </div>

        <div >
          <input
          placeholder="Height"
            type="text"
            name="height"
            required="required"
            value={input.height}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
          placeholder="Weight"
            type="text"
            name="weight"
            required="required"
            value={input.weight}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
          placeholder="Years of Life"
            type="text"
            name="years"
            required="required"
            value={input.years}
            onChange={handleChange}
          />
        </div >



        <div>
          <select name="sexo" value={input.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="Hembra">Hembra</option>
            <option value="Macho">Macho</option>
          </select>
        </div>


        <select name="nameT" value={input.tempName} onChange={handleChange} required>
          <option value="">Temperaments</option>
          {props.tempState && props.tempState.map(elem => (
            <option value={elem.id}>{elem.tempName}</option>
          ))}
        </select>


        <input type="submit" value="Create Race" />

      </form>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    tempState: state.temperament
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getTemp: elem => dispatch(getTemp(elem))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);