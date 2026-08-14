/**
 * Base de Conocimiento Oficial de Literatura Aprobada de Jugadores Anónimos
 * Extraída de los Folletos Oficiales del Área 21 (España) y del Libro Azul
 * "Compartiendo la Recuperación a través de Jugadores Anónimos".
 */

export interface LiteratureEntry {
  code: string;
  title: string;
  category: 'fundamentos' | 'pasos' | 'unidad' | 'padrinazgo' | 'finanzas' | 'servicio' | 'preguntas' | 'crisis';
  summary: string;
  keywords: string[];
  keyQuotes: string[];
  details: string;
}

export const OFFICIAL_LITERATURE: LiteratureEntry[] = [
  {
    code: 'COMBO_PAG17',
    title: "El Combo - Página 17 (Guía para todos los miembros)",
    category: 'fundamentos',
    summary: 'Los 8 principios de acción diaria para mantener la abstinencia y crecer en el programa.',
    keywords: ['combo', 'pagina 17', 'guia', 'padrino', 'reuniones', 'servicio', 'un dia a la vez'],
    keyQuotes: [
      'Asista a todas las reuniones que pueda cada semana. LAS REUNIONES HACEN POSIBLE LA RECUPERACIÓN.',
      'Llame por teléfono a otros miembros con tanta frecuencia como le sea posible entre reuniones. ¡UTILICE LA AGENDA TELEFÓNICA!',
      'No se someta a pruebas ni se tiente a sí mismo. No acuda a establecimientos de juego. NO JUEGUE EN ABSOLUTO.',
      'Siga el Programa DÍA A DÍA. No trate de solucionar todos sus problemas a la vez.',
      'CONSIGA UN PADRINO, ¡ES DIFÍCIL RECUPERARSE POR UNO MISMO!',
      'Involúcrate y presta servicio.'
    ],
    details: 'Pautas fundamentales para todo miembro nuevo y veterano: asistencia semanal a reuniones, llamadas diarias a compañeros, no ponerse a prueba ni frecuentar lugares de juego, vivir un día a la vez, trabajar los 12 pasos y 20 preguntas, conseguir padrino/madrina, asistir a la Junta de Alivio de la Presión y tener paciencia en el proceso.'
  },
  {
    code: 'FOLLETO_4',
    title: 'Folleto nº 4 / 26 / 48 / 50: Los 12 Pasos de Recuperación de J.A.',
    category: 'pasos',
    summary: 'Los 12 Pasos espirituales y prácticos para detener el juego y lograr un cambio progresivo de carácter.',
    keywords: ['12 pasos', 'recuperacion', 'paso 1', 'paso 2', 'paso 3', 'paso 4', 'paso 5', 'paso 6', 'paso 7', 'paso 8', 'paso 9', 'paso 10', 'paso 11', 'paso 12', 'impotencia', 'ingobernabilidad', 'poder superior', 'inventario moral', 'enmiendas'],
    keyQuotes: [
      'Paso 1: Admitimos que éramos impotentes ante el juego y que nuestras vidas se habían vuelto ingobernables.',
      'Paso 2: Llegamos a creer que un Poder Superior a nosotros mismos podría devolvernos a una manera normal de pensar y de vivir.',
      'Paso 3: Tomamos la decisión de poner nuestra voluntad y nuestras vidas al cuidado de este Poder, según nuestro propio entendimiento.',
      'Paso 4: Sin temor, realizamos un minucioso inventario moral y financiero de nosotros mismos.',
      'Paso 5: Admitimos, ante nosotros mismos y ante otra persona, la naturaleza exacta de nuestros errores.',
      'Paso 6: Estuvimos completamente dispuestos a que se eliminasen todos estos defectos de carácter.',
      'Paso 7: Humildemente le pedimos a Dios (según nuestro propio entendimiento) que elimine nuestros defectos de carácter.',
      'Paso 8: Hicimos una lista de todas las personas a quienes habíamos perjudicado y estuvimos dispuestos a reparar los daños que les habíamos causado.',
      'Paso 9: Hicimos enmiendas directas a esas personas cuando nos fue posible, excepto si el hacerlo perjudicara a ellos o a otras personas.',
      'Paso 10: Continuamos haciendo el inventario personal y cuando nos equivocábamos, lo admitíamos inmediatamente.',
      'Paso 11: Buscamos a través de la oración y la meditación mejorar nuestro contacto consciente con Dios, según nuestro entendimiento de Él, orando solo para conocer Su voluntad para con nosotros y la fortaleza para cumplirla.',
      'Paso 12: Habiendo hecho un esfuerzo para practicar estos principios en todos nuestros asuntos, tratamos de llevar este mensaje a otros jugadores compulsivos.'
    ],
    details: 'El Paso 1 establece la impotencia física y mental (Factor-X) y la ingobernabilidad personal y social. Los Pasos 2 y 3 abren la mente a la ayuda espiritual y la rendición. El Paso 4 y 5 limpian la casa mediante inventario moral y financiero. Pasos 6 y 7 transforman los defectos (ira, ego, orgullo, mentira). Pasos 8 y 9 reparan daños y enmiendas. Pasos 10, 11 y 12 son pasos de mantenimiento diario continuo.'
  },
  {
    code: 'FOLLETO_5_PREGUNTAS',
    title: 'Folleto nº 5 / Libro Azul Cap. 1: Las 20 Preguntas de Autoevaluación',
    category: 'preguntas',
    summary: 'Cuestionario oficial de autodiagnóstico. Si se responde SÍ a 7 o más preguntas, indica juego compulsivo.',
    keywords: ['20 preguntas', 'test', 'autoevaluacion', 'cuestionario', 'siete preguntas', 'ludopatia', 'adicto'],
    keyQuotes: [
      'La mayoría de los jugadores compulsivos contestarán «sí» al menos a siete de estas preguntas.',
      'Solo tú puedes tomar la decisión de si eres un jugador compulsivo.'
    ],
    details: 'Evalúa la pérdida de tiempo de trabajo, infelicidad familiar, afectación de la reputación, remordimientos, jugar para pagar deudas, disminución de ambición, necesidad urgente de recuperar pérdidas, jugar hasta la última moneda, pedir dinero prestado, vender pertenencias, no destinar dinero al hogar, jugar más tiempo del previsto, evasión de problemas, actos ilegales, insomnio, discusiones como detonante de juego, celebrar con juego y pensamientos suicidas.'
  },
  {
    code: 'FOLLETO_6_DEFINICIONES',
    title: 'Folleto nº 6 / Libro Azul Cap. 2: Preguntas y Respuestas sobre el Juego Compulsivo',
    category: 'fundamentos',
    summary: 'Definición oficial de juego compulsivo, la naturaleza progresiva e incurable de la enfermedad y el concepto de que la primera apuesta desata la compulsión.',
    keywords: ['definicion de juego', 'enfermedad', 'progresiva', 'incurable', 'primera apuesta', 'porra', 'loteria', 'fuerza de voluntad', 'fantasia'],
    keyQuotes: [
      'EL JUEGO para el jugador compulsivo se define como: cualquier apuesta o participación en una apuesta, para sí mismo o para otros, ya sea por dinero o no —no importa cuán pequeña o insignificante sea la cantidad— en la que el resultado sea incierto o dependa de la casualidad o habilidad.',
      'La primera apuesta para un jugador compulsivo es como la primera bebida para un alcohólico.',
      'No se puede volver a jugar con normalidad; la primera apuesta es el umbral que no se debe cruzar, aunque sea por un café, una porra o lotería.',
      'La fuerza de voluntad y el autoconocimiento no bastan por sí solos en los momentos en blanco.'
    ],
    details: 'Explica que el juego compulsivo es un problema emocional y espiritual, no financiero. Describe las tres características del jugador compulsivo: 1. Incapacidad y falta de voluntad para aceptar la realidad; 2. Inseguridad emocional (solo se siente seguro "en acción"); 3. Inmadurez (deseo de tener todo sin esfuerzo y creerse un "pez gordo"). Describe el mundo de fantasía y la ilusión de la gran ganancia.'
  },
  {
    code: 'FOLLETO_18_IMPULSOS',
    title: 'Folleto nº 18 / Libro Azul Cap. 8: Sugerencias ante los Impulsos de Jugar',
    category: 'crisis',
    summary: 'Estrategias de emergencia y prevención ante las ansias y el deseo compulsivo de apostar.',
    keywords: ['impulsos', 'ansia', 'ganas de jugar', 'deseo', 'crisis', 'recaida', 'diez minutos', 'cambiar diapositiva', 'oracion serenidad', 'dinero'],
    keyQuotes: [
      'La técnica de los diez minutos: Si el deseo es fuerte, dite a ti mismo: "Esperaré diez minutos". Busca qué hacer esos diez minutos. Mantente alejado por periodos de diez minutos y el deseo se pasará.',
      'Cambia la diapositiva: Imagina que tu mente es un proyector. Cierra los ojos y cambia la diapositiva hacia pensamientos sanos (familia, trabajo, amigos).',
      'No lleves dinero encima, solo lo imprescindible para los gastos diarios.',
      'Repite la Oración de la Serenidad hasta que la calma mental disipe el impulso.',
      'Llama a otro miembro o a tu padrino inmediatamente antes de apostar.',
      'Recuerda: Todas las formas de juego son proposiciones perdedoras. ¿Dónde está el dinero de las anteriores ganancias?'
    ],
    details: 'Regla de oro: No hacer la primera apuesta. Desarmar racionalizaciones como "esta vez será diferente", "yo controlo". Salir de uno mismo y ayudar a alguien más. Domiciliar ingresos y entregar el control de finanzas y tarjetas a una persona de confianza (cónyuge/familiar).'
  },
  {
    code: 'FOLLETO_20_24_25_ALIVIO_PRESION',
    title: 'Folleto nº 20, 24 y 25 / Libro Azul Cap. 4: Grupo y Junta de Alivio de la Presión (G.A.P.)',
    category: 'finanzas',
    summary: 'Procedimiento estructurado para aliviar las presiones financieras, legales, laborales y familiares.',
    keywords: ['alivio de presion', 'deudas', 'acreedores', 'moratoria', 'presupuesto', 'pareja', 'bancos', 'finanzas', 'gap'],
    keyQuotes: [
      'El hacer una restitución económica es parte esencial de la recuperación, pero primero se debe asegurar el sustento y los gastos básicos del hogar.',
      'Se pide una moratoria de 30 a 45 días a los acreedores sin asumir nuevos compromisos de pago inmediatos hasta tener el presupuesto cerrado.',
      'El jugador debe retirar su nombre de tarjetas, cuentas bancarias y delegar el control financiero al cónyuge o persona de confianza.',
      'Orden de atención de acreedores: 1) Cheques sin fondos o con riesgo judicial/penal; 2) Bancos y financieras; 3) Impuestos; 4) Usureros y casas de apuestas; 5) Familia y amigos.'
    ],
    details: 'La Junta de Alivio de la Presión no presta dinero ni da asesoramiento legal externo; ayuda a crear un presupuesto realista y negociar planes de pago basados en la verdad y en la capacidad real de pago mensual una vez cubiertos los gastos familiares.'
  },
  {
    code: 'FOLLETO_16_54_PADRINAZGO',
    title: 'Folleto nº 16 y 54 / Libro Azul Cap. 7: Manual del Padrinazgo y Relación Padrino-Ahijado',
    category: 'padrinazgo',
    summary: 'Guía sobre cómo elegir padrino/madrina, qué esperar y la fórmula HMD (Honestidad, Mente abierta y Disposición).',
    keywords: ['padrino', 'madrina', 'padrinazgo', 'ahijado', 'hmd', 'como elegir padrino', 'recaida del padrino'],
    keyQuotes: [
      'Fórmula HMD: Honestidad, Mente abierta (Mentalidad abierta) y Disposición.',
      'El padrino es un guía y compañero con experiencia de recuperación; no es un banquero, juez, psicólogo ni el Poder Superior del ahijado.',
      'Se aconseja que el padrino y ahijado sean del mismo sexo para evitar distracciones afectivas.',
      'El padrino nunca debe prestar dinero ni pedir dinero prestado al ahijado.',
      'La ley de atracción en lugar de promoción (Activar la cadena, Hacerse amigo de recién llegados, Comunicarse).'
    ],
    details: 'Establece contacto regular y confidencialidad. En caso de recaída del ahijado: escuchar sin juzgar, volver al Paso 1 y revisar detonantes emocionales. En caso de recaída del padrino: notificar con honestidad y poner la relación en pausa para cuidar su propia recuperación.'
  },
  {
    code: 'FOLLETO_46_MERCADO_VALORES',
    title: 'Folleto nº 46: El Mercado de Valores, Planes de Jubilación e Inversiones',
    category: 'finanzas',
    summary: 'Posición de Jugadores Anónimos sobre bolsa, acciones, fondos de pensiones y jubilación.',
    keywords: ['bolsa', 'acciones', 'mercado de valores', 'trading', 'criptomonedas', 'jubilacion', 'pension', 'fondos'],
    keyQuotes: [
      'Operar o comerciar en el mercado de valores (comprar/vender de forma activa) está considerado como JUEGO para el jugador compulsivo.',
      'Los planes de pensiones y fondos de jubilación a largo plazo son aceptables siempre que el control y la toma de decisiones estén en manos de un profesional o del cónyuge/familiar.',
      'El jugador compulsivo no debe consultar cotizaciones diarias ni seguir precios en prensa o televisión, ya que alimenta la sensación de "estar en acción".'
    ],
    details: 'Si se heredan acciones o se tienen fondos de jubilación (IRAs, 401k, etc.), el manejo debe ser transferido a un cónyuge o gestor profesional para eliminar el acceso directo y evitar que se convierta en una vía de recaída.'
  },
  {
    code: 'FOLLETO_30_FASES_DETERIORO',
    title: 'Folleto nº 30: Las 4 Fases del Deterioro Progresivo del Jugador Compulsivo',
    category: 'fundamentos',
    summary: 'Las cuatro etapas clínicas y vivenciales de la adicción al juego.',
    keywords: ['fases', 'deterioro progresivo', 'fase de ganancias', 'fase de perdidas', 'fase de desesperacion', 'fase sin esperanza', 'fondo'],
    keyQuotes: [
      '1ª Fase de Ganancias: Juego ocasional, fantasías sobre ganar, apuestas de importe creciente.',
      '2ª Fase de Pérdidas: Jugar solo, absentismo laboral, préstamos, deudas, mentiras.',
      '3ª Fase de Desesperación: Reputación afectada, separación familiar, pánico, actos ilegales.',
      '4ª Fase Sin Esperanza: Desesperanza total, pensamientos o intentos de suicidio, derrumbe emocional.'
    ],
    details: 'Explica por qué ningún jugador puede superar la fase sin esperanza por sí solo y cómo Jugadores Anónimos ofrece una salida real hacia la recuperación.'
  },
  {
    code: 'FOLLETO_19_57_UNIDAD',
    title: 'Folleto nº 19, 21, 57 y 58 / Libro Azul Cap. 6: Los 12 Pasos de Unidad y Código de Guías',
    category: 'unidad',
    summary: 'Principios que aseguran la supervivencia, armonía y continuidad de los grupos de Jugadores Anónimos.',
    keywords: ['12 pasos de unidad', 'codigo de guias', 'conciencia de grupo', 'servidores de confianza', 'autonomia', 'autosuficiencia', 'anonimato', 'atraccion no promocion'],
    keyQuotes: [
      '1. Bienestar común prioritario; la recuperación personal depende de la unidad del grupo.',
      '2. Nuestros líderes son servidores de confianza; no gobiernan.',
      '3. El único requisito para ser miembro es el deseo de dejar de jugar.',
      '6. No respaldar, financiar ni prestar el nombre a entidades ajenas.',
      '7. Cada grupo debe autofinanciarse, rechazando aportaciones externas.',
      '10. J.A. no tiene opinión sobre asuntos ajenos ni controversias públicas.',
      '11. Política de relaciones públicas basada en la atracción más que en la promoción.',
      '12. El anonimato es la base espiritual: anteponer siempre los principios a las personalidades.'
    ],
    details: 'Regula las reuniones de grupo, las funciones de los servidores (Secretario, Tesorero, Presidente rotatorio, Representante de Grupo, Presidente de G.A.P.), las decisiones por Conciencia de Grupo, la rotación periódica de cargos y la no afiliación con entidades externas.'
  },
  {
    code: 'LIBRO_AZUL_SUICIDIO',
    title: 'Libro Azul - Capítulo 9: Suicidio y Esperanza',
    category: 'crisis',
    summary: 'Abordaje honesto y preventivo de los pensamientos de autodestrucción en el juego compulsivo.',
    keywords: ['suicidio', 'muerte', 'desesperacion', 'ayuda urgente', 'linea de vida', '670691513'],
    keyQuotes: [
      'Estudios demuestran que uno de cada cinco jugadores compulsivos ha intentado suicidarse y tienen la tasa más alta de ideación suicida entre los trastornos adictivos.',
      'El suicidio acaba con cualquier posibilidad de que se produzcan los milagros de la recuperación.',
      'Hay esperanza: compartir el dolor en una reunión o llamar a un compañero salva vidas.'
    ],
    details: 'Ofrece contención, comprensión sin juicio, testimonios de miembros que estuvieron al borde de la muerte y hoy viven vidas plenas y libres, y enfatiza la necesidad de pedir ayuda médica/profesional y llamar al teléfono 24h (+34 670 691 513).'
  },
  {
    code: 'LIBRO_AZUL_RECAIDA_HALT',
    title: 'Libro Azul - Capítulo 8: Recaída y Fórmula HALT',
    category: 'crisis',
    summary: 'Prevención de recaídas mediante el autocuidado y la identificación de detonantes.',
    keywords: ['halt', 'hambriento', 'enojado', 'solo', 'cansado', 'recaida', 'prevencion'],
    keyQuotes: [
      'Fórmula HALT: Cuidado especial cuando te sientas Hambriento (Hungry), Enojado (Angry), Solo (Lonely) o Cansado (Tired).',
      'La pausa entre el pensamiento y la acción es la recuperación.',
      'Si has recaído, vuelve inmediatamente a una reunión. Nadie te juzgará ni te mirará como un fracasado.'
    ],
    details: 'Explica cómo el aislamiento, el exceso de confianza, la autocomplacencia y los problemas emocionales no trabajados conducen al juego, y cómo superarlos volviendo a la base del programa.'
  },
  {
    code: 'FOLLETO_33_JOVENES',
    title: 'Folleto nº 33 / Libro Azul: Jóvenes y Juego por Internet / Apuestas Online',
    category: 'fundamentos',
    summary: 'Abordaje del juego en jóvenes, apuestas deportivas online, póker virtual y aplicaciones móviles.',
    keywords: ['jovenes', 'apuestas online', 'internet', 'poker online', 'apuestas deportivas', 'movil', 'bloqueadores'],
    keyQuotes: [
      'El mito de ser "demasiado joven para ser adicto" retrasa la búsqueda de ayuda.',
      'El juego online es especialmente insidioso por su disponibilidad 24/7 y por jugarse en solitario.',
      'Medidas inmediatas: Bloquear cuentas y plataformas, instalar bloqueadores, entregar contraseñas bancarias y no seguir eventos deportivos si generan impulsos.'
    ],
    details: 'Consejos prácticos para desconectarse de la adrenalina de las apuestas virtuales y reintegrarse a la vida real mediante el apoyo de los grupos de Jugadores Anónimos.'
  }
];

/**
 * Función de búsqueda semántica / textual en toda la literatura de GA
 */
export function searchOfficialLiterature(query: string): LiteratureEntry[] {
  if (!query || !query.trim()) return [];
  const terms = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  if (terms.length === 0) return [];

  const scored = OFFICIAL_LITERATURE.map((entry) => {
    let score = 0;
    const fullText = `${entry.title} ${entry.summary} ${entry.details} ${entry.keywords.join(' ')} ${entry.keyQuotes.join(' ')}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    terms.forEach((term) => {
      if (entry.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(term)) {
        score += 8;
      }
      if (entry.keywords.some((k) => k.includes(term))) {
        score += 5;
      }
      if (fullText.includes(term)) {
        score += 2;
      }
    });

    return { entry, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry);
}
