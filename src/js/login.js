
const sesionLogin={};
const usuario = document.querySelector("#usuario");
const contrasena = document.querySelector("#contrasena");
const button = document.querySelector("#botonLogin");


button.addEventListener("click", (evento) =>{
     evento.preventDefault();
     loading();

    if(usuario.value == "vanina" && contrasena.value == "1234"){
        setTimeout(() => {
            window.location.href = "index.html";
            console.log("Delayed for 1 second.");
            const sesionLogin = {
                usuario: usuario.value,
                fecha: Date.now()
            };
            localStorage.setItem("session", JSON.stringify(sesionLogin));
          }, "2000");
    } 
})

function loading(){
    let texto = document.getElementById('botonLogin').textContent;
    console.log(texto);
    document.getElementById('botonLogin').textContent = "";
    button.classList.add("custom-loader");
}




