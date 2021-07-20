import React from 'react';
import styled from '@emotion/styled';
//import { TransitionGroup , CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
const Mensaje = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const ResultadoCotizacion = styled.div`
    text-align: center;
    padding: .5rem;
    border: 1px solid #26C6DA;
    background-color:  rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const TextoCotizacion = styled.p`
    color:  #0083FF;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin:0;
`;
const Resultado = ({cotizacion}) => {

   return(
    (cotizacion === 0) ? <Mensaje>Elige Marca, año y tipo de seguro Para observar tu cotizacion</Mensaje> 
    :   (
            <ResultadoCotizacion>
                <TextoCotizacion>Su total es de: $<span> {cotizacion}</span></TextoCotizacion>
            </ResultadoCotizacion>
        ) 
   );
}
Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired

}
 
export default Resultado;