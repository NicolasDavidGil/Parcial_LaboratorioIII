import {armas} from './Armas.js';
import {ConstruirHeroe} from './Personaje.js';
import {ActualizarTabla} from './tabla.js';
import {cuerpoTabla} from './ListadoHeroes.js'

localStorage.setItem('cuerpoTabla', JSON.stringify(cuerpoTabla));

const seccionTabla = document.getElementById("tabla");
let ArrayAnuncios = JSON.parse(localStorage.getItem("cuerpoTabla")) || [];
const formulario = document.getElementById('formulario');
const deleteButton = document.getElementById('btnBorrar');
const saveButton = document.getElementById('btnGuardar');
const editButton = document.getElementById('btnModificar');
const cancelButton = document.getElementById('btnCancelar');
const lblError = document.getElementById('lblError');
let indice = null;


lblError.style.display = 'none';
deleteButton.style.display = 'none';
editButton.style.display = 'none';
ActualizarTabla(seccionTabla, ArrayAnuncios);

window.addEventListener('DOMContentLoaded', () => 
{                
    saveButton.addEventListener('click', BotonGuardar);
    editButton.addEventListener('click', BotonModificar);
    deleteButton.addEventListener('click', BotonBorrar);
    cancelButton.addEventListener('click', BotonCancelar);
});

function BotonGuardar(event)
{
    event.preventDefault();        
    const nuevo = ConstruirHeroe();
    nuevo.id = ComprobarID(nuevo.id); 
    if(ValidarDatos(nuevo))
    {
        ArrayAnuncios.push(nuevo);
        ActualizarTabla(seccionTabla, ArrayAnuncios);
        formulario.reset();
        formulario.lblError.style.display = "none";
    }else
    {
        formulario.lblError.style.display = "inline-block";
    }           
}

function BotonModificar(event)
{
    event.preventDefault();
    if(indice != null)
    {
        ArrayAnuncios.forEach(x =>
        {
            if(x.id === indice)
            {
                const dato = ConstruirAnuncio();
                dato.id = ComprobarID(dato.id);
                if(ValidarAnuncio(dato))
                {
                    x.id = dato.id;
                    x.titulo = dato.titulo;
                    x.transaccion = dato.transaccion;
                    x.descripcion = dato.descripcion;
                    x.precio = dato.precio;
                    x.baños = dato.baños;
                    x.autos = dato.autos;
                    x.dormitorios = dato.dormitorios;
                    ActualizarTabla(seccionTabla, ArrayAnuncios);
                    formulario.reset();
                    formulario.btnModificar.style.display = 'none';
                    formulario.btnBorrar.style.display = 'none';
                    formulario.lblError.style.display = 'none';
                }else
                {
                    formulario.lblError.style.display = 'inline-block';
                } 
            }    
        })        
    }
}

function BotonBorrar(event)
{
    event.preventDefault();
    if(indice != null)
    {
        ArrayAnuncios.forEach(x =>
        {
            if(x.id == indice)
            {
                x.id = -1;
            }  
        })
    }
    ActualizarTabla(seccionTabla, ArrayAnuncios);
    formulario.reset();
    formulario.btnModificar.style.display = 'none';
    formulario.btnBorrar.style.display = 'none';
}

function BotonCancelar()
{
    formulario.reset();
}

function ComprobarID(id)
{    
    let idNuevo = id;
    ArrayAnuncios.forEach(x => 
    {
        if(x.id === id)
        {
            ArrayAnuncios.forEach(y => 
            {
                if(idNuevo <= y.id)
                {
                    idNuevo = y.id
                }
            });
            idNuevo++;
            return idNuevo;
        }         
    })
    return idNuevo;
}

window.addEventListener("click", (e) => 
{
    if(e.target.matches("td"))
    {    
        const iden = e.target.parentElement.dataset.id;
        indice = iden;

        const anuncio = ArrayAnuncios.find((x) => x.id == iden);
                        
        document.getElementById('txtNombre').value = anuncio.nombre;
        document.getElementById('txtAlias').value = anuncio.alias;
        if(anuncio.transaccion == "Marvel")
        {
            document.getElementById('rdbMarvel').checked = true;
            document.getElementById('rdbDC').checked = false;
        }else
        {
            document.getElementById('rdbMarvel').checked = false;
            document.getElementById('rdbDC').checked = true;
        }
        document.getElementById('txtFuerza').value = anuncio.fuerza;
        document.getElementById('txtArma').value = anuncio.arma;

        formulario.btnModificar.style.display = 'inline-block';
        formulario.btnBorrar.style.display = 'inline-block';
    }
});

function ValidarDatos(dato)
{    
    if(dato.id == "" ||
        dato.nombre == "" ||
        dato.alias == "" ||
        dato.editorial == "" ||
        dato.fuerza == "" ||
        dato.arma == "" ) return false;
    
    return true;
}

armas.forEach((x) => 
{
    const opcion = document.createElement('option');
    opcion.value = x;
    opcion.text= x;
    formulario.txtArma.appendChild(opcion);
});




