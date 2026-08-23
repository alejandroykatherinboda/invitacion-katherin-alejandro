/* =========================================================
   INVITACIÓN DIGITAL
   ALEJANDRO & KATHERIN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarAOS();
    iniciarLoader();
    cargarInvitado();
    iniciarSobre();
    iniciarMusica();
    iniciarPortada();
    iniciarContador();
    iniciarCalendario();
    iniciarSwiper();
    iniciarBotonArriba();
    iniciarPetalos();
    iniciarWhatsApp();

});


/* =========================================================
   AOS - ANIMACIONES
   ========================================================= */

function iniciarAOS() {

    if (typeof AOS === "undefined") {
        return;
    }

    AOS.init({
        duration: 1000,
        once: true,
        offset: 80
    });

}


/* =========================================================
   LOADER
   ========================================================= */

function iniciarLoader() {

    const loader = document.getElementById("loader");

    if (!loader) {
        return;
    }

    setTimeout(() => {

        loader.classList.add("oculto");

        setTimeout(() => {

            loader.style.display = "none";

        }, 900);

    }, 2300);

}


/* =========================================================
   INVITADO
   ========================================================= */

async function cargarInvitado() {

    const nombreElemento =
        document.getElementById("nombreInvitado");

    const cantidadElemento =
        document.getElementById("cantidadInvitados");

    if (!nombreElemento || !cantidadElemento) {
        return;
    }


    /*
        URL ESPERADA:

        ?invitado=1

        ?invitado=2

        ?invitado=3

        etc.
    */

    const parametros =
        new URLSearchParams(window.location.search);

    const idInvitado =
        parametros.get("invitado");


    /*
        Si no viene invitado,
        mostramos información general.
    */

    const paseElemento = cantidadElemento.closest(".pases");

    if (!idInvitado) {

        nombreElemento.textContent =
            "Invitado Especial";

        if (paseElemento) {
            paseElemento.style.display = "";
        }

        cantidadElemento.textContent =
            "2 Personas";

        return;

    }

    // Ocultamos el pase mientras cargamos el invitado para evitar
    // que aparezca temporalmente el texto predeterminado.
    if (paseElemento) {
        paseElemento.style.display = "none";
    }


    try {

        const respuesta =
            await fetch(`database/invitados.json?v=${Date.now()}`, {
                cache: "no-store"
            });


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo cargar invitados.json"
            );

        }


        const invitados =
            await respuesta.json();


        /*
            Buscamos el invitado
            por ID.
        */

        const invitado =
            invitados.find(
                persona =>
                    String(persona.id) === String(idInvitado)
            );


        if (!invitado) {

            nombreElemento.textContent =
                "Invitado Especial";

            if (paseElemento) {
                paseElemento.style.display = "none";
            } else {
                cantidadElemento.textContent = "";
            }

            console.warn(
                "No se encontró el invitado:",
                idInvitado
            );

            return;

        }


        /*
            NOMBRE
        */

        nombreElemento.textContent =
            invitado.nombre;


        /*
            CANTIDAD DE PERSONAS
        */

        const cantidad = Number(invitado.personas);

        // Si la cantidad es 0, ocultamos completamente "Pase para".

        if (!Number.isFinite(cantidad) || cantidad <= 0) {
            if (paseElemento) {
                paseElemento.style.display = "none";
            } else {
                cantidadElemento.textContent = "";
            }
            return;
        }

        if (paseElemento) {
            paseElemento.style.display = "";
        }

        if (cantidad === 1) {
            cantidadElemento.textContent = "1 Persona";
        } else {
            cantidadElemento.textContent = `${cantidad} Personas`;
        }


    } catch (error) {

        console.error(
            "Error cargando invitados:",
            error
        );


        nombreElemento.textContent =
            "Invitado Especial";

        cantidadElemento.textContent =
            "2 Personas";

    }

}


/* =========================================================
   SOBRE
   ========================================================= */

