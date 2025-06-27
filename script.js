// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // =================================================
    // FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
    // =================================================
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    contactForm.addEventListener('submit', function (event) {
        // Prevenir el envío real del formulario para validarlo con JS
        event.preventDefault();
        event.stopPropagation();

        // Aplicar clases de validación de Bootstrap
        contactForm.classList.add('was-validated');

        // Comprobar si el formulario es válido
        if (contactForm.checkValidity()) {
            // El formulario es válido, procedemos
            
            // 1. Recoger los datos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 2. Construir el enlace mailto:
            // Esto abrirá la aplicación de correo por defecto del usuario
            const subject = "Mensaje desde la web de Patitas Felices";
            const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
            const mailtoLink = `mailto:contacto@patitasfelices.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // 3. Mostrar el modal de confirmación
            // Simulamos que el correo se "enviará" al mostrar este mensaje
            confirmationModal.show();
            
            // 4. Abrir el cliente de correo después de un breve instante
            // Esto le da tiempo al usuario a leer el modal antes de que la nueva ventana aparezca
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1500); // 1.5 segundos de espera
            
            // 5. Limpiar el formulario y remover clases de validación para el próximo uso
            contactForm.reset();
            contactForm.classList.remove('was-validated');

        } else {
            // El formulario no es válido, Bootstrap se encarga de mostrar los errores.
            console.log('Formulario inválido.');
        }
    });


    // =================================================
    // AJUSTE PARA EL CARRUSEL DE TESTIMONIOS EN MÓVILES
    // =================================================
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    
    // Esta función reorganiza los items para que en móvil se vea 1 por slide
    // y en desktop se vean 4.
    function setupCarousel() {
        if (window.innerWidth < 768) {
            const carousel = new bootstrap.Carousel(testimonialCarousel);
            const items = testimonialCarousel.querySelectorAll('.carousel-item');
            const singleItemsContainer = document.createElement('div');
            singleItemsContainer.classList.add('carousel-inner');

            items.forEach(item => {
                const cards = item.querySelectorAll('.col-md-3');
                cards.forEach((card, index) => {
                    const newSlide = document.createElement('div');
                    newSlide.classList.add('carousel-item');
                    if (singleItemsContainer.children.length === 0) {
                        newSlide.classList.add('active');
                    }
                    newSlide.appendChild(card.cloneNode(true));
                    singleItemsContainer.appendChild(newSlide);
                });
            });

            const originalInner = testimonialCarousel.querySelector('.carousel-inner');
            if (originalInner) {
                originalInner.innerHTML = singleItemsContainer.innerHTML;
            }
        }
    }
    
    // Ejecutar al cargar y al cambiar el tamaño de la ventana
    // Nota: Esta es una implementación simplificada. Una solución más robusta
    // recargaría la página o tendría una lógica más compleja para revertir los cambios.
    // Para este caso, funciona bien en la carga inicial.
    //setupCarousel(); // Descomentar si se desea activar esta lógica avanzada


    // =================================================
    // ACTUALIZAR AÑO EN EL FOOTER
    // =================================================
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
