import { GuidePoint, OfficialWebsite, Meeting, TwentyQuestion, StepItem } from '../types';
import { ZOOM_MEETINGS } from './zoomMeetings';
import { IN_PERSON_MEETINGS } from './inPersonMeetings';

export const GUIDE_POINTS: GuidePoint[] = [
  {
    id: 1,
    title: "Asista a tantas reuniones como le sea posible.",
    description: "Las reuniones son el lugar para aprender, compartir y ganar fuerzas.",
    deepExplanation: "Escuchar las experiencias de otros compañeros que han transitado el mismo camino nos ayuda a mantener viva la identificación y a romper el aislamiento que genera el juego compulsivo."
  },
  {
    id: 2,
    title: "Llame frecuentemente a otros miembros.",
    description: "Manténgase en contacto con otros miembros de J.A. entre reuniones.",
    deepExplanation: "Tener una lista de teléfonos a mano y llamar antes de apostar salva vidas. Una llamada de dos minutos puede disipar la tentación de una recaída."
  },
  {
    id: 3,
    title: "No ponga a prueba o tiente al juego.",
    description: "No asocie con personas que apuestan, ni vaya a lugares donde haya juego.",
    deepExplanation: "Evite casinos, casas de apuestas, salones de tragaperras, aplicaciones de juego en el móvil y entornos donde se apueste o se hable constantemente de apuestas."
  },
  {
    id: 4,
    title: "Viva el Programa de Recuperación un día a la vez.",
    description: "Concéntrese solo en hoy, no se preocupe por el mañana ni lamente el ayer.",
    deepExplanation: "'Solo por hoy'. No intente resolver el resto de su vida en 24 horas. Si un día entero parece abrumador, concéntrese en la próxima hora o en el próximo minuto."
  },
  {
    id: 5,
    title: "Lea Literatura de Recuperación diariamente.",
    description: "Lea 'El Combo' y otra literatura aprobada para fortalecer su resolución.",
    deepExplanation: "La literatura de J.A. contiene las herramientas probadas durante décadas por miles de miembros en todo el mundo para mantener la abstinencia y encontrar serenidad."
  },
  {
    id: 6,
    title: "Consiga un Padrino/Madrina.",
    description: "Busque la guía de un miembro con experiencia en el programa.",
    deepExplanation: "Un padrino o madrina es alguien con tiempo de abstinencia continuada que comparte su experiencia y guía a través de los Doce Pasos con honestidad y cariño."
  },
  {
    id: 7,
    title: "Participe en el servicio de J.A.",
    description: "Ofrecerse como voluntario en su grupo le ayudará a mantenerse conectado y agradecido.",
    deepExplanation: "Ayudar a colocar las sillas, preparar el café, recibir a los nuevos miembros o moderar reuniones refuerza el compromiso personal con la sobriedad."
  },
  {
    id: 8,
    title: "Tenga paciencia con su recuperación.",
    description: "La recuperación es un proceso, no un evento. Sea compasivo consigo mismo.",
    deepExplanation: "Los problemas creados durante años de adicción no se resuelven de la noche a la mañana. Con tiempo, honestidad y perseverancia, la paz mental y la libertad regresan."
  }
];

export const OFFICIAL_WEBSITES: OfficialWebsite[] = [
  {
    id: "es",
    country: "España",
    name: "Jugadores Anónimos España",
    url: "https://jugadoresanonimos.org",
    phone: "+34 670 691 513",
    email: "info@jugadoresanonimos.org",
    flag: "🇪🇸"
  },
  {
    id: "co",
    country: "Colombia",
    name: "Jugadores Anónimos Colombia",
    url: "https://jugadoresanonimoscolombia.org",
    phone: "+57 311 262 4913",
    email: "contacto@jugadoresanonimoscolombia.org",
    flag: "🇨🇴"
  },
  {
    id: "mx",
    country: "México",
    name: "Jugadores Anónimos México",
    url: "https://jugadoresanonimosmexico.org",
    phone: "+52 55 5584 7566",
    email: "ayuda@jugadoresanonimosmexico.org",
    flag: "🇲🇽"
  },
  {
    id: "ar",
    country: "Argentina",
    name: "Jugadores Anónimos Argentina",
    url: "https://jugadoresanonimos.org.ar",
    phone: "+54 11 4328 1111",
    email: "info@jugadoresanonimos.org.ar",
    flag: "🇦🇷"
  },
  {
    id: "cl",
    country: "Chile",
    name: "Jugadores Anónimos Chile",
    url: "https://jugadoresanonimos.cl",
    phone: "+56 9 7378 1234",
    email: "contacto@jugadoresanonimos.cl",
    flag: "🇨🇱"
  },
  {
    id: "uy",
    country: "Uruguay",
    name: "Jugadores Anónimos Uruguay",
    url: "https://jugadoresanonimos.org.uy",
    phone: "+598 94 444 888",
    email: "info@jugadoresanonimos.org.uy",
    flag: "🇺🇾"
  },
  {
    id: "pe",
    country: "Perú",
    name: "Jugadores Anónimos Perú",
    url: "https://jugadoresanonimosperu.org",
    phone: "+51 987 654 321",
    email: "ayuda@jugadoresanonimosperu.org",
    flag: "🇵🇪"
  },
  {
    id: "intl",
    country: "Internacional (J.A.)",
    name: "Jugadores Anónimos Internacional",
    url: "https://gamblersanonymous.org",
    phone: "+1 855 222 5542",
    email: "isomail@gamblersanonymous.org",
    flag: "🌐"
  }
];