function iniciarSobre() {

    const sobre =
        document.getElementById("sobre");

    const welcome =
        document.getElementById("welcome");

    const hero =
        document.getElementById("hero");

    const musica =
        document.getElementById("musica");

    if (!sobre || !welcome) {
        return;
    }


    sobre.addEventListener("click", () => {

        /*
            Evitamos doble clic
        */

        if (sobre.classList.contains("abriendo")) {
            return;
        }


        sobre.classList.add("abriendo");


        /*
            Intentar iniciar música
            porque este evento viene
            directamente de una acción
            del usuario.
        */

        if (musica) {

            musica.volume = 0.6;

            musica.play()
                .then(() => {

                    actualizarBotonMusica(true);

                })
                .catch(() => {

                    console.log(
                        "El navegador bloqueó el audio."
                    );

                });

        }


        /*
            Ocultamos bienvenida
        */

        setTimeout(() => {

            welcome.classList.add("oculto");

        }, 500);


        /*
            Mostramos la portada
        */

        setTimeout(() => {

            if (hero) {

                hero.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            /*
                Volvemos a activar
                AOS después de abrir.
            */

            if (typeof AOS !== "undefined") {

                AOS.refresh();

            }

        }, 1000);

    });

}


/* =========================================================
   MÚSICA
   ========================================================= */

function iniciarMusica() {

    const boton = document.getElementById("musicButton");
    const audio = document.getElementById("musica");

    if (!boton || !audio) {
        return;
    }

    boton.addEventListener("click", () => {

        if (audio.paused) {

            audio.play()
                .then(() => {

                    boton.classList.add("reproduciendo");

                    boton.innerHTML =
                        '<i class="fa-solid fa-pause"></i>';

                    boton.setAttribute(
                        "aria-label",
                        "Pausar música"
                    );

                })
                .catch(error => {

                    console.log(
                        "No se pudo reproducir la música:",
                        error
                    );

                });

        } else {

            audio.pause();

            boton.classList.remove("reproduciendo");

            boton.innerHTML =
                '<i class="fa-solid fa-music"></i>';

            boton.setAttribute(
                "aria-label",
                "Reproducir música"
            );

        }

    });

}

/* =========================================================
   ACTUALIZAR BOTÓN DE MÚSICA
   ========================================================= */

function actualizarBotonMusica(reproduciendo) {

    const boton =
        document.getElementById("musicButton");

    if (!boton) {
        return;
    }


    if (reproduciendo) {

        boton.classList.add("reproduciendo");

        boton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

        boton.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } else {

        boton.classList.remove("reproduciendo");

        boton.innerHTML =
            '<i class="fa-solid fa-music"></i>';

        boton.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    }

}


/* =========================================================
   PORTADA
   ========================================================= */

function iniciarPortada() {

    const botonAbrir =
        document.getElementById("abrir");

    const contador =
        document.getElementById("contador");

    if (!botonAbrir || !contador) {
        return;
    }


    botonAbrir.addEventListener("click", () => {

        contador.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================================
   CONTADOR
   28 NOVIEMBRE 2026 - 6:00 PM
   HONDURAS UTC-6
   ========================================================= */

function iniciarContador() {

    const dias =
        document.getElementById("dias");

    const horas =
        document.getElementById("horas");

    const minutos =
        document.getElementById("minutos");

    const segundos =
        document.getElementById("segundos");


    if (!dias ||
        !horas ||
        !minutos ||
        !segundos) {

        return;

    }


    /*
        Fecha de la boda:

        28 de noviembre de 2026
        6:00 PM
        Honduras UTC-6
    */

    const fechaBoda =
        new Date(
            "2026-11-28T18:00:00-06:00"
        ).getTime();


    function actualizarContador() {

        const ahora =
            Date.now();


        const diferencia =
            fechaBoda - ahora;


        /*
            Si ya llegó la fecha
        */

        if (diferencia <= 0) {

            dias.textContent = "00";
            horas.textContent = "00";
            minutos.textContent = "00";
            segundos.textContent = "00";

            return;

        }


        const d =
            Math.floor(
                diferencia /
                (1000 * 60 * 60 * 24)
            );


        const h =
            Math.floor(
                (diferencia %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const m =
            Math.floor(
                (diferencia %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        const s =
            Math.floor(
                (diferencia %
                    (1000 * 60))
                /
                1000
            );


        dias.textContent =
            String(d).padStart(2, "0");


        horas.textContent =
            String(h).padStart(2, "0");


        minutos.textContent =
            String(m).padStart(2, "0");


        segundos.textContent =
            String(s).padStart(2, "0");

    }


    actualizarContador();


    setInterval(
        actualizarContador,
        1000
    );

}


/* =========================================================
   GOOGLE CALENDAR
   ========================================================= */

function iniciarCalendario() {

    const boton =
        document.getElementById("btnCalendario");

    if (!boton) {
        return;
    }


    boton.addEventListener(
        "click",
        (evento) => {

            evento.preventDefault();


            const titulo =
                encodeURIComponent(
                    "Boda de Alejandro & Katherin"
                );


            const detalles =
                encodeURIComponent(
                    "Acompáñanos a celebrar nuestro gran día."
                );


            const ubicacion =
                encodeURIComponent(
                    "Parroquia Nuestra Señora de la Candelaria, Barrio Abajo, Jacaleapa, El Paraíso, Honduras"
                );


            /*
                6:00 PM Honduras
                = 00:00 UTC del día siguiente

                Inicio:
                28 noviembre 2026
                18:00 Honduras

                Fin:
                28 noviembre 2026
                22:00 Honduras
            */

            const inicio =
                "20261129T000000Z";


            const fin =
                "20261129T040000Z";


            const url =
                "https://calendar.google.com/calendar/render" +
                "?action=TEMPLATE" +
                "&text=" + titulo +
                "&dates=" + inicio +
                "/" + fin +
                "&details=" + detalles +
                "&location=" + ubicacion;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   SWIPER - GALERÍA
   ========================================================= */

function iniciarSwiper() {

    if (typeof Swiper === "undefined") {
        return;
    }


    const galeria =
        document.querySelector(".mySwiper");


    if (!galeria) {
        return;
    }


    new Swiper(
        ".mySwiper",
        {

            loop: true,

            grabCursor: true,

            spaceBetween: 20,

            slidesPerView: 1,

            autoplay: {

                delay: 3500,

                disableOnInteraction: false

            },

            pagination: {

                el: ".swiper-pagination",

                clickable: true

            },

            breakpoints: {

                576: {

                    slidesPerView: 2

                },

                992: {

                    slidesPerView: 3

                }

            }

        }
    );

}


/* =========================================================
   BOTÓN VOLVER ARRIBA
   ========================================================= */

function iniciarBotonArriba() {

    const boton =
        document.getElementById("toTop");


    if (!boton) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                boton.classList.add("mostrar");

            } else {

                boton.classList.remove("mostrar");

            }

        }
    );


    boton.addEventListener(
        "click",
        (evento) => {

            evento.preventDefault();


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   PÉTALOS DORADOS
   ========================================================= */

function iniciarPetalos() {

    const contenedor =
        document.getElementById("petalos");


    if (!contenedor) {
        return;
    }


    const cantidad =
        18;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const petalo =
            document.createElement("span");


        petalo.classList.add("petalo");


        petalo.style.left =
            Math.random() * 100 + "%";


        petalo.style.animationDuration =
            (7 + Math.random() * 8) + "s";


        petalo.style.animationDelay =
            (Math.random() * 8) + "s";


        petalo.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        const tamaño =
            8 + Math.random() * 8;


        petalo.style.width =
            tamaño + "px";


        petalo.style.height =
            tamaño * 1.4 + "px";


        contenedor.appendChild(
            petalo
        );

    }

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function iniciarWhatsApp() {

    const formulario =
        document.getElementById("formWhatsapp");


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            const nombre =
                document.getElementById("nombre")
                    ?.value
                    .trim();


            const asistencia =
                document.getElementById("asistencia")
                    ?.value;


            const mensaje =
                document.getElementById("mensaje")
                    ?.value
                    .trim();


            if (!nombre) {

                alert(
                    "Por favor ingresa tu nombre."
                );

                return;

            }


            const texto =

                "Hola, Alejandro y Katherin. 💍❤️" +
                "\n\n" +

                "Soy: " +
                nombre +
                "\n" +

                "Confirmación: " +
                asistencia +
                "\n" +

                (
                    mensaje
                        ? "Mensaje: " +
                          mensaje +
                          "\n"
                        : ""
                ) +

                "\n" +

                "¡Gracias por la invitación!";


            const telefono =
                "50493344486";


            const url =
                "https://wa.me/" +
                telefono +
                "?text=" +
                encodeURIComponent(texto);


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   EFECTOS SUAVES
   ========================================================= */

function iniciarEfectosSuaves() {

    const elementos =
        document.querySelectorAll(
            ".efecto-suave"
        );


    if (!elementos.length) {
        return;
    }


    const observador =
        new IntersectionObserver(
            (entradas) => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.classList.add(
                                "visible"
                            );

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elementos.forEach(
        elemento => {

            observador.observe(
                elemento
            );

        }
    );

}


/* =========================================================
   INICIAR EFECTOS SUAVES
   ========================================================= */

setTimeout(
    iniciarEfectosSuaves,
    300
);