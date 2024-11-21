document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    if (username === "Nahuelarg93") {
        Swal.fire("¡Bienvenido!", "Login exitoso", "success").then(() => {
            window.location.href = "./app.html";
        });
    } else {
        Swal.fire("Error", "Usuario incorrecto", "error");
    }
});
