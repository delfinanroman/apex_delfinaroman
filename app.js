/* ========================================
   APEX SIM ACADEMY — Alpine.js App Logic
   ======================================== */

function app() {
  return {
    /* ── STATE ── */
    cookieAccepted: false,
    countdown: { m: 14, s: 59 },
    activeNode: null,
    openFaq: null,
    notification: null,

    notifQueue: [
      { user: 'Carlos M.',    city: 'Madrid',      time: '2 min' },
      { user: 'Valentina R.', city: 'México DF',   time: '5 min' },
      { user: 'Diego F.',     city: 'Buenos Aires', time: '1 min' },
      { user: 'Ana K.',       city: 'Bogotá',      time: '3 min' },
      { user: 'Tomás N.',     city: 'Santiago',    time: '7 min' },
      { user: 'Lucía P.',     city: 'Miami',       time: '4 min' },
    ],
    notifIndex:   0,
    notifVisible: false,
    notifExiting: false,

    /* ── CONTENT DATA ── */
    nodes: {
      volante: {
        title:   'Biomecánica del Volante',
        content: 'Aprenderás la postura ideal de 9-3, técnica de hand-over-hand para ángulos extremos y el arte del "feeling" de subviraje/sobreviraje antes de que ocurra. En 30 días dominarás lo que un piloto tardó años en corregir.',
        stat:    'Mejora: +38% precisión en curvas',
        color:   'cyan',
      },
      pantalla: {
        title:   'Lectura de Telemetría en Tiempo Real',
        content: 'Interpretarás datos de velocidad en vértice, aceleración lateral G-force y puntos de frenada óptimos. Usaremos software de análisis profesional idéntico al de los equipos de Formula E.',
        stat:    'Reducción: -1.8s por vuelta en promedio',
        color:   'purple',
      },
      software: {
        title:   'Configuración de Setup Avanzado',
        content: 'Desde aerodinamia hasta diferencial. Aprenderás a leer la telemetría de neumáticos, ajustar suspensión para cada circuito y comunicarte técnicamente con tu ingeniero de carrera como los profesionales.',
        stat:    'ROI: Setup correcto = +0.5s por sector',
        color:   'cyan',
      },
      vuelo: {
        title:   'Instrumentación de Vuelo',
        content: 'Dominarás el panel de instrumentos completo: altímetro, velocímetro de aire, horizonte artificial y VOR. Desde VFR hasta procedimientos IFR completos en condiciones meteorológicas adversas.',
        stat:    'Nivel alcanzado: Licencia PPL en 90 días',
        color:   'purple',
      },
      tactico: {
        title:   'Tácticas y Comunicación de Escuadra',
        content: 'Protocolo NATO de radio, lectura de mapas tácticos y toma de decisiones bajo presión extrema. Entrenamientos basados en los protocolos de las fuerzas especiales reconvertidos para el simulador.',
        stat:    'Winrate en equipo: +65% primeras 2 semanas',
        color:   'cyan',
      },
    },

    faqs: [
      {
        q: '¿Cuánto tiempo necesito dedicar por semana?',
        a: 'Con 6 horas semanales (2 sesiones de 3 horas) verás resultados medibles en 14 días. Nuestro currículo fue diseñado específicamente para personas con trabajo y vida social. Si tienes más tiempo, el progreso es exponencial.',
      },
      {
        q: '¿Y si no tengo equipo de simulador en casa?',
        a: 'El 40% de nuestros alumnos empieza con un mando básico de consola. Tenemos un programa específico "From Zero" donde enseñamos primero la teoría y te guiamos para construir o conseguir el setup correcto con un presupuesto real.',
      },
      {
        q: '¿El precio es realmente accesible o hay costos ocultos?',
        a: 'El precio que ves es el precio final. Sin mensualidades ocultas, sin "módulos premium". Incluye acceso de por vida a las actualizaciones del currículo y a la comunidad privada. Una sola sesión con un coach privado cuesta más que todo el plan Elite.',
      },
      {
        q: '¿Qué pasa si soy un completo principiante y no sirvo para esto?',
        a: 'Nuestro alumno con peor historial previo ganó su primera carrera online a las 6 semanas. La aptitud no existe en simuladores: existe la metodología correcta. Si en 30 días no estás satisfecho, te devolvemos el 100% del dinero. Sin preguntas.',
      },
    ],

    /* ── LIFECYCLE ── */
    init() {
      this.startCountdown();
      this.initScrollReveal();
      setTimeout(() => this.showNextNotif(), 4000);
    },

    /* ── METHODS ── */
    startCountdown() {
      setInterval(() => {
        if (this.countdown.s > 0) {
          this.countdown.s--;
        } else if (this.countdown.m > 0) {
          this.countdown.m--;
          this.countdown.s = 59;
        } else {
          // Reset to keep the loop going
          this.countdown.m = 14;
          this.countdown.s = 59;
        }
      }, 1000);
    },

    pad(n) {
      return String(n).padStart(2, '0');
    },

    initScrollReveal() {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      // Small delay to ensure Alpine has rendered the DOM
      setTimeout(() => {
        document.querySelectorAll('.reveal, .reveal-left').forEach((el) => io.observe(el));
      }, 100);
    },

    showNextNotif() {
      const n = this.notifQueue[this.notifIndex % this.notifQueue.length];
      this.notification  = n;
      this.notifVisible  = true;
      this.notifExiting  = false;

      setTimeout(() => {
        this.notifExiting = true;
        setTimeout(() => {
          this.notifVisible = false;
          this.notifIndex++;
          // Random delay between notifications: 4–7 s
          setTimeout(() => this.showNextNotif(), 4000 + Math.random() * 3000);
        }, 400);
      }, 5000);
    },

    toggleFaq(i) {
      this.openFaq = this.openFaq === i ? null : i;
    },
  };
}
let timeLeft = 15 * 60;
const countdown = document.getElementById("countdown");

