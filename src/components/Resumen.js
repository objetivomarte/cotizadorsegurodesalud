import React from 'react';
import styled from '@emotion/styled';
import {pirmerMayuscula} from '../Helper';
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding:1rem;
    text-align:center;
    background-color: #0083FF;
    color: #FFFFFF;
    margin-top: 1rem;

`;


const Resumen = ({datos}) => {
    //extraemos los datos
    const {marca, year, plan } = datos;

    if (marca === "" || year === "" || plan === "") return null;
    return ( 
        <ContenedorResumen>
            <h2>Resumen de cotizacion</h2>
            <ul>
                <li>Marca: {pirmerMayuscula(marca)} </li>
                <li>Plan: {pirmerMayuscula(plan)} </li>
                <li>Año del Auto: {year}</li>
            </ul>
        </ContenedorResumen>
     );
}
Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}
export default Resumen;