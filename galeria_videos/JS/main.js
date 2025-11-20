// ========================= VANTA BIRDS =========================
VANTA.BIRDS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x013220,
    color1: 0xea580c,
    color2: 0xea580c,
    birdSize: 1,
    wingSpan: 25.00,
    speedLimit: 4.00,
    separation: 20.00,
    alignment: 20.00,
    cohesion: 20.00,
    quantity: 3.00
});

// ========================= ANIMACIONES SCROLL =========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========================= OPEN MODAL YOUTUBE =========================
function openModal(videoId) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.modal-content');
    const iframe = document.getElementById('videoFrame');
    const igContainer = document.getElementById('ig-embed-container');

    // Limpiar contenido previo
    iframe.src = '';
    igContainer.innerHTML = '';
    igContainer.style.display = 'none';
    iframe.style.display = 'block';

    // Detectar si es short por data-categories
    const thumbnail = document.querySelector(`[onclick="openModal('${videoId}')"]`);
    const isShort = thumbnail && thumbnail.dataset.categories && thumbnail.dataset.categories.includes('shorts');

    // Configurar dimensiones
    modalContent.setAttribute('data-short', isShort ? 'true' : 'false');
    modalContent.classList.remove('modal-ig');

    // Cargar video
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&origin=${window.location.origin}`;

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================= OPEN MODAL INSTAGRAM =========================
function openIgModal(postId, isShort = false) {
    const modal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.modal-content');
    const iframe = document.getElementById('videoFrame');
    const igContainer = document.getElementById('ig-embed-container');

    // Limpiar contenido previo
    iframe.src = '';
    iframe.style.display = 'none';
    igContainer.innerHTML = '';
    igContainer.style.display = 'block';

    // Configurar dimensiones
    modalContent.setAttribute('data-short', isShort ? 'true' : 'false');
    modalContent.classList.add('modal-ig');

    // Crear embed de Instagram
    igContainer.innerHTML = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/${postId}/" data-instgrm-version="14"></blockquote>`;

    // Procesar embed
    if (window.instgrm) {
        window.instgrm.Embeds.process();
    }

    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========================= CLOSE MODAL =========================
function closeModal() {
    const modal = document.getElementById('videoModal');
    const modalContent = document.querySelector('.modal-content');
    const iframe = document.getElementById('videoFrame');
    const igContainer = document.getElementById('ig-embed-container');

    // Detener contenido
    iframe.src = '';
    igContainer.innerHTML = '';

    // Resetear clases y atributos
    modal.classList.remove('active');
    modalContent.classList.remove('modal-ig');
    modalContent.removeAttribute('data-short');

    // Restaurar scroll
    document.body.style.overflow = 'auto';
}

// ========================= EVENT LISTENERS CIERRE =========================
// Cerrar con X (delegación de eventos para que funcione siempre)
document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
        closeModal();
    }
});

// Cerrar clickeando fuera del contenido
document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// ========================= FILTER VIDEOS =========================
function filterVideos(cat) {
    document.querySelectorAll('.video-thumbnail').forEach(v => {
        const categories = v.dataset.categories ? v.dataset.categories.split(',') : [];
        v.style.display = (cat === 'all' || categories.includes(cat)) ? 'block' : 'none';
    });
}

// ========================= CONTACT =========================
function contactMe() {
    const email = 'stevenrojasrivera182@gmail.com';
    const subject = 'Consulta sobre tu trabajo visual';
    const body = 'Hola Steven,\n\nMe interesa tu trabajo. ¿Podemos hablar?\n\nGracias.';

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
        if (document.hasFocus()) {
            showEmailToast(email);
        }
    }, 300);
}

// ========================= EMAIL TOAST =========================
function showEmailToast(email) {
    if (document.getElementById('email-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'email-toast';
    toast.className = 'email-toast';
    toast.innerHTML = `
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        <span>No se pudo abrir el correo.<br><strong>${email}</strong> copiado al portapapeles.</span>
        <button onclick="this.parentElement.remove()">X</button>
    `;

    document.body.appendChild(toast);
    navigator.clipboard.writeText(email);
}

// ========================= ANIMACIÓN FADEIN =========================
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
`);

// ========================= SCROLL TO TOP =========================
const goUp = document.getElementById('goUp');
window.addEventListener('scroll', () => {
    if (!goUp) return;
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

// ========================= CHATBOT =========================
const container = document.getElementById('bot-container');
const iframe = document.getElementById('bot-iframe');
let chatOpen = false;

if (container && iframe) {
    container.addEventListener('click', () => {
        if (chatOpen) {
            iframe.style.display = 'none';
            chatOpen = false;
        } else {
            iframe.style.display = 'block';
            chatOpen = true;
        }
    });

    // Cierra al click fuera
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && !iframe.contains(e.target) && chatOpen) {
            iframe.style.display = 'none';
            chatOpen = false;
        }
    });
}