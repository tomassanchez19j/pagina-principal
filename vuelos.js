const formulario_compra_simple = document.querySelector(".formulario-compra-simple")
const compra = document.querySelector(".compra_flotante")
const compra_simple = document.querySelector(".compra_contenido")

// Muestra el formulario de compra y guarda los datos del vuelo en dataset
compra.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_comprar")) {
    const card = e.target.closest(".card-vuelo")
    if (card) {
      const vuelo_precio = card.querySelector(".vuelo-bottom h4").textContent.replace("$", "")
      formulario_compra_simple.dataset.idVuelo = card.id
      formulario_compra_simple.dataset.precioVuelo = vuelo_precio
      compra.style.display = "flex"
    }
  }
})

// Cierra el formulario si se hace clic fuera del contenido
compra.addEventListener("click", (e) => {
  if (!e.target.closest(".compra_contenido")) {
    compra.style.display = "none"
  }
})

// Función para parsear el JWT y obtener el ID del usuario
function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

// Enviar datos de la compra al hacer clic en "Finalizar compra"
compra_simple.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-compra-final-simple")) {
    const datos_formulario = new FormData(formulario_compra_simple)
    const nombre = datos_formulario.get("nombre")
    const email = datos_formulario.get("email")
    const contraseña = datos_formulario.get("contraseña")

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Usuario no autenticado")
      window.location.href = "iniciarsesion.html"
      return
    }

    const usuario = parseJwt(token)
    const hoy = new Date()

    const datos_ventas_vuelo = {
      id_vuelo: formulario_compra_simple.dataset.idVuelo,
      id_comprador: usuario.id,
      fecha_compra: hoy.toLocaleDateString("es-AR"),
      hora_compra: hoy.toLocaleTimeString("es-AR"),
      monto_total: formulario_compra_simple.dataset.precioVuelo
    }

    console.log(datos_ventas_vuelo)

    fetch('https://api-viajes-77bq.vercel.app/api/ventas_de_vuelos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos_ventas_vuelo)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al agregar venta de vuelo")
        alert("Venta de vuelo agregada exitosamente")
        compra.style.display = "none"
      })
      .catch(err => console.error("Error al agregar venta de vuelo:", err))
  }
})