function updateCountdown(){
  if (!countdown) return;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  countdown.textContent =
    `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

  if(timeLeft > 0){
    timeLeft--;
  } else {
    countdown.textContent = "00:00";
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sim-point").forEach((point) => {
    const openBtn = point.querySelector(".sim-hotspot");
    const closeBtn = point.querySelector(".sim-close");

    openBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      point.classList.add("open");
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      point.classList.remove("open");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".academy-track");
  const slides = document.querySelectorAll(".academy-slide");
  const prev = document.querySelector(".academy-prev");
  const next = document.querySelector(".academy-next");

  if (!track || !slides.length) return;

  let index = 0;

  function updateCarousel(){
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  next?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });

  prev?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const nodes = document.querySelectorAll(".course-node");
  const contents = document.querySelectorAll(".course-content");

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      const course = node.dataset.course;

      nodes.forEach((n) => n.classList.remove("active"));
      node.classList.add("active");

      contents.forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(`curso-${course}`)?.classList.add("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {

  const banner = document.querySelector(".cookie-banner");
  const accept = document.getElementById("acceptCookies");
  const basic = document.getElementById("basicCookies");

  if (!banner) return;

  if (localStorage.getItem("apex-cookies")) {
    banner.style.display = "none";
  }

  function closeBanner(type) {
    localStorage.setItem("apex-cookies", type);

    banner.style.opacity = "0";
    banner.style.transform = "translateY(30px)";

    setTimeout(() => {
      banner.style.display = "none";
    }, 300);
  }

  accept?.addEventListener("click", () => {
    closeBanner("all");
  });

  basic?.addEventListener("click", () => {
    closeBanner("basic");
  });

});
document.addEventListener("DOMContentLoaded", () => {

  const banner = document.getElementById("cookieBanner");

  if (!banner) return;

  banner.style.display = "none";

  setTimeout(() => {
    banner.style.display = "block";
  }, 5000);

});
document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("liveToast");
  const title = document.getElementById("toastTitle");
  const text = document.getElementById("toastText");

  if (!toast || !title || !text) return;

  const messages = [
    ["Nuevo piloto en pista", "Martín reservó una sesión de telemetría."],
    ["Entrenamiento iniciado", "Valentina comenzó el programa Performance."],
    ["Mejora registrada", "Tomás bajó 1.2s en su última vuelta."],
    ["Nueva reserva", "Lucía agendó una práctica guiada."],
    ["Análisis completado", "Un piloto revisó su trazada con coaching APEX."]
  ];

  let index = 0;

  function showToast(){
    title.textContent = messages[index][0];
    text.textContent = messages[index][1];

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4200);

    index = (index + 1) % messages.length;
  }

  setTimeout(showToast, 2500);
  setInterval(showToast, 9500);
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const whyCards = document.querySelectorAll(".why-card");

  whyCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
});

document.addEventListener("scroll", () => {
  const section = document.querySelector(".action-section");
  const img = document.querySelector(".action-media img");

  if (!section || !img) return;

  const rect = section.getBoundingClientRect();
  const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1);

  img.style.transform = `translateY(${ -10 + progress * 18 }%)`;
});