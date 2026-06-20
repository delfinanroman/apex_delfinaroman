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