/**
 * Datos oficiales de reuniones Presenciales y en línea (Zoom)
 * Cargados exclusivamente desde los registros provistos.
 */
export const MEETINGS_DATA: Meeting[] = [
  ...ZOOM_MEETINGS,
  ...IN_PERSON_MEETINGS
];

export const TWENTY_QUESTIONS: TwentyQuestion[] = [
  { id: 1, text: "¿Alguna vez ha perdido tiempo de trabajo o de clases debido al juego?" },
  { id: 2, text: "¿Ha causado el juego alguna vez infelicidad en su vida hogareña?" },
  { id: 3, text: "¿Ha afectado el juego a su reputación?" },
  { id: 4, text: "¿Ha sentido alguna vez remordimiento después de jugar?" },
  { id: 5, text: "¿Ha jugado alguna vez para obtener dinero con el que pagar deudas o resolver dificultades financieras?" },
  { id: 6, text: "¿Hizo el juego que disminuyera su ambición o su eficiencia?" },
  { id: 7, text: "¿Después de perder, sintió que debía volver tan pronto como fuera posible para recuperar sus pérdidas?" },
  { id: 8, text: "¿Después de ganar, sintió una fuerte urgencia de volver para ganar más?" },
  { id: 9, text: "¿Apostaba frecuentemente hasta perder su último centavo?" },
  { id: 10, text: "¿Pidió alguna vez dinero prestado para financiar su juego?" },
  { id: 11, text: "¿Ha vendido alguna vez pertenencias para financiar el juego?" },
  { id: 12, text: "¿Se mostró reacio a usar 'dinero del juego' para los gastos normales del hogar?" },
  { id: 13, text: "¿Hizo el juego que se despreocupara por su propio bienestar o el de su familia?" },
  { id: 14, text: "¿Ha jugado alguna vez por más tiempo del que había planeado?" },
  { id: 15, text: "¿Ha jugado alguna vez para escapar de una preocupación, aburrimiento, soledad o problemas?" },
  { id: 16, text: "¿Ha cometido alguna vez, o pensado cometer, un acto ilegal para financiar el juego?" },
  { id: 17, text: "¿Le causó el juego dificultades para dormir?" },
  { id: 18, text: "¿Hicieron las discusiones, desilusiones o frustraciones que tuviera ganas de jugar?" },
  { id: 19, text: "¿Sintió alguna vez una urgencia por celebrar alguna buena noticia con unas pocas horas de juego?" },
  { id: 20, text: "¿Ha considerado alguna vez la autodestrucción o el suicidio como resultado del juego?" }
];

