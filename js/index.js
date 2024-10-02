// se ingresa el nombre de usuario Nahuelarg93


function userValidator() {
    let name;
    
        do{
            name = prompt("Por favor ingrese su nombre de usuario");
            if (name == "Nahuelarg93") {
                alert("Dato ingresado correcto");
            }
            else {
                alert("dato ingresado incorrecto ");
            }
            
        } while (name !== "Nahuelarg93");
            console.log("usuario correcto");
        
    }

function userValidatorCard() {
    let card;
    do{
        card = prompt("Por favor ingrese los 16 numeros de su tarjeta");
        if (card.length == 16 && !isNaN(card)){ 
            alert("Tarjeta ingresada correctamente");
        // alert("Tarjeta ingresada correctamente:", card);
    }else {
        alert("Debe ingresar los 16 digitos");
    }
} while (card.length !== 16);
console.log("tarjeta correcta");

}
userValidator(); 
userValidatorCard();
