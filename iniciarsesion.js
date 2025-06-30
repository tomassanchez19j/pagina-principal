document.querySelector(".btn").addEventListener("click", async () => {
const email = document.getElementById("email").value
const password = document.getElementById("contraseña").value

    const params = new URLSearchParams()
    params.append("username", email)
    params.append("password", password)

    
    try {
        const response = await fetch("https://api-viajes-77bq.vercel.app/api/login", {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            
        })

        if (response.ok ) {
            const data = await response.json()
            const token = data.access_token

            
            localStorage.setItem("token", token)

       
            document.getElementById("mensaje").textContent = "Inicio de sesión exitoso "
            

            
             window.location.href = "index.html"

        } else {
            document.getElementById("mensaje").textContent = "Credenciales incorrectas "
            console.log(params)
        }
    } catch (error) {
        console.error("Error:", error)
        document.getElementById("mensaje").textContent = "Error al iniciar sesión"
    }
})
