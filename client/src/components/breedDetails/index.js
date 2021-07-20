import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from './details.css'
import { getBreedDetail } from '../../actions/index'
// ejemplo para cambio


function Details(props) {

  useEffect(() => {
    const varId = props.match.params.id;
    props.getBreedDetail(varId)
  }, [])

  return (

    <div className={style.wc}>

      <div className={style.container}>
        <div className={style.card_container}>
          <div className={style.header}> 
         
            <img src={props.state.img} className={style.imagen} width="400" height="300"/>
          
            <h2>
              {props.state.name}
            </h2>
            <h4 className={style.text_white}>{props.state.temperament}</h4>
          </div>
          <div className={style.description}>
            <p className={style.wc}>
              <strong >Detalle de la Raza</strong>
            </p>

            <p className={style.text_white}>
              Altura: {props.state.height}
            </p>
            <p className={style.text_white}>
              Peso: {props.state.weight}
            </p>

            <p className={style.text_white}>
              Años de Vida: {props.state.life_span}
            </p>


          </div>
        </div>
      </div>
    </div>
  )
};

function mapStateToProps(state) {
  return {
    state: state.breedDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBreedDetail: id => dispatch(getBreedDetail(id)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Details); 