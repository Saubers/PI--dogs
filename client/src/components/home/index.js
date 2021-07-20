import React, { useState, useEffect } from 'react';
import { getAllBreeds,  getBreed, getTemp, tempFilter, sort, ASC, DES } from '../../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './home.css';
import logo from '../../images/dog.png';
import puppy from '../../images/cachorro.png';

export function Home(props) {

    const [input, setInput] = useState({
      breed: "",
  
    })
    const [pagBreed, setBreedPag] = useState(1);
  
    const firstGroup = 8;
    const finalCount = pagBreed * firstGroup;
    const initialCount = finalCount - firstGroup;
    const vista = props.state.slice(initialCount, finalCount);
                                            
  
    useEffect(() => {
      tempFilter();
      breedFilter();
  
      const btnToggle = document.querySelector('.home_toggleBtn__1yeHu')
  btnToggle && btnToggle.addEventListener('click' ,function(){
    console.log(document.getElementById('home_navig__EW3f9'))
    document.getElementById('home_navig__EW3f9').classList.toggle('home_active__20C7U')
    document.querySelector('body').classList.toggle('home_container__7Xk0y')
  });

   })
  
    function tempFilter() {
     return props.getTemp();
    }
  
    function breedFilter() {
     return props.getAllBreeds();
    }
    function handleInput(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value
      })
  
    }
  
    function handleDispatch(e) {
      e.preventDefault();
  
      if (input.breed) {
        props.getBreed(input.raza)
      }
      else {
        alert("Debe ingresar el nombre de la Raza!")
      }
  
  
    }
    function handleDispatchTemp(e) {
      props.tempFilter(props.state, e.target.value);
  
    }
  
    function handleDispatchBreed(e) {
      props.getBreed(e.target.value)
    }
  
    function handleDispatchOrder(event) {
      if (event.target.value === ASC || event.target.value === DES) {
        props.sort(event.target.value, props.state)
      }
    }
  
  
    return (
      <div className={style.home}>
  
        {/* barra de navegación */}
  
        <div id={style.navig} className={style.active}>
          {/*----Input de búsqueda para encontrar razas de perros por nombre-----*/}
        
        <div className={style.toggleBtn}>
          <span>&#9776;</span>
        </div>
  
        <ul>
  
          <li>
            <img src={logo} alt="Page logo" className={style.image} width="200px" height="200px"/>
          </li>
  
          <li>
        
        <form className={style.formul}onSubmit={handleDispatch}>
          <div>
            <input
              type="text"
              autoComplete="off"
              placeholder="Races"
              name="raza"
              value={input.raza}
              onChange={handleInput}
            />
          </div>
          <button className={style.btn}type="submit" >Search</button>
        </form>
  </li>
        {/*-----------------Boton para buscar por ASC y DES--------------------*/}
   
  
  <li>
    <select onChange={handleDispatchOrder} className={style.fOrder}>
      <option>Ordering</option>
      <option value={ASC}>Upward</option>
      <option value={DES}>Falling</option>
    </select>
  </li>
  
  {/*-----------Boton de filtrar por Temperamento---------------------*/}
  
  <li>
    <select name="tempName" value={input.tempName} onChange={handleDispatchTemp} className={style.fTemp}>
      <option value="">Filter by Temperaments</option>
      {props.stateT && props.stateT.map(elem => (
        <option value={elem.tempName}>{elem.tempName}</option>
      ))}
    </select>
  </li>
  
  {/*-----------------Boton de filtrar por Raza--------------------*/}
  
  <li>
    <select name="breedSelect" value={input.breedSelect} onChange={handleDispatchBreed} className={style.fBreed}>
      <option value="">Filter by Breeds</option>
      {props.state && props.state.map(elem => (
        <option key={elem.id}>{elem.name}</option>
      ))}
    </select>
  </li>
  
  <li>
  <Link to="breedCreate" className={style.create}>
    <img src={puppy} alt="Puppy" width="50px" height="50px"/>
    <br/>
    <p>Create Breeds</p>
    </Link>
  </li>
  
  
  
        </ul>
  
        </div>
        
  {/*-----------------Boton de filtrar por Raza creada existente--------------------*/}
  
   
       
  
  
  
  
        {/*-------------------razas----------------------*/}
  <div className={style.movil}>
        <div className={style.container}>
          {vista && vista.map((elem) => (
  
            <div className={style.card} key={elem.id}>
  
              <Link to={`/detalles/${elem.id}`}>
                <img src={elem.img} alt="Element" className={style.image} />
              </Link>
              <h2>{elem.name}</h2>
              <p>{elem.temperament}</p>
            </div>
  
          ))}
       
        </div>
  
        <div className={style.btnPaginado}>
          <button onClick={() => setBreedPag(pagBreed - 1)}>Backward</button>
          <button>{pagBreed}</button>
          <button onClick={() => setBreedPag(pagBreed + 1)}>Forward</button>
        </div>
  </div>
      </div>
    )
  };
  
  function mapStateToProps(state) {
    return {
      state: state.breeds,
      tempState: state.temp
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getBreed: elem => dispatch(getBreed(elem)),
      getAllBreeds: elem => dispatch(getAllBreeds(elem)),
      getTemp: elem => dispatch(getTemp(elem)),
      sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
      tempFilter: (elem1, elem2) => dispatch(tempFilter(elem1, elem2))
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);