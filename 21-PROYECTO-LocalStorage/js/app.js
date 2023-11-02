//Selectores y Listeners
document.addEventListener("DOMContentLoaded", () => {

  //Obejto

  const emailOBJ = {
    email:"",
    asunto:"",
    mensaje:"",
  } 

  const email = document.querySelector("#email")
  const asunto = document.querySelector("#asunto")
  const mensaje = document.querySelector("#mensaje")
  const formulario = document.querySelector("#formulario")
  const btnSubmit = document.querySelector('#formulario button[type="submit"]')
  const btnRemove =  document.querySelector('#formulario button[type="reset"]')
  const spinner = document.querySelector("#spinner")

  email.addEventListener("blur", validar) 
  asunto.addEventListener("blur", validar)
  mensaje.addEventListener("blur", validar)
  formulario.addEventListener("submit", activarSpinner)
  btnRemove.addEventListener("click", (e) => {
    e.preventDefault()
    emailOBJ.email=""
    emailOBJ.asunto=""
    emailOBJ.mensaje=""
    formulario.reset()
    comprobarEmail()
  })
  
  function activarSpinner(e) {
    e.preventDefault()
    spinner.classList.add("flex")
    spinner.classList.remove("hidden")

    setTimeout(()=> {
      spinner.classList.remove("flex")
      spinner.classList.add("hidden")

      // Creamos una alerta
      const confirmar = document.createElement("P")
      confirmar.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase")
      confirmar.textContent = "Cliente agregado correctamente"
      // Lo insertamos al final del formulario
      formulario.appendChild(confirmar)

      // El mensaje se queda siempre, ponemos otrro setTimeout para quitarlo.
      setTimeout(()=> {
        confirmar.remove()
      },3000)

    }, 3000)
  }

  function resetForm() {
    emailOBJ.email=""
    emailOBJ.asunto=""
    emailOBJ.mensaje=""
    formulario.reset()
  }

  function validar(e) {
    if(e.target.value.trim() === "") {
      mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
      emailOBJ[e.target.name] = ""
      comprobarEmail()
      return
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)){
      mostrarAlerta(`El email no es valido`, e.target.parentElement)
      comprobarEmail()
      return
    }
    limpiarAlerta(e.target.parentElement)


    emailOBJ[e.target.name] = e.target.value.trim().toLowerCase()
    comprobarEmail(emailOBJ)
  }

  function comprobarEmail() {
    const values = Object.values(emailOBJ)
    console.log(values)
    //Activar boton
    if (values.includes("")){
      btnSubmit.classList.add("opacity-50")
      btnSubmit.disabled = true
    } else {
      btnSubmit.classList.remove("opacity-50")
      btnSubmit.disabled = false
    }
  }

  function limpiarAlerta(referencia) {
      const alerta = referencia.querySelector(".bg-red-600") 
      if (alerta) {
        alerta.remove()
      }
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia)
    const error = document.createElement("P")
    error.textContent = mensaje
    error.classList.add("bg-red-600", "text-center", "text-white", "p-2")
    referencia.appendChild(error)
  }

  function validarEmail(email){
    regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    resultado = regex.test(email)
    return resultado
  }

})