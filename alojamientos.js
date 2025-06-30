import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"


const supabaseUrl = "https://gtggrdzrgifuqoihvjll.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z2dyZHpyZ2lmdXFvaWh2amxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTY4MjAsImV4cCI6MjA2NTMzMjgyMH0.vvhAkTFCsJYbd0W_5tYrwsWtQMjeXnqjB4ybC3zEN-k"
const supabase = createClient(supabaseUrl, supabaseKey)
const btn_comprar = document.querySelector(".btn_comprar")
const elemento = document.querySelector(".container")
const url = "https://api-viajes-77bq.vercel.app/api/alquileres/leer"
const formulario_compra_simple = document.querySelector(".formulario-compra-simple")
const compra = document.querySelector(".compra_flotante")
const compra_simple = document.querySelector(".compra_contenido")



fetch(url)
  .then(res => res.json())
  .then(data => {
    data.forEach(vuelo => {
      const card = document.createElement("div")
      card.classList.add("card-vuelo", "extra")
      card.id = vuelo.id_vuelos
      card.innerHTML = `
        
          <div class="vuelo-top" ">
            <img src="img/logo.png" alt="Logo Aerolínea">
            <span>jet & go</span>
          </div>
          <div class="vuelo-body">
            <p>PARTIDA</p>
            <p>hla mundo</p>
          </div>
          <div class="vuelo-bottom">
            <h4>$${vuelo.precio}</h4>
          </div>
          <section class="vuelo-botones">
            <a href="#" class="btn_comprar">comprar</a>
            <a href="#" class="btn_agregar_carrito">+</a>
          </section>
        
      `
      elemento.appendChild(card)
    })
  })
    

    
    



 elemento.addEventListener("click", (e) => {
  if(e.target.classList.contains("btn_comprar")){
    compra.style.display = "flex"
  }
  })

    
compra.addEventListener("click", (e) => {
    if (!e.target.closest(".compra_contenido")) {
      compra.style.display = "none"
    }
})

function calcularTotal() {
    let total = 0
    document.querySelectorAll(".carrito-contenido h4").forEach(el => {
      total += Number(el.textContent.replace("$", ""))
    })
    document.getElementById("total-carrito").textContent = `$${total}`
  }

const contenido_carrito = document.querySelector(".carrito-contenido")
const btn_carrito = document.getElementById("carrito")
const carrito = document.querySelector(".carrito-flotante")
 btn_carrito.addEventListener("click", (e) => {
  if(e.target.classList.contains("btn")){
    carrito.style.display = "flex"
   
  }
  })
carrito.addEventListener("click", (e) => {
    if (!e.target.closest(".carrito-contenido")) {
      carrito.style.display = "none"
    }
})





const div2 =document.createElement("div")
elemento.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_agregar_carrito")) {
   
    const card = e.target.closest(".card-vuelo")
    if (card) {


      
      const vueloHTML = card.cloneNode(true)
      const btn_basura = vueloHTML.querySelector(".btn_agregar_carrito")
      const btn_eliminar_carrito = vueloHTML.querySelector(".btn_comprar")
      
      btn_basura.remove()
      btn_eliminar_carrito.textContent = ("-")
      vueloHTML.classList.remove("card-vuelo")
      vueloHTML.classList.add("card-vuelo2")
      contenido_carrito.appendChild(vueloHTML)
      calcularTotal()
    }
  } else {
    console.log("err")
  }
})







// Muestra el formulario de compra y guarda los datos del vuelo en dataset
elemento.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_comprar")) {
    const card = e.target.closest(".card-vuelo")
    if (card) {
      const vuelo_precio = card.querySelector(".vuelo-bottom h4").textContent.replace("$", "")
      
      // 🔁 ASIGNAMOS DATOS EN EL FORMULARIO PARA USAR MÁS TARDE
      formulario_compra_simple.setAttribute("data-id-vuelo", card.id)
      formulario_compra_simple.setAttribute("data-precio-vuelo", vuelo_precio)
      
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

  
    const idVuelo = formulario_compra_simple.getAttribute("data-id-vuelo")
    const precioVuelo = formulario_compra_simple.getAttribute("data-precio-vuelo")

  
    if (!idVuelo || !precioVuelo) {
      alert("No se pudieron recuperar los datos del vuelo. Reintentá la compra.")
      return
    }
    const datos_ventas_vuelo = {
      id_alquileres: idVuelo,
      id_comprador: usuario.id,
      fecha_compra: hoy.toLocaleDateString("es-AR"),
      hora_compra: hoy.toLocaleTimeString("es-AR"),
      monto_total: precioVuelo
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
})

