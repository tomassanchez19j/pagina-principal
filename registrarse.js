const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const inputDni = document.getElementById("dni")
const inputPais = document.getElementById("pais")
const inputEmail = document.getElementById("email")
const inputContraseña = document.getElementById("contraseña")
const btn = document.querySelector(".btn")


btn.addEventListener("click", async (e) => {
    e.preventDefault()

    const emailIngresado = inputEmail.value

    const { data, error } = await supabase
      .from('usuarios')
      .select('email')
      .eq('email', emailIngresado)

    if (error) {
        console.error("Error al traer datos", error)
        return
    }

    if (data.length > 0) {
        console.log("El email ya está registrado:", data)
        alert("Este correo ya tiene una cuenta")
    } else {

        const datos = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            dni: inputDni.value,
            pais: inputPais.value,
            email: emailIngresado,
            contraseña: inputContraseña.value
        }
    }
})
    console.log("Enviando datos:", datos)

    fetch('https://api-viajes-77bq.vercel.app/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Registro fallido. Código: " + res.status)
        }
        return res.json()
    })
    .then(data => {
        alert("Registro exitoso")
       
        inputNombre.value = ""
        inputApellido.value = ""
        inputDni.value = ""
        inputPais.value = ""
        inputEmail.value = ""
        inputContraseña.value = ""

     
        window.location.href = "iniciarsesion.html"
    })
    .catch(error => {
        console.error("Error:", error)
        alert("Hubo un error al registrar el usuario. Verifica los datos.")
    })


