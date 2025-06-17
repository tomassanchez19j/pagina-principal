

const elemento = document.querySelector(".container")
const btn_comprar = document.querySelector(".btn_comprar")
const compra = document.querySelector(".compra_flotante")
let url = "http://api-viajes-77bq.vercel.app/api/vuelos/leer"
fetch(url)
 .then(res => res.json())
 .then(data=> traer_vuelos(data))
 function traer_vuelos(vuelos){
    vuelos.forEach(vuelo => {
        const tomas = document.createElement("div")
        tomas.classList.add("mini-container")
    tomas.innerHTML = `
      <p><strong>Origen:</strong> ${vuelo.partida}</p><p><strong>Destino:</strong> ${vuelo.destino}</p> <p><strong>Precio:</strong> $${vuelo.precio}</p><button class="btn_comprar">Comprar </button><button class="btn_agregar_carrito">+</button>
    `

    elemento.appendChild(tomas)


 
    })
     
 }
 elemento.addEventListener("click", (e) => {
  if(e.target.classList.contains("btn_comprar")){
    compra.style.display = "flex"
  }
  })

    
compra.addEventListener("click", (e) => {
    if (!e.target.closest(".compra_contenido")) {
      compra.style.display = "none"
    }
});




























