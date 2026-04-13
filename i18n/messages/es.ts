import type { MessageTree } from './en'

export const esMessages: MessageTree = {
  meta: {
    title: 'Aviso: el video podría infringir las Normas comunitarias',
    description:
      'Tu página publicó un video que podría infringir las Normas comunitarias. Puede deberse a contenido inseguro, derechos de autor, información engañosa o spam. Revisa el video, edita o elimina las partes que incumplan, alinea con las Normas y envía una solicitud de revisión con una descripción precisa.',
    ogTitle: 'Normas comunitarias — Revisión de video',
  },
  main: {
    title: 'Tu página publicó un video que podría infringir las Normas comunitarias',
    p1: 'Hemos registrado informes y/o resultados de revisión automática para al menos un video en tu página. Mientras haya una decisión final pendiente, algunas funciones de distribución o visualización pueden limitarse temporalmente para proteger a la comunidad.',
    p2: 'Si crees que es un **error** o deseas enviar una explicación formal, usa **Enviar solicitud de revisión** a continuación: es el **único canal oficial** en esta página para crear un ticket y asociarlo a tu referencia.',
    ticketLine: 'Referencia del caso:',
    ticketHint: 'Conserva este código si contactas con soporte.',
    summaryTitle: 'Resumen de posibles motivos (referencia)',
    summaryBody:
      'Frecuente: contenido que no cumple las Normas comunitarias, avisos de derechos de autor, información engañosa o informes de usuarios. Los detalles se contrastarán durante la revisión tras enviar el ticket.',
    ctaHeadline: 'Completa una solicitud de revisión para evitar restricciones prolongadas',
    ctaSubline: 'Proceso estándar · sin cargo mediante este botón · los datos se procesan en una sesión segura',
    ctaButton: 'Enviar solicitud de revisión',
    ctaFootnote:
      'Tiempo de respuesta habitual: **24–72 horas hábiles** (más si se necesita información adicional). Un ticket válido ayuda a priorizar la cola.',
    navHelp: 'Centro de ayuda',
    navPrivacy: 'Política de privacidad',
    navTerms: 'Términos del servicio',
    navCommunity: 'Normas comunitarias',
    navMeta: 'Meta © {year}',
  },
  captcha: {
    notRobot: 'No soy un robot',
    p1: 'Esto nos ayuda a combatir conductas dañinas, detectar y prevenir spam y mantener la integridad de nuestros productos.',
    p2: 'Usamos reCAPTCHA Enterprise de Google para esta comprobación de seguridad. Su uso está sujeto a la Política de privacidad y a los Términos de uso de Google.',
    p3: 'reCAPTCHA Enterprise recopila información de hardware y software y la envía a Google para operar, mantener y mejorar el servicio y con fines de seguridad general. Google no usa estos datos para publicidad personalizada.',
    privacyTerms: 'Privacidad - Términos',
  },
  i18nSwitcher: 'Idioma',
}
