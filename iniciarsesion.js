document.querySelector(".btn").addEventListener("click", async () => {
const email = document.getElementById("email").value
const password = document.getElementById("contraseña").value

    const params = new URLSearchParams()
    params.append("username", email.value)
    params.append("password", password.value)
    try {
        const response = await fetch("https://api-viajes-77bq.vercel.app/api/login", {
            method: "POST",
            body: params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            
        })

        if (response.ok) {
            const data = await response.json()
            const token = data.access_token

            // Guardar token en localStorage para futuras solicitudes
            localStorage.setItem("token", token)

            // Redirigir o mostrar mensaje
            document.getElementById("mensaje").textContent = "Inicio de sesión exitoso ✅"
            console.log(params)

            // Redirigir a página protegida si querés
            // window.location.href = "dashboard.html"

        } else {
            document.getElementById("mensaje").textContent = "Credenciales incorrectas ❌"
            console.log(email,contra1)
        }
    } catch (error) {
        console.error("Error:", error)
        document.getElementById("mensaje").textContent = "Error al iniciar sesión"
    }
})
