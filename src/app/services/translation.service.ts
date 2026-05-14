import { Injectable, signal } from '@angular/core';

type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLang = signal<Lang>(this.getInitialLang());

  private getInitialLang(): Lang {
    if (typeof window === 'undefined') return 'es';
    const stored = localStorage.getItem('lang') as Lang | null;
    return stored === 'en' || stored === 'es' ? stored : 'es';
  }

  toggleLang() {
    const next = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(next);
    localStorage.setItem('lang', next);
  }

  translations: Record<string, Record<Lang, string>> = {
    /* Navbar */
    'nav.home': { es: 'INICIO', en: 'HOME' },
    'nav.projects': { es: 'PROYECTOS', en: 'PROJECTS' },
    'nav.contact': { es: 'CONTACTO', en: 'CONTACT' },

    /* Home - Status window */
    'home.windowHeader': { es: 'ESTADO', en: 'STATUS' },
    'home.nameLabel': { es: 'NOMBRE:', en: 'NAME:' },
    'home.nameValue': { es: 'IVO THAIEL VICENCIO ROSAS', en: 'IVO THAIEL VICENCIO ROSAS' },
    'home.jobLabel': { es: 'TRABAJO:', en: 'ROLE:' },
    'home.jobValue': { es: 'FULL STACK DEVELOPER', en: 'FULL STACK DEVELOPER' },
    'home.titleLabel': { es: 'TÍTULO:', en: 'DEGREE:' },
    'home.titleValue': { es: 'ANALISTA PROGRAMADOR', en: 'ANALYST PROGRAMMER' },
    'home.levelLabel': { es: 'NIVEL:', en: 'LEVEL:' },
    'home.levelValue': { es: '24', en: '24' },
    'home.softSkills': { es: 'APTITUDES_BLANDAS', en: 'SOFT SKILLS' },
    'home.skill1': { es: 'COMUNICACIÓN EFECTIVA', en: 'EFFECTIVE COMMUNICATION' },
    'home.skill2': { es: 'PENSAMIENTO CRÍTICO', en: 'CRITICAL THINKING' },
    'home.skill3': { es: 'ADAPTABILIDAD', en: 'ADAPTABILITY' },
    'home.skill4': { es: 'TRABAJO EN EQUIPO', en: 'TEAMWORK' },
    'home.origin': {
      es: 'ORIGEN: NEUQUÉN // UBICACIÓN ACTUAL: JUJUY',
      en: 'ORIGIN: NEUQUÉN // CURRENT LOCATION: JUJUY',
    },
    'home.downloadEs': { es: 'DESCARGAR_CV_ES.PDF', en: 'DOWNLOAD_CV_ES.PDF' },
    'home.downloadEn': { es: 'DESCARGAR_CV_EN.PDF', en: 'DOWNLOAD_CV_EN.PDF' },
    'home.skillHeader': { es: 'HABILIDAD RECONOCIDA', en: 'SKILL UNLOCKED' },
    'home.mastery': { es: 'MAESTRÍA:', en: 'MASTERY:' },
    'home.close': { es: 'CERRAR_', en: 'CLOSE_' },
    'home.title': { es: 'IVO VICENCIO', en: 'IVO VICENCIO' },
    'home.subtitle': { es: 'FULL STACK DEVELOPER', en: 'FULL STACK DEVELOPER' },
    'home.location': { es: 'JUJUY & NEUQUÉN, ARGENTINA', en: 'JUJUY & NEUQUÉN, ARGENTINA' },

    /* Tech descriptions */
    'tech.angular': {
      es: 'Desarrollo de aplicaciones modulares con arquitectura basada en componentes, servicios y state management.',
      en: 'Modular application development with component-based architecture, services, and state management.',
    },
    'tech.react': {
      es: 'Creación de interfaces dinámicas con componentes funcionales, hooks y manejo de estado.',
      en: 'Dynamic interface development with functional components, hooks, and state management.',
    },
    'tech.nodejs': {
      es: 'Desarrollo de APIs REST y servicios backend en el ecosistema Node.js.',
      en: 'REST API development and backend services within the Node.js ecosystem.',
    },
    'tech.java': {
      es: 'Conocimientos fundamentales de programación orientada a objetos y sintaxis del lenguaje.',
      en: 'Fundamental knowledge of object-oriented programming and language syntax.',
    },
    'tech.javascript': {
      es: 'Manejo del núcleo del lenguaje, manipulación del DOM y lógica asíncrona.',
      en: 'Core language proficiency, DOM manipulation, and asynchronous logic.',
    },
    'tech.docker': {
      es: 'Contenerización de aplicaciones, clustering, tuning y despliegue en entornos productivos.',
      en: 'Application containerization, clustering, tuning, and production deployment.',
    },
    'tech.linux': {
      es: 'Administración de servicios, gestión del sistema y uso avanzado del entorno Linux.',
      en: 'Service administration, system management, and advanced Linux environment usage.',
    },

    /* Projects */
    'projects.title': { es: 'PROYECTOS_', en: 'PROJECTS_' },
    'projects.subtitle': { es: 'FILTRAR POR CATEGORÍA', en: 'FILTER BY CATEGORY' },
    'projects.all': { es: 'TODOS', en: 'ALL' },
    'projects.fullstack': { es: 'FULL STACK', en: 'FULL STACK' },
    'projects.frontend': { es: 'FRONTEND', en: 'FRONTEND' },
    'projects.backend': { es: 'BACKEND', en: 'BACKEND' },
    'projects.inProgress': { es: 'EN PROCESO', en: 'IN PROGRESS' },
    'projects.details': { es: 'DETALLES', en: 'DETAILS' },
    'projects.context': { es: 'EL CONTEXTO', en: 'THE CONTEXT' },
    'projects.stack': { es: 'STACK TECNOLÓGICO', en: 'TECH STACK' },
    'projects.repoFront': { es: 'REPO FRONT', en: 'FRONT REPO' },
    'projects.repoBack': { es: 'REPO BACK', en: 'BACK REPO' },
    'projects.deploy': { es: 'VER DEPLOY', en: 'VIEW DEPLOY' },
    'projects.back': { es: 'VOLVER', en: 'GO BACK' },

    /* Project data */
    'projects.dental.title': { es: 'DentalTurnos', en: 'DentalTurnos' },
    'projects.dental.desc': {
      es: 'Sistema integral de gestión de turnos e historias clínicas para consultorios odontológicos.',
      en: 'Comprehensive appointment and clinical record management system for dental offices.',
    },
    'projects.dental.history': {
      es: 'Desarrollado para optimizar la agenda de los profesionales y digitalizar el historial de los pacientes. El mayor reto fue el manejo de horarios superpuestos.',
      en: 'Built to optimize professional schedules and digitize patient records. The biggest challenge was managing overlapping appointments.',
    },
    'projects.delrey.title': { es: 'Del Rey E-commerce', en: 'Del Rey E-commerce' },
    'projects.delrey.desc': {
      es: 'Catálogo dinámico y sistema de ventas para tienda de calzado regional.',
      en: 'Dynamic catalog and sales system for a regional footwear store.',
    },
    'projects.delrey.history': {
      es: 'Un proyecto familiar clave. Digitalizamos el inventario físico y armamos un catálogo intuitivo.',
      en: 'A key family project. We digitized the physical inventory and built an intuitive catalog.',
    },
    'projects.paqueteria.title': { es: 'Gestión de Paquetería', en: 'Package Management' },
    'projects.paqueteria.desc': {
      es: 'Microservicio de autenticación y gestión de envío y recepción de paquetes.',
      en: 'Authentication microservice for package shipping and receiving management.',
    },
    'projects.paqueteria.history': {
      es: 'Práctica intensiva de arquitectura backend. Implementé seguridad con JWT y despliegue en contenedores en un proyecto colaborativo para la facultad.',
      en: 'Intensive backend architecture practice. Implemented JWT security and container deployment in a collaborative university project.',
    },
    'projects.soysi.title': { es: 'SoySí Residencia', en: 'SoySí Residence' },
    'projects.soysi.desc': {
      es: 'Panel de administración visual para la gestión de residencias estudiantiles.',
      en: 'Visual administration panel for student residence management.',
    },
    'projects.soysi.history': {
      es: 'Desarrollo integral para mejorar la gestión interna de la fundación sí.',
      en: 'Full-stack development to improve the internal management of the Sí foundation.',
    },
    'projects.olympo.title': { es: 'Olympo GYM', en: 'Olympo GYM' },
    'projects.olympo.desc': {
      es: 'Proyecto de gimnasio con sistema de gestión de membresías.',
      en: 'Gym project with membership management system.',
    },
    'projects.olympo.history': {
      es: 'Logré transformar un sistema complejo en un panel limpio y fácil de operar para los dueños.',
      en: 'I transformed a complex system into a clean, easy-to-operate panel for the owners.',
    },

    /* Contact */
    'contact.tag': { es: 'ESTABLECIENDO CONEXIÓN_', en: 'ESTABLISHING CONNECTION_' },
    'contact.title': { es: 'CONTACTO_', en: 'CONTACT_' },
    'contact.networks': { es: 'ENLACES_DE_RED', en: 'NETWORK_LINKS' },
    'contact.gmail': { es: 'GMAIL', en: 'GMAIL' },
    'contact.gmailDesc': { es: 'Enviar Mensaje Directo', en: 'Send Direct Message' },
    'contact.linkedin': { es: 'LINKEDIN', en: 'LINKEDIN' },
    'contact.linkedinDesc': { es: 'Perfil Profesional', en: 'Professional Profile' },
    'contact.github': { es: 'GITHUB', en: 'GITHUB' },
    'contact.githubDesc': { es: 'Repositorios de Código', en: 'Code Repositories' },
    'contact.instagram': { es: 'INSTAGRAM', en: 'INSTAGRAM' },
    'contact.instagramDesc': { es: 'Contenido Visual', en: 'Visual Content' },
    'contact.mission': { es: 'SOLICITUD DE MISIÓN', en: 'MISSION REQUEST' },
    'contact.nameLabel': { es: 'NOMBRE_DEL_EMISOR', en: 'SENDER_NAME' },
    'contact.namePlaceholder': { es: 'Ingresar nombre...', en: 'Enter name...' },
    'contact.emailLabel': { es: 'CANAL_DE_RETORNO (EMAIL)', en: 'RETURN_CHANNEL (EMAIL)' },
    'contact.emailPlaceholder': { es: 'correo@ejemplo.com', en: 'email@example.com' },
    'contact.subjectLabel': { es: 'ASUNTO_DEL_MENSAJE', en: 'MESSAGE_SUBJECT' },
    'contact.subjectPlaceholder': { es: 'Motivo de contacto...', en: 'Contact reason...' },
    'contact.messageLabel': { es: 'DETALLES_DE_LA_MISIÓN', en: 'MISSION_DETAILS' },
    'contact.messagePlaceholder': {
      es: 'Escribe tu mensaje aquí...',
      en: 'Write your message here...',
    },
    'contact.submit': { es: 'INICIAR TRANSMISIÓN_', en: 'START TRANSMISSION_' },
    'contact.sending': { es: 'ENVIANDO DATOS...', en: 'SENDING DATA...' },
    'contact.success': { es: '¡MENSAJE RECIBIDO!', en: 'MESSAGE RECEIVED!' },
    'contact.error': { es: 'ERROR:', en: 'ERROR:' },
    'contact.back': { es: 'VOLVER', en: 'GO BACK' },

    /* Footer */
    'footer.created': { es: 'CREADO POR', en: 'CREATED BY' },
    'footer.dev': { es: 'FULL STACK DEVELOPER', en: 'FULL STACK DEVELOPER' },
    'footer.location': { es: 'Jujuy & Neuquén, Argentina', en: 'Jujuy & Neuquén, Argentina' },
  };

  translate(key: string): string {
    const lang = this.currentLang();
    const entry = this.translations[key];
    return entry ? entry[lang] : key;
  }
}
