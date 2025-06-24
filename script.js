document.addEventListener('DOMContentLoaded', function() {

    // 1. Validación del Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));

    contactForm.addEventListener('submit', function(event) {
        // Previene el envío por defecto del formulario
        event.preventDefault();
        event.stopPropagation();

        // Agrega la clase de Bootstrap para mostrar los estilos de validación
        contactForm.classList.add('was-validated');

        // Comprueba si el formulario es válido
        if (contactForm.checkValidity()) {
            // Si es válido, simula el envío del correo y muestra el modal
            
            // Recolectar datos del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Crear el enlace mailto
            const subject = "Mensaje desde la web de Patitas Felices";
            const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
            const mailtoLink = `mailto:contacto@patitasfelices.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Redirigir para abrir el cliente de correo del usuario
            window.location.href = mailtoLink;

            // Mostrar el modal de confirmación
            // Se usa un pequeño retraso para asegurar que el cliente de correo se está abriendo
            setTimeout(() => {
                confirmationModal.show();
            }, 500);

            // Limpiar el formulario y quitar las clases de validación
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        }
    });

    // 2. Lógica para el carrusel de testimonios en pantallas pequeñas
    const testimonialCarouselElement = document.getElementById('testimonialCarousel');
    const carousel = new bootstrap.Carousel(testimonialCarouselElement, {
        interval: 5000, // Cambia de slide cada 5 segundos
        wrap: true // Permite que el carrusel sea cíclico
    });
    
    // Adaptar carrusel a móvil (opcional, pero mejora la UX)
    // El HTML ya está estructurado para que Bootstrap maneje la responsividad de las columnas,
    // pero si quisiéramos mostrar 1 solo testimonio en móvil, haríamos algo así:
    if (window.innerWidth < 768) {
        // En móvil, queremos que cada item del carrusel sea un solo testimonio.
        // Clonamos todos los testimonios y los ponemos en su propio carousel-item.
        const testimonialContainer = testimonialCarouselElement.querySelector('.carousel-inner');
        const testimonials = testimonialContainer.querySelectorAll('.col-lg-3');
        const newCarouselItems = [];

        testimonials.forEach((testimonial, index) => {
            const newItem = document.createElement('div');
            newItem.classList.add('carousel-item');
            if (index === 0) {
                newItem.classList.add('active');
            }
            // Mover el contenido del testimonio al nuevo item
            newItem.innerHTML = testimonial.innerHTML;
            newCarouselItems.push(newItem);
        });

        // Limpiar el contenedor y agregar los nuevos items
        testimonialContainer.innerHTML = '';
        newCarouselItems.forEach(item => {
            testimonialContainer.appendChild(item);
        });
    }

});