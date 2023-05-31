const heroes = JSON.parse(localStorage.getItem('cuerpoTabla')) || [];

window.addEventListener('DOMContentLoaded', () => {
    Generar();
});

function Generar() {
    const formulario= document.getElementById('tarjeta');

    heroes.forEach((x) => {
        const ficha= document.createElement('fieldset');

        const labelNombre= document.createElement('label');
        const labelAlias= document.createElement('label');
        const labelEditorial= document.createElement('label');
        const labelFuerza= document.createElement('label');
        const labelArma= document.createElement('label');


        labelNombre.textContent = "Nombre: " + x.name;
        labelAlias.textContent = "Alias: " + x.alias;
        labelEditorial.textContent ="Editorial: " + x.editorial;
        labelFuerza.textContent= "Fuerza:  " + x.fuerza;
        labelArma.textContent = "Arma: " + x.arma;



        ficha.appendChild(labelNombre);
        ficha.appendChild(labelAlias);
        ficha.appendChild(labelFuerza);
        ficha.appendChild(labelArma);
        ficha.appendChild(labelEditorial);

        ficha.classList.add("ficha");
        formulario.appendChild(ficha);

    })
}