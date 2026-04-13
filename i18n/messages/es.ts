import type { MessageTree } from './en'

export const esMessages: MessageTree = {
  meta: {
    title: 'Aviso: el video podría infringir las Normas comunitarias',
    description:
      'Tu página publicó un video que podría infringir las Normas comunitarias. Puede deberse a contenido inseguro, derechos de autor, información engañosa o spam. Revisa el video, edita o elimina las partes que incumplan, alinea con las Normas y envía una solicitud de revisión con una descripción precisa.',
    ogTitle: 'Normas comunitarias — Revisión de video',
  },
  main: {
    title: 'Tu página está bajo control reforzado',
    p1: 'El sistema ha detectado que al menos un video de tu página muestra señales de una infracción grave de las Normas comunitarias. Este resultado se determinó mediante revisión automática combinada con datos de reportes registrados.',
    p2: 'Según el nivel de riesgo actual, tu página ha sido puesta bajo control reforzado. Algunas funciones principales pueden estar restringidas o seguir sujetas a medidas adicionales sin aviso previo.',
    ticketLine: 'Código obligatorio del caso:',
    ticketHint: 'Este código es el identificador único de la sesión de revisión. Las solicitudes sin un código válido pueden rechazarse automáticamente.',
    summaryTitle: 'Posibles consecuencias si no se atiende a tiempo',
    summaryBody:
      '- Reducción o suspensión total de la distribución de contenido\n- Bloqueo temporal de funciones para publicar, editar o interactuar\n- Suspensión del acceso a la página si se confirma la infracción\n- Restricciones a largo plazo para cuentas administradoras relacionadas',
    ctaHeadline: 'SE REQUIERE ACCIÓN INMEDIATA',
    ctaSubline:
      '*Estado del sistema:* En espera de verificación del administrador antes de emitir una conclusión final.\n\nDebes completar la solicitud de revisión mediante el botón de abajo para proporcionar información de contraste. Este es el único canal oficial reconocido por el sistema.',
    ctaButton: 'Enviar solicitud de revisión',
    ctaFootnote:
      'Si no respondes dentro del plazo establecido, el sistema puede:\n- Finalizar automáticamente la conclusión con los datos existentes\n- Aplicar restricciones de nivel superior\n- Registrar una infracción de forma permanente en el historial de la página\n\nTiempo estándar de procesamiento: **24–72 horas hábiles** (*puede prolongarse si se requiere verificación avanzada*).\n\nLas solicitudes válidas se priorizan. Los casos sin respuesta pueden procesarse sin aviso adicional.',
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
