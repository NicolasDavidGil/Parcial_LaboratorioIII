
export const crearTabla = (data) => 
{
    VisualizarSpinner();
    const tabla = document.createElement("table");

    if(!Array.isArray(data)) return null;
    
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data)); 
  
    return tabla;
}

const crearCabecera = (elemento) =>
{
    const thead = document.createElement("thead"),
    headrow = document.createElement("tr"),    
    thNombre = document.createElement("th"),
    thAlias = document.createElement("th"),
    thEditorial = document.createElement("th"),
    thFuerza = document.createElement("th"),
    thArma = document.createElement("th");
     
    thNombre.textContent = "Nombre";
    thAlias.textContent = "Alias";  
    thEditorial.textContent = "Editorial";
    thFuerza.textContent = "Fuerza";
    thArma.textContent = "Arma";    

    headrow.appendChild(thNombre);
    headrow.appendChild(thAlias);    
    headrow.appendChild(thEditorial);
    headrow.appendChild(thFuerza);
    headrow.appendChild(thArma);

    thead.appendChild(headrow);

    return thead;
}

const crearCuerpo = (data) =>
{
    const tBody = document.createElement("tbody");

    data.forEach(element => 
    {
        if(element.id != -1)
        {
            const tr= document.createElement("tr");
            for(const key in element) 
            {           
                if(key === "id")
                {                
                    tr.dataset.id = element[key];
                }else
                {
                    const td= document.createElement("td");
                    td.textContent = element[key];                
                    tr.appendChild(td);
                }                               
            }
            tBody.appendChild(tr);
        }
    });
    return tBody;
}

export const ActualizarTabla = (contenedor, data) => 
{    
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);        
    }    
    contenedor.appendChild(crearTabla(data));
}

function VisualizarSpinner()
{
    const spinner = document.getElementById("spinner");
    const tabla = document.getElementById("tabla");

    tabla.style.display = "none";
    spinner.style.display = "inline-block";

    setTimeout(function() {
        tabla.style.display = "inline-block";
        spinner.style.display = "none";
    },2000);

}