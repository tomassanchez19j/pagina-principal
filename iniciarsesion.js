const inputusuario = document.getElementById("nombre");
const inputcontraseña = document.getElementById("contraseña");
const  btn = document.querySelector(".btn"); 


btn.onclick = (preventDefault) => {
    fetch("http://api-viajes-77bq.vercel.app/api/usuarios/leer")
    .then(response => response.json())
    .then(data => traerData(data))
    function traerData(data){
        data.forEach((dta) => {
            console.log(dta)
        
        if(inputusuario.value === dta.email && inputcontraseña.value === dta.contraseña){
            alert("Usuario y contraseña correctos");
            window.location.href ="index.html"
            pass
        }else{
            alert("Usuario o contraseña incorrectos");
            pass
        }
        });
    }
    
}