export const TWELVE_STEPS_RECOVERY: StepItem[] = [
  {
    number: 1,
    title: "Paso Uno",
    description: "Admitimos que éramos impotentes ante el juego, que nuestras vidas se habían vuelto ingobernables."
  },
  {
    number: 2,
    title: "Paso Dos",
    description: "Llegamos a creer que un Poder Superior a nosotros mismos podría devolvernos el sano juicio."
  },
  {
    number: 3,
    title: "Paso Tres",
    description: "Decidimos poner nuestra voluntad y nuestras vidas al cuidado de Dios, tal como nosotros lo concebimos."
  },
  {
    number: 4,
    title: "Paso Cuatro",
    description: "Sin temor, hicimos un minucioso inventario moral y financiero de nosotros mismos."
  },
  {
    number: 5,
    title: "Paso Cinco",
    description: "Admitimos ante Dios, ante nosotros mismos y ante otro ser humano, la naturaleza exacta de nuestras faltas."
  },
  {
    number: 6,
    title: "Paso Seis",
    description: "Estuvimos enteramente dispuestos a dejar que Dios eliminara todos estos defectos de carácter."
  },
  {
    number: 7,
    title: "Paso Siete",
    description: "Humildemente le pedimos que nos librase de nuestras culpas."
  },
  {
    number: 8,
    title: "Paso Ocho",
    description: "Hicimos una lista de todas aquellas personas a quienes habíamos ofendido y estuvimos dispuestos a reparar el daño causado."
  },
  {
    number: 9,
    title: "Paso Nueve",
    description: "Reparamos directamente a cuantos nos fue posible el daño causado, excepto cuando el hacerlo implicaba perjuicio para ellos o para otros."
  },
  {
    number: 10,
    title: "Paso Diez",
    description: "Continuamos haciendo nuestro inventario personal y cuando nos equivocábamos lo admitíamos inmediatamente."
  },
  {
    number: 11,
    title: "Paso Once",
    description: "Buscamos a través de la oración y la meditación mejorar nuestro contacto consciente con Dios, tal como lo concebimos, pidiéndole solamente conocer su voluntad para con nosotros y la fortaleza para cumplirla."
  },
  {
    number: 12,
    title: "Paso Doce",
    description: "Habiendo experimentado un despertar espiritual como resultado de estos pasos, tratamos de llevar este mensaje a otros jugadores compulsivos y practicar estos principios en todos nuestros asuntos."
  }
];

export const TWELVE_STEPS_UNITY: StepItem[] = [
  {
    number: 1,
    title: "Unidad 1",
    description: "Nuestro bienestar común debe tener la preferencia; la recuperación individual depende de la unidad de Jugadores Anónimos."
  },
  {
    number: 2,
    title: "Unidad 2",
    description: "Para el propósito de nuestro grupo solo existe una autoridad fundamental: un Dios amoroso tal como se exprese en la conciencia de nuestro grupo."
  },
  {
    number: 3,
    title: "Unidad 3",
    description: "El único requisito para ser miembro de Jugadores Anónimos es el deseo de dejar de jugar."
  },
  {
    number: 4,
    title: "Unidad 4",
    description: "Cada grupo debe ser autónomo, excepto en asuntos que afecten a otros grupos o a Jugadores Anónimos en su totalidad."
  },
  {
    number: 5,
    title: "Unidad 5",
    description: "Jugadores Anónimos tiene un solo objetivo primordial: llevar el mensaje al jugador compulsivo que aún sufre."
  },
  {
    number: 6,
    title: "Unidad 6",
    description: "Un grupo de J.A. nunca debe respaldar, financiar o prestar el nombre de J.A. a ninguna entidad allegada o empresa ajena."
  },
  {
    number: 7,
    title: "Unidad 7",
    description: "Todo grupo de J.A. debe mantenerse completamente a sí mismo, negándose a recibir contribuciones de afuera."
  },
  {
    number: 8,
    title: "Unidad 8",
    description: "Jugadores Anónimos nunca tendrá carácter profesional, pero nuestros centros de servicio pueden emplear trabajadores especiales."
  },
  {
    number: 9,
    title: "Unidad 9",
    description: "J.A. como tal nunca debe ser organizada; pero podemos crear juntas o comités de servicio directamente responsables ante aquellos a quienes sirven."
  },
  {
    number: 10,
    title: "Unidad 10",
    description: "Jugadores Anónimos no tiene opinión sobre asuntos ajenos a sus actividades; por consiguiente, su nombre nunca debe mezclarse en polémicas públicas."
  },
  {
    number: 11,
    title: "Unidad 11",
    description: "Nuestra política de relaciones públicas se basa en la atracción más que en la promoción; debemos mantener siempre el anonimato personal ante la prensa, la radio, el cine y la televisión."
  },
  {
    number: 12,
    title: "Unidad 12",
    description: "El anonimato es la base espiritual de todas nuestras tradiciones, recordándonos siempre anteponer los principios a las personalidades."
  }
];
