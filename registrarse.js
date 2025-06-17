inputNombre = document.getElementById("nombre")
inputApellido = document.getElementById("apellido")
inputDni = document.getElementById("dni")
inputPais = document.getElementById("pais")
inputEmail = document.getElementById("email")
inputContraseña = document.getElementById("contraseña")
btn = document.querySelector(".btn")


btn.addEventListener("click", function(){
    datos = {
        "nombre": inputNombre.value,
        "apellido": inputApellido.value,
        "dni": inputDni.value,
        "pais": inputPais.value,
        "email": inputEmail.value,
        "contraseña": inputContraseña.value,
    }
    console.log(datos)
    fetch('http://api-viajes-77bq.vercel.app/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datos) 
  
})
  inputNombre.value = ""
  inputApellido.value = ""
  inputDni.value = ""
  inputPais.value = ""
  inputEmail.value = ""
  inputContraseña.value = ""
  
  window.location.href ="iniciarsesion.html"
})

