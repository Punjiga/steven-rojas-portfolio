document.addEventListener('DOMContentLoaded', function () {

    //------------------- PARA EL MENU DE HAMBURGUESA --------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu');
    const closeBtn = document.querySelector('.close-menu');
    function openMenu() {
        menuToggle.classList.add('open');
        menuList.classList.add('active');
    }
    function closeMenu() {
        menuToggle.classList.remove('open');
        menuList.classList.remove('active');
    }
    menuToggle.addEventListener('click', () => {
        if (menuToggle.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    //------------------- FONDO ANIMADO TODA LA PAGINA --------------------------
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            fullScreen: { enable: false },
            fpsLimit: 30,
            particles: {
                number: { value: 40 },
                shape: { type: "circle" },
                size: { value: 20, random: true },
                color: { value: ["#d96523", "#68c46d", "#5c4033"] },
                opacity: { value: 0.2 },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    outModes: { default: "bounce" }
                }
            },
            background: { color: { value: "#f2efe9" } }
        });
    }
    //------------------- LETRAS P HEADER (CON ANIMACIÓN DE OPACIDAD) --------------------------
    const palabrasPorIdioma = {
        es: ["Web", "Foto", "Video"],
        en: ["Web", "Photo", "Video"]
    };
    let idiomaActual = 'es';
    const cambiadorId = "cambiador";
    let intervaloCambiador = null;
    function iniciarAnimacionCambiador() {
        const cambiador = document.getElementById(cambiadorId);
        if (!cambiador) {
            return;
        }
        cambiador.style.transition = "opacity 0.5s ease-in-out";
        cambiador.style.opacity = "1";
        const palabras = palabrasPorIdioma[idiomaActual] || palabrasPorIdioma.es;
        if (intervaloCambiador) {
            clearInterval(intervaloCambiador);
            intervaloCambiador = null;
        }
        let indexCambiador = palabras.indexOf(cambiador.textContent?.trim());
        if (indexCambiador < 0) {
            indexCambiador = 0;
        }
        cambiador.textContent = palabras[indexCambiador];
        intervaloCambiador = setInterval(() => {
            const el = document.getElementById(cambiadorId);
            if (!el) {
                clearInterval(intervaloCambiador);
                intervaloCambiador = null;
                return;
            }
            el.style.opacity = "0";
            setTimeout(() => {
                indexCambiador = (indexCambiador + 1) % palabras.length;
                el.textContent = palabras[indexCambiador];
                el.style.opacity = "1";
            }, 500);
        }, 2500);
    }
    //------------------- FLECHA QUE LLEVA HACIA ARRIBA --------------------------
    const goUp = document.getElementById('goUp');
    window.addEventListener('scroll', () => {
        if (!goUp) {
            return;
        }
        if (window.scrollY > 50) {
            goUp.classList.add('show');
        } else {
            goUp.classList.remove('show');
        }
    });
    if (goUp) {
        goUp.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    //------------------- CODIGO BARRA DESPLAZABLE PROYECTOS --------------------------
    const radios = document.querySelectorAll('.radio-container input[name="project"]');
    const glider = document.querySelector('.radio-container .glider');
    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked && glider) {
                glider.style.transform = `translateY(${index * 100}%)`;
            }
        });
    });
    //------------------- CODIGO PROYECTOS CAMBIAR IMG Y RUTA PROYECTOS -------------------------
    const titulo = document.getElementById("projectTitle");
    const circle = document.querySelector(".circleProject");
    const btn = document.getElementById("visitBtn");
    document.querySelectorAll("input[name='project']").forEach(input => {
        input.addEventListener("change", () => {
            if (input.id === "proj1") {
                if (titulo) {
                    titulo.textContent = "Congreso de Café";
                }
                if (circle) {
                    circle.style.backgroundImage = "url(../assets/imgs/project-1.png)";
                    circle.href = "https://congreso-de-cafe.vercel.app/  ";
                }
                if (btn) {
                    btn.href = "https://congreso-de-cafe.vercel.app/  ";
                }
            } else if (input.id === "proj2") {
                if (titulo) {
                    titulo.textContent = "Fit Force";
                }
                if (circle) {
                    circle.style.backgroundImage = "url(../assets/imgs/project-2.png)";
                    circle.href = "https://fit-force-final.vercel.app/  ";
                }
                if (btn) {
                    btn.href = "https://fit-force-final.vercel.app/  ";
                }
            } else if (input.id === "proj3") {
                if (titulo) {
                    titulo.textContent = "Bonfire Lit";
                }
                if (circle) {
                    circle.style.backgroundImage = "url(../assets/imgs/project-3.png)";
                    circle.href = "https://bonfire-lit.vercel.app/  ";
                }
                if (btn) {
                    btn.href = "https://bonfire-lit.vercel.app/  ";
                }
            }
        });
    });
    if (titulo) {
        titulo.textContent = "Congreso de Café";
    }
    if (circle) {
        circle.style.backgroundImage = "url('./assets/imgs/project-1.png')";
    }
    if (btn) {
        btn.href = "https://congreso-de-cafe.vercel.app/  ";
    }
    //------------------- FORMULARIO -------------------------
    if (window.emailjs) {
        emailjs.init("_SC3QrHOmpfnC4f8J");
    }
    const form = document.getElementById("mi-form");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("correo");
    const mensaje = document.getElementById("mensaje");
    const enviarBtn = form ? form.querySelector("button[type='submit']") : null;
    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
    };
    const validarForm = () => {
        if (!nombre || !email || !mensaje) {
            return false;
        }
        if (nombre.value.trim().length < 2) {
            return false;
        }
        if (!validarEmail(email.value.trim())) {
            return false;
        }
        if (mensaje.value.trim().length < 10) {
            return false;
        }
        return true;
    };
    function actualizarBtn() {
        if (!enviarBtn) {
            return;
        }
        if (validarForm()) {
            enviarBtn.disabled = false;
            enviarBtn.style.opacity = "1";
            enviarBtn.style.cursor = "pointer";
        } else {
            enviarBtn.disabled = true;
            enviarBtn.style.opacity = "0.5";
            enviarBtn.style.cursor = "not-allowed";
        }
    }
    if (enviarBtn) {
        enviarBtn.disabled = true;
        enviarBtn.style.opacity = "0.5";
        enviarBtn.style.cursor = "not-allowed";
    }
    [nombre, email, mensaje].forEach(input => {
        if (input) {
            input.addEventListener("input", actualizarBtn);
        }
    });
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (!validarForm()) {
                Swal.fire({
                    title: 'Formulario incompleto',
                    html: 'Revisa que tu <b>nombre</b> tenga al menos 2 caracteres, tu <b>email</b> sea válido y el <b>mensaje</b> tenga al menos 10 caracteres.',
                    icon: 'error',
                    confirmButtonColor: 'var(--color-ctas)'
                });
                return;
            }
            emailjs.sendForm("service_imnngtd", "template_gj5v8t2", form)
                .then(() => {
                    Swal.fire({
                        title: 'Mensaje enviado',
                        html: 'Te responderé en <span style="color: var(--color-ctas)"><b>menos de 48 horas</b></span>.',
                        icon: 'success',
                        confirmButtonColor: 'var(--color-ctas)'
                    });
                    form.reset();
                    actualizarBtn();
                })
                .catch(() => {
                    Swal.fire({
                        title: 'Error al enviar',
                        text: 'Intenta nuevamente más tarde.',
                        icon: 'error',
                        confirmButtonColor: 'var(--color-ctas)'
                    });
                });
        });
    }
    //------------------- VIDEO -------------------------
    function loadVideo(container) {
        container.innerHTML = `
            <iframe src="https://www.youtube.com/embed/jOeX9W99U9s?autoplay=1"
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
                style="width:100%; height:500px; border-radius:20px 0 0 20px;">
            </iframe>`;
    }
    window.loadVideo = loadVideo;
    //------------------- HABILIDADES -------------------------
    const carousel = document.querySelector('.skills-carousel');
    const totalSkills = 12;
    if (carousel) {
        for (let contador = 1; contador <= totalSkills; contador++) {
            const item = document.createElement('div');
            item.className = 'skill-item';
            item.innerHTML = `<img src="./assets/imgs/habilidad-${contador}.png" alt="Habilidad ${contador}">`;
            carousel.append(item);
        }
        const items = carousel.querySelectorAll('.skill-item');
        if (items.length) {
            let current = 0;
            let dir = 1;
            items[current].classList.add('lift');
            setInterval(() => {
                items[current].classList.remove('lift');
                if (current === items.length - 1) {
                    dir = -1;
                } else if (current === 0) {
                    dir = 1;
                }
                current += dir;
                items[current].classList.add('lift');
            }, 900);
        }
    }
    //-------------------  PARA EL CAMBIO DE IDIOMA Y SIMILARES -------------------------
    const interruptorIdioma = document.getElementById('toggle');
    const elementosTraducibles = document.querySelectorAll('[data-lang]');
    cargarTextosDelIdioma(idiomaActual);
    if (interruptorIdioma) {
            interruptorIdioma.addEventListener('change', () => {
                let nuevoIdioma;
                if (interruptorIdioma.checked) {
                    nuevoIdioma = 'en';
                } else {
                    nuevoIdioma = 'es';
                }
                if (nuevoIdioma !== idiomaActual) {
                    cambiarIdioma(nuevoIdioma);
                }
            });
    }
    function cambiarIdioma(nuevoIdioma) {
        document.body.classList.add('cambiando-idioma');
        setTimeout(() => {
            idiomaActual = nuevoIdioma;
            cargarTextosDelIdioma(idiomaActual);
            document.documentElement.setAttribute('lang', idiomaActual);
            document.body.classList.remove('cambiando-idioma');
        }, 150);
    }
    function cargarTextosDelIdioma(codigoIdioma) {
        const rutaJSON = `./JS/lang/${codigoIdioma}.json`;
        fetch(rutaJSON)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`No se pudo cargar ${rutaJSON}`);
                }
                return res.json();
            })
            .then(textos => {
                elementosTraducibles.forEach(el => {
                    const clave = el.getAttribute('data-lang');
                    if (textos[clave]) {
                        el.innerHTML = textos[clave];
                    }
                });
                const camposFormulario = [
                    { id: 'nombre', key: 'form_name_placeholder' },
                    { id: 'correo', key: 'form_email_placeholder' },
                    { id: 'mensaje', key: 'form_message_placeholder' }
                ];
                camposFormulario.forEach(item => {
                    const input = document.getElementById(item.id);
                    if (input && textos[item.key]) {
                        input.placeholder = textos[item.key];
                    }
                });
                const cvLink = document.getElementById('cvDownloadLink');
                if (cvLink) {
                    if (codigoIdioma === 'es') {
                        cvLink.href = './assets/CV-WEB-ES.pdf';
                        cvLink.download = 'CV-Steven-Rojas-ES.pdf';
                        cvLink.setAttribute('aria-label', 'Descargar CV en español');
                    } else {
                        cvLink.href = './assets/CV-WEB-EN.pdf';
                        cvLink.download = 'CV-Steven-Rojas-EN.pdf';
                        cvLink.setAttribute('aria-label', 'Download CV in English');
                    }
                }
                iniciarAnimacionCambiador();
            })
            .catch(err => {
                console.log('Error al cargar idioma:', err);
                iniciarAnimacionCambiador();
            });
    }

});
