import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"


const supabaseUrl = "https://gtggrdzrgifuqoihvjll.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z2dyZHpyZ2lmdXFvaWh2amxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3NTY4MjAsImV4cCI6MjA2NTMzMjgyMH0.vvhAkTFCsJYbd0W_5tYrwsWtQMjeXnqjB4ybC3zEN-k"
const supabase = createClient(supabaseUrl, supabaseKey)
const btn_comprar = document.querySelector(".btn_comprar")
const elemento = document.querySelector(".container")
const vermas = document.querySelector(".btn-ver-mas")
const url = "https://api-viajes-77bq.vercel.app/api/vuelos/leer"



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
            <p>${vuelo.partida} → ${vuelo.destino}</p>
            <p>${vuelo.fecha_de_salida} · ${vuelo.hora_de_salida}</p>
            <p>LLEGADA</p>
            <p>${vuelo.partida} → ${vuelo.destino}</p>
            <p>${vuelo.fecha_de_salida} · ${vuelo.hora_de_salida}</p>
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
    

    
    



const compra = document.querySelector(".compra_flotante")
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





//ACA SE CREAN LAS FUNCIONES PARA AGREGAR Y RECUPERAR DATOS A LA TABLA VENTA VUELOS
let id_vuelo2 = 0
let monto_total2 = ""

let email = ""
let contraseña = ""



//FUNCION PARA TRAER LA ID DEL PRODUCTO QUE SE QUIERE COMPRAR
const formulario_compra_simple = document.querySelector(".formulario-compra-simple")
elemento.addEventListener("click", (e) => {
// SI EL ELEMENTO EN Q SE HIZO CLICK TIENEN LA CLASE BTN_COMPRAR ME VA A RECUPERAR CARD-VUELO 
  if (e.target.classList.contains("btn_comprar")) {
    const card = e.target.closest(".card-vuelo")
// SI CARTA EXISTE ME VA A RECPERAR EL ID DEL VUELO Q SE VA A COMPRAR TAMBIEN RECUPERO EL PRECIO DEL VUELO
    if (card) {
      id_vuelo2 = card.id
      const vuelo_precio = card.querySelector(".vuelo-bottom h4")
      monto_total2 = vuelo_precio.textContent.replace("$", "")
    }
  }
})


//RECUPERO EL BTN Y EL CONTENEDOR Y LOS USO EN MI FUNCION DE VALIDAR SI TIENE UNA CUENTA CREADA
const btn_compra_final_simple = document.querySelector(".btn-compra-final-simple")
const compra_simple = document.querySelector(".compra_contenido")


const hoy = new Date()
compra_simple.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-compra-final-simple")) {
    
//RECUPERO LOS DATOS NOMBRE, EMAIL, CONTRASEÑADE MI FORMULARIO
    const datos_formulario = new FormData(formulario_compra_simple)
    email = datos_formulario.get("email")
    contraseña = datos_formulario.get("contraseña")
    
    

//LE PASO LOS DATOS COMO PARAMETROS A MI FUNCION
    
  }
})
function parseJwt(token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
}

// FUNCION PARA TRAER LA TABLA USUARIOS DE SUPABASE POR CONTRASEÑA Y EMAIL VALIDADONDO SI EXISTE O NO MI USUARIO
const token = localStorage.getItem("token")
if (!token) {
    alert("Usuario no autenticado")
    window.location.href = "iniciarsesion.html"
}

const usuario = parseJwt(token)
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
        alert("Venta de vuelo agregado exitosamente")
    })
    .catch(err => console.error("Error al agregar venta de vuelo:", err))


//
