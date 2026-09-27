
function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarSelect(selectElement, errorElement, mensaje) {
    if (!selectElement || selectElement.value === '' || selectElement.selectedIndex === 0) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

// Validación de correo genérica (cualquier correo válido).
function validarCorreo(campo, errorElement, mensaje) {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function validarGenero(genero, errorElement, mensaje) {
    let seleccionado = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            seleccionado = true;
            break;
        }
    }

    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,            // Duración: 3 segundos
        gravity: "top",             // Posición: arriba
        position: "right",          // Alineación: derecha
        style: {
            background: "rgba(0, 128, 0, 0.8)",  // Verde con transparencia
            color: "#fff",                      // Texto blanco
            borderRadius: "12px",               // Esquinas redondeadas
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra ligera
            padding: "12px 20px"               // Más relleno
        },
        stopOnFocus: true, // No desaparecer al pasar el mouse
    }).showToast();
}

// Función principal que valida todo el formulario
function validarFormulario() {

    const inputTipoIdentificacion = document.getElementById('identificacion');
    const inputIdentificacion = document.getElementById('numero-identificacion');
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreoElectronico = document.getElementById('correo-electronico');
    const inputGenero = document.getElementsByName('genero');
    const inputFechaNacimiento = document.getElementById('fecha-nacimiento'); // NUEVO
    const inputClave = document.getElementById('clave');
    const inputConfirmarClave = document.getElementById('confirmar-clave');

    const labelErrorTipoIdentificacion=document.getElementById('errorTipoIdentificacion');
    const labelErrorNumeroIdentificacion=document.getElementById('errorNumeroIdentificacion');
    const labelErrorNombres=document.getElementById('errorNombres');
    const labelErrorApellidos=document.getElementById('errorApellidos');
    const labelErrorCorreo=document.getElementById('errorCorreo');
    const labelErrorGenero=document.getElementById('errorGenero');
    const labelErrorFechaNacimiento = document.getElementById('errorFechaNacimiento'); // NUEVO
    const labelErrorClave=document.getElementById('errorClave');
    const labelErrorConfirmarClave=document.getElementById('errorConfirmarClave');

    const tipoIdentificacionValida=validarCampoObligatorio(inputTipoIdentificacion,labelErrorTipoIdentificacion,"El tipo de identificación es obligatorio");
    const identificacionValida = validarCampoObligatorio(inputIdentificacion,labelErrorNumeroIdentificacion, 'La identificación es obligatoria');
    const nombresValidos = validarLongitud(inputNombres,labelErrorNombres , 1, 20, 'El nombre debe tener entre 1 y 20 caracteres');
    const apellidosValidos = validarLongitud(inputApellidos,labelErrorApellidos , 1, 20, 'El apellido debe tener entre 1 y 20 caracteres');
    const correoValido = validarCorreo(inputCorreoElectronico, labelErrorCorreo,'Ingrese un correo electrónico válido');
    const generoValido = validarGenero(inputGenero,labelErrorGenero,'El género es obligatorio' );
    const fechaValida = validarCampoObligatorio(inputFechaNacimiento, labelErrorFechaNacimiento, 'La fecha de nacimiento es obligatoria'); // NUEVO
    const claveValida = validarClave(inputClave, labelErrorClave, 'La contraseña debe tener mínimo 8 caracteres, con letras y números');
    const confirmarClaveValida = validarConfirmarClave(inputClave, inputConfirmarClave, labelErrorConfirmarClave, 'Las contraseñas no coinciden');

    // Si todas las validaciones son correctas (Se incluyó fechaValida)
    if (tipoIdentificacionValida && identificacionValida && nombresValidos && apellidosValidos &&
        correoValido && generoValido && fechaValida && claveValida && confirmarClaveValida) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formularioContacto');
        formulario.scrollIntoView({ behavior: "smooth", block: "start" });
        formulario.classList.add("was-validated");
        setTimeout(() => {
            formulario.reset();
        }, 2000);
        return false; 
    } else {
        alert('Por favor, complete correctamente el formulario.');
        return false; 
    }
}

