
const elemento = document.querySelector(".container")
const btn_comprar = document.querySelector(".btn_comprar")
const compra = document.querySelector(".compra_flotante")
const vermas = document.querySelector(".btn-ver-mas")
let url = "http://api-viajes-77bq.vercel.app/api/vuelos/leer"
i = 8
j = 4
let mostrandoMas = false;

vermas.addEventListener("click", () => {
  if (!mostrandoMas) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.slice(j, i).forEach(vuelo => {
          const card = document.createElement("div")
          card.classList.add("card-vuelo", "extra")
          card.innerHTML = `
            
              <div class="vuelo-top">
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
          elemento.appendChild(card);
        })
        vermas.textContent = "ver menos"
        mostrandoMas = true
      })
  } else {
    document.querySelectorAll(".extra").forEach(el => el.remove())
    vermas.textContent = "ver más"
    mostrandoMas = false
  }
})









fetch(url)
 .then(res => res.json())
 .then(data=> traer_vuelos(data))
 function traer_vuelos(vuelos) {
  vuelos.slice(0, 4).forEach(vuelo => {
    const card = document.createElement("div");
    card.classList.add("card-vuelo");
    card.innerHTML = `
    
    <div class="vuelo-top">
      <img src="img/logo.png" alt="Logo Aerolínea">
      <span>jet & go</span>
    </div>
    <div class="vuelo-body">
      <p>PARTIDA</p>
      <p> ${vuelo.partida} → ${vuelo.destino}</p>
      <p>${vuelo.fecha_de_salida} · ${vuelo.hora_de_salida}</p>
      <p>LLEGADA</p>
      <p> ${vuelo.partida} → ${vuelo.destino}</p>
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
    elemento.appendChild(card);
  });
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





























