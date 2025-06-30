compra_simple.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-compra-final-simple")) {
    const datos_formulario = new FormData(formulario_compra_simple)
    nombre = datos_formulario.get("nombre")
    email = datos_formulario.get("email")
    contraseña = datos_formulario.get("contraseña")

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Usuario no autenticado")
      window.location.href = "iniciarsesion.html"
      return
    }

    const usuario = parseJwt(token)

    const hoy = new Date()
    const datos_ventas_vuelo = {
      id_vuelo: id_vuelo2,
      id_comprador: usuario.id,
      fecha_compra: hoy.toLocaleDateString("es-AR"),
      hora_compra: hoy.toLocaleTimeString("es-AR"),
      monto_total: monto_total2
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