function validarCamposAlCambiarFoco()
{
    const inputTipoIdentificacion = document.getElementById('identificacion');
    const inputIdentificacion = document.getElementById('numero-identificacion');
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputCorreoElectronico = document.getElementById('correo-electronico');
    const inputGenero = document.getElementsByName('genero');
    const inputFechaNacimiento = document.getElementById('fecha-nacimiento'); // NUEVO
    const inputClave = document.getElementById('clave');
    const inputConfirmarClave = document.getElementById('confirmar-clave');

    const labelErrorTipoIdentificacion=document.getElementById('errorTipoIdentificacion');
    const labelErrorNumeroIdentificacion=document.getElementById('errorNumeroIdentificacion');
    const labelErrorNombres=document.getElementById('errorNombres');
    const labelErrorApellidos=document.getElementById('errorApellidos');
    const labelErrorCorreo=document.getElementById('errorCorreo');
    const labelErrorGenero=document.getElementById('errorGenero');
    const labelErrorFechaNacimiento = document.getElementById('errorFechaNacimiento'); // NUEVO
    const labelErrorClave=document.getElementById('errorClave');
    const labelErrorConfirmarClave=document.getElementById('errorConfirmarClave');

    inputTipoIdentificacion.addEventListener('blur',()=> validarCampoObligatorio(
        inputTipoIdentificacion,
        labelErrorTipoIdentificacion,
        "El tipo de identificación es obligatorio"));

    inputIdentificacion.addEventListener('blur', () => validarCampoObligatorio(inputIdentificacion, labelErrorNumeroIdentificacion, 'El número de id es obligatorio.'));
    inputNombres.addEventListener('blur', () => validarLongitud(inputNombres, labelErrorNombres, 1, 20, 'El nombre debe tener entre 1 y 20 caracteres.'));
    inputApellidos.addEventListener('blur', () => validarLongitud(inputApellidos, labelErrorApellidos, 1, 20, 'El apellido debe tener entre 1 y 20 caracteres.'));
    inputCorreoElectronico.addEventListener('blur', () => validarCorreo(inputCorreoElectronico, labelErrorCorreo,'Ingrese un correo electrónico válido'));
    
    Array.from(inputGenero).forEach(input => {
        input.addEventListener('change', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio'));
        input.addEventListener('blur', () => validarGenero(inputGenero, labelErrorGenero,'El género es obligatorio'));
    });
    
    // NUEVAS REGLAS PARA FECHA DE NACIMIENTO
    inputFechaNacimiento.addEventListener('blur', () => validarCampoObligatorio(inputFechaNacimiento, labelErrorFechaNacimiento, 'La fecha de nacimiento es obligatoria.'));
    inputFechaNacimiento.addEventListener('change', () => validarCampoObligatorio(inputFechaNacimiento, labelErrorFechaNacimiento, 'La fecha de nacimiento es obligatoria.'));

    inputClave.addEventListener('blur', () => validarClave(inputClave, labelErrorClave, 'La contraseña debe tener mínimo 8 caracteres, con letras y números'));
    inputConfirmarClave.addEventListener('blur', () => validarConfirmarClave(inputClave, inputConfirmarClave, labelErrorConfirmarClave, 'Las contraseñas no coinciden'));
}


// Mínimo 8 caracteres, con al menos una letra y un número
function validarClave(campo, errorElement, mensaje) {
    const claveRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!claveRegex.test(campo.value)) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

// La contraseña es el dato que valida el registro
// Se acepta si coinciden
function validarConfirmarClave(claveCampo, confirmarClaveCampo, errorElement, mensaje) {
    if (confirmarClaveCampo.value === '' || confirmarClaveCampo.value !== claveCampo.value) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

document.addEventListener('DOMContentLoaded', validarCamposAlCambiarFoco);
