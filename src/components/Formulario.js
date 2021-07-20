import React,{ useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from '../Helper';


//styled components
const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex:0 0 100px;

`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance:none; // podemos quitar la apariencia nativa de las etiqueta
`;

const InputRadio = styled.input`
    margin:0 1rem;
`;

const Boton = styled.button`
    background-color: #00838f;
    font-size:16px;
    width: 100%;
    padding: 1rem;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    margin-top: 2rem;
    transition: background-color .3s ease;

    &:hover{
        background-color:#26C6DA;
        cursor:pointer;
    }

`;
const Error = styled.div`
    background-color: red;
    color:white;
    padding:1rem;
    width: 94%;
    text-align:center;
    margin-bottom: 2rem;
`;



const Formulario = ({guardarResumen , guardarCargando}) => {

    //useState
    const[ datos, guardarDatos ]=useState({
        marca:'',
        year:'',
        plan:''
    });

    const [error, guardarError ] = useState(false);//mostrar mensaje de error

    //extraemos los valores del state 
    const {marca, year, plan } = datos;

    //leer los datos del formulario y colocar los datos del state del
    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,[e.target.name] : e.target.value
        });
    }

    //evento submit
    const cotizarSeguro = e =>{
        e.preventDefault();

        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        };
        guardarError(false);

        //una base de 2000
        let resultado = 2000;

        //obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
      
        //por cada año hay que restar el 3%
        resultado -= ((diferencia * 3)* resultado)/100;

        // Americano 15%, Asiatico 5%, Europeo 30%
        resultado = calcularMarca(marca) * resultado; 


        //basico aumenta 20% , completo aumenta 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

        guardarCargando(true);
        setTimeout(() =>{
            //eliminar el spinner
            guardarCargando(false);

            //pasa la inforacion al componente principal
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        },3000)
    };

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >
            {error ? <Error>Todos los Campos son Obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}

                />Basico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}
Formulario.protoType = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}
 
export default Formulario;