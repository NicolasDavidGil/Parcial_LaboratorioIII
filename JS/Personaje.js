function Personaje(id, nombre)
{
    this.id = id;
    this.nombre = nombre;
}

function SuperHeroe(id, nombre, alias, editorial, fuerza, arma)
{
    Personaje.call(this, id, nombre);
    this.alias = alias;
    this.editorial = editorial;
    this.fuerza = fuerza;
    this.arma = arma;
}

export function ConstruirHeroe()
{
    let id = 1;    
    let nombre = document.getElementById('txtNombre').value;        
    let alias = document.getElementById('txtAlias').value;        
    let editorial = document.getElementsByName('editorial');
    let edi = false;
    editorial.forEach(x => 
    {
        if(x.checked)
        {
            edi = x.value;
        }
    });
    let fuerza = document.getElementById('txtFuerza').value;
    let arma = document.getElementById('txtArma').value;
    
    const nuevo = new SuperHeroe(id, nombre, alias, edi, fuerza, arma);

    return nuevo;
}

