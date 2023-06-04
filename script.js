
let name = document.querySelector(".name"); //input type text nombre de la persona
let surname = document.querySelector(".surname"); //input type text apellido
let email = document.querySelector(".email"); //input type email
let cantidad = document.querySelector(".cantidad"); //input cantidad type number
let select = document.querySelector("#select");
let divTotal = document.querySelector(".total"); //parrafo total a pagar
let resume = document.querySelector(".resume"); //input SUBMIT resumen


let total = (valor, categoria, div) => {

  //valor = cant(valor); 
if (valor >=1 && valor <=100) {
  if (categoria === "1") {
    div.textContent = `Total a pagar: $ ${200 * valor * 0.2}`;
  }

  if (categoria === "2") {
    div.textContent = `Total a pagar: $ ${200 * valor * 0.5}`;
  }

  if (categoria === "3") {
    div.textContent = `Total a pagar: $ ${200 * valor * 0.85}`;
  }
}
else {
     informarError()
  }
};

function informarError(){
  Swal.fire({
    icon: "error",
    title: "Cantidad incorrecta",
    text: "Debe ingresar una cantidad de 1 a 100"
   });
   document.querySelector(".cantidad").value="";
   //valor="";
}


let emptyInput = (input) => {
  if (input.value === "") {
    input.style.borderColor = "red";
    return true;
  } else {
    input.style.borderColor = "green";
  }
};

let emptySelect = (select) => {
  if (select.value === "") {
    select.style.borderColor = "red";
    return true;
  } else {
    select.style.borderColor = "green";
  }
};


select.addEventListener("change", (e) => {
  if (e.target.value === "Seleccione categoria") {
    divTotal.textContent = "Total a pagar: $";
  }
  total(cantidad.value, e.target.value, divTotal);
});

cantidad.addEventListener("input", (e) => {
  //      input            selecr       parrafo
  total(cantidad.value, select.value, divTotal);
});


function filterInteger(evt,input) {
    // ASCII https://elcodigoascii.com.ar/
    //48: numero cero
    //57: numero 9 
    //45: signo menos -
    //8: Barra espaciadora
    //13:  Enter 
    //0: NULL
    var key = window.Event ? evt.which : evt.keyCode;    
    var chark = String.fromCharCode(key);
    var tempValue = input.value+chark;
    if(key >= 48 && key <= 57) {
        return filter(tempValue);
    } else {
        //8 : barra espaciadora
        //13: retorno de carro (enter)
        //0: null
        return key == 8 || key == 13 || key == 0;
    }
}

function filter(__val__) {
    // /^-?[0-9]*$/; // positivos y negativos
    // /^[0-9]*$/; // solo positivos
    var preg = /^[0-9]*$/;
    return preg.test(__val__);
}


cantidad.addEventListener('keypress', function(evt) {
    if (filterInteger(evt, evt.target) === false) {
        evt.preventDefault();
    }
});

function validarCorreo(email) {
  // email
   var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
   if (expReg.test(email)==false) {
      alert("Mail invalido");
      return false;
   }
   else {
       return true;  
   }
  
}

resume.addEventListener("click", (e) => {
  e.preventDefault();
  if ( !emptyInput(name) && !emptyInput(surname) && !emptyInput(email) && !emptyInput(cantidad) && !emptySelect(select))
   {
      
         Swal.fire({
      icon: "success",
      
      html: `<h1>Muchas gracias por elegirnos!!!</h1>
      <h3>Compra exitosa!!! </h3>
      <p>${name.value} ${surname.value}</p>
      <p>Hemos enviado la informacion a: ${email.value}</p>
      <p>${divTotal.textContent}</p>`,
      confirmButtonText: "Continuar",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./index.html";
          }
        });
  }
});