//variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const reinicio = document.querySelector(['#email', '#asunto', '#mensaje']);
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMcontentLoaded', iniciarApp);
    //validar el formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    //enviar email
    formulario.addEventListener('submit', enviarEmail);
    //reiniciar el formulario
    btnReset.addEventListener('click', restartFormulary);
}



//funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//valida el formulario

function validarFormulario(e){
    if(e.target.value.length > 0){
        //eliminar los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        
        //cambiar el color del recuadro cuando los datos sean corectos
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.add('border', 'border-red-500');
        mostrarError('todos los campos son obligatorios');
    }
    if(e.target.type === 'email'){
        
        //const resultado = e.target.value.indexOf('@');
        if(regex.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            //cambiar el color del recuadro cuando los datos sean corectos
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            
            mostrarError('email no valido');
        }
    }

    if(regex.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        console.log('pasaste validacion');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        console.log('hay campos por validar');
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'm-2', 'text-center', 'error');

    //querySelectorAll nos va a devolver una coleccion
    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
        //para ponerlo arriba con un insertBefore
        //formulario.insertBefore(mensajeError, document.querySelector('.mb-10'))
    }
    
}

//reiniciar el formulario
function restartFormulary(e){
    formulario.reset();
    console.log('comprobando');
    e.preventDefault();
    //volver a iniciar para resetear el boton de enviar
    // iniciarApp();
}

//envia el email

function enviarEmail(e){
    e.preventDefault();
    //seleccionar el spinner para mostrar carga
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //funcion para que despues de 3 segundos se oculte el spinner
    setTimeout( () => {
        // console.log('esta funcion se ejecuta despues de 3 segundos')
        spinner.style.display = 'none';
        //mensaje de que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        //seleccionar la zona donde vamos a insertar el parrafo
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            //eliminar el mensaje de exito
            parrafo.remove();
            formulario.reset();
            console.log('escuchando');
        }, 2000)
    }, 3000);
    //tambien podemos usar setInterval y se ejecutara cada 3 segundos
    // setInterval( () => {
    //     console.log('esta funcion se ejecuta despues de 3 segundos')
    // }, 3000);
}



// function vaciarFormulary(e){
//     reinicio.reset();
//     e.preventDefault();
// }