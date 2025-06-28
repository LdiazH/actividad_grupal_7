// Scripts

$(document).ready(function() {
    // Función para mostrar un mensaje de error de validación para un campo específico
    function showError(field, message) {
        field.addClass('is-invalid').after(`<div class="invalid-feedback">${message}</div>`);
    }

    // Función para limpiar todos los mensajes de error de validación
    function clearErrors() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
    }

    $('#formCompra').on('submit', function(e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        // --- Validaciones ---

        // Validar nombre
        const nombreField = $('#fixName');
        if (nombreField.val().trim().length < 3) {
            isValid = false;
            showError(nombreField, 'El nombre debe tener al menos 3 caracteres.');
        }

        // Validar tipo de reparación
        const tipoField = $('#fixOption');
        if (!tipoField.val()) {
            isValid = false;
            showError(tipoField, 'Debe seleccionar un tipo de reparación.');
        }

        // Validar descripción
        const descField = $('#fixDescription');
        if (descField.val().trim().length < 10) {
            isValid = false;
            showError(descField, 'La descripción debe tener al menos 10 caracteres.');
        }

        // Validar fecha y hora
        const fechaField = $('#fixTime');
        if (!fechaField.val()) {
            isValid = false;
            showError(fechaField, 'Debe seleccionar una fecha y hora.');
        }

        // Validar número de tarjeta
        const tarjetaField = $('#fixCardNumber');
        const tarjetaValue = tarjetaField.val().replace(/\s+/g, '');
        if (!/^\d{15,16}$/.test(tarjetaValue)) {
            isValid = false;
            showError(tarjetaField, 'El número de tarjeta debe tener 15 o 16 dígitos.');
        }

        // Validar nombre del titular
        const titularField = $('#fixCardName');
        if (titularField.val().trim().length < 3) {
            isValid = false;
            showError(titularField, 'El nombre del titular debe tener al menos 3 caracteres.');
        }

        // Validar CVV
        const cvvField = $('#fixCardCVV');
        if (!/^\d{3}$/.test(cvvField.val())) {
            isValid = false;
            showError(cvvField, 'El CVV debe tener 3 dígitos.');
        }

        // --- Lógica de envío ---

        if (!isValid) {
            // Si el formulario no es válido, hacer scroll al primer error
            $('html, body').animate({
                scrollTop: $('.is-invalid').first().offset().top - 100
            }, 500);
        } else {
            // Si el formulario es válido, mostrar mensaje de éxito y reiniciar
            // Se comprueba si bootbox está definido para evitar errores.
            bootbox.alert('¡Solicitud enviada correctamente!', () => {
                this.reset();
                clearErrors();
            });
        }
    });
});