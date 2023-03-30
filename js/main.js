 let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto= document.getElementById("alertValidacionesTexto");
let alertValidaciones= document.getElementById("alertValidaciones");

let tabla = document.getElementById("tablaListaCompras"); // este es el elemento de la tabala 
let cuerpoTabla = tabla.getElementsByTagName("tbody"); // este va por la tabla para poder mandarla hacer dentro de tboby

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos= 0;
let costoTotal = 0;
//Limpiar Campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    cuerpoTabla[0].innerHTML="";

    contador = 0;
    totalEnProductos= 0;
    costoTotal =0;
    contadorProductos.innerText = "0";
    productosTotal.innerHTML = "0";
    precioTotal.innerText = "0";

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));

}); // click btnClear

function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    } //if 

    if (isNaN(txtNumber.value)){
        return false;
    } //if

    if (parseFloat(txtNumber.value)<=0){
        return false;
    }
    return true;
} // validarCantidad // esta función hace que regrese 

function getPrecio(){
       return Math.floor(Math.random()*50 *100) / 100;
} //getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML=""; //limpiar
    alertValidaciones.style.display="none"; //Oculto uno
    let lista="Los siguientes campos deben ser llenados correctamente:<ul>";
    if (txtNombre.value.length<2){
        txtNombre.style.border="solid thin red"; 
        lista +="<li>Se debe escribir un nombre válido</li>";
        alertValidaciones.style.display="block";
        isValid = false;
    } else{
          txtNombre.style.border="";
    }//if txtNombre

       if (! validarCantidad()){
              txtNumber.style.border="solid thin red";
              lista +="<li>Se debe escribir una cantidad válida</li>";
              alertValidaciones.style.display="block"; 
              isValid = false;    
    } else{
        txtNumber.style.border="";  
    }//if txtNumber
      lista += "</ul>";
      alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
      // esta función hace que el recuadro en rojo desaparesca en cierto tiempo que le des
      idTimeout=setTimeout (function(){
        alertValidaciones.style.display="none";
    },5000);
    if (isValid){
     precio = getPrecio();
     contador++;
     let row = `<tr>
                 <th>${contador}</th>
                 <td>${txtNombre.value}</td>
                 <td>${txtNumber.value}</td>
                 <td>$${precio}</td>
              </tr>`;

     cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
     contadorProductos.innerText= contador;
     totalEnProductos += parseFloat (txtNumber.value);
     productosTotal.innerText = totalEnProductos;
     costoTotal += precio *  parseFloat(txtNumber.value);
     precioTotal.innerText= `$ ${costoTotal.toFixed(2)}`;
     localStorage.setItem("contadorProductos", contador);
     localStorage.setItem("totalEnProductos", totalEnProductos);
     localStorage.setItem("costoTotal", costoTotal.toFixed(2));
     txtNombre.value="";
     txtNumber.value="";
     txtNombre.focus();
    } // if isValid espara poder validar en nombre y cantidad
});// btnAgregar click

txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
    
});// txtNumber.blur

txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
}); // txtNombre.blur

window.addEventListener("load", function(event){
    if(localStorage.getItem("contadorProductos")==null){
        localStorage.setItem("contadorProductos", "0");
    }; //if
    if(localStorage.getItem("totalEnProductos")==null){
       localStorage.setItem("totalEnProductos", "0");
    }; //if
    if(localStorage.getItem("costoTotal")==null){
        localStorage.setItem("costoTotal", "0.0");
    }; //if
    contador=parseInt(localStorage.getItem("contadorProductos"));
    totalEnProductos= parseInt(localStorage.getItem("totalEnProductos"));
    costoTotal= parseFloat(localStorage.getItem("costoTotal"));

    contadorProductos.innerText =contador;
    productosTotal.innerHTML = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;
    
});