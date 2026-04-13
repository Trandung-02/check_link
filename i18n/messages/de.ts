import type { MessageTree } from './en'

export const deMessages: MessageTree = {
  meta: {
    title: 'Hinweis: Video kann gegen Community-Richtlinien verstoßen',
    description:
      'Auf Ihrer Seite wurde ein Video veröffentlicht, das gegen Community-Richtlinien verstoßen könnte. Gründe können unsichere Inhalte, Urheberrecht, irreführende Informationen oder Spam sein. Prüfen Sie das Video, entfernen oder bearbeiten Sie problematische Teile, orientieren Sie sich an den Richtlinien und reichen Sie eine Überprüfungsanfrage mit korrekter Beschreibung ein.',
    ogTitle: 'Community-Richtlinien — Videoprüfung',
  },
  main: {
    title: 'Ihre Seite steht unter verstärkter Kontrolle',
    p1: 'Das System hat festgestellt, dass mindestens ein Video auf Ihrer Seite Anzeichen eines schwerwiegenden Verstoßes gegen die Community-Richtlinien aufweist. Dieses Ergebnis wurde durch automatische Prüfung in Kombination mit erfassten Meldedaten ermittelt.',
    p2: 'Aufgrund des aktuellen Risikoniveaus wurde Ihre Seite unter verstärkte Kontrolle gestellt. Einige Kernfunktionen können bereits eingeschränkt sein oder ohne vorherige Ankündigung weiteren Kontrollmaßnahmen unterliegen.',
    ticketLine: 'Verpflichtender Fallcode:',
    ticketHint: 'Dieser Code ist die eindeutige Kennung der Prüfsitzung. Anfragen ohne gültigen Code können automatisch abgelehnt werden.',
    summaryTitle: 'Mögliche Folgen bei nicht rechtzeitiger Bearbeitung',
    summaryBody:
      '- Reduzierte oder vollständig gestoppte Inhaltsverbreitung\n- Vorübergehende Sperrung von Funktionen zum Posten, Bearbeiten oder Interagieren\n- Sperrung des Seitenzugriffs bei bestätigten Verstößen\n- Langfristige Einschränkungen für zugehörige Administratorkonten',
    ctaHeadline: 'SOFORTIGES HANDELN ERFORDERLICH',
    ctaSubline:
      '*Systemstatus:* Warten auf Verifizierung durch den Administrator, bevor eine endgültige Entscheidung getroffen wird.\n\nSie müssen die Überprüfungsanfrage über die Schaltfläche unten abschließen, um Abgleichinformationen bereitzustellen. Dies ist der einzige offizielle, vom System anerkannte Bearbeitungskanal.',
    ctaButton: 'Überprüfungsanfrage senden',
    ctaFootnote:
      'Wenn innerhalb der vorgegebenen Frist keine Rückmeldung erfolgt, kann das System:\n- Die Schlussfolgerung automatisch auf Basis vorhandener Daten abschließen\n- Einschränkungen auf höherer Stufe anwenden\n- Einen Verstoß dauerhaft in der Seitenhistorie vermerken\n\nStandardbearbeitungszeit: **24–72 Geschäftsstunden** (*kann sich bei vertiefter Prüfung verlängern*).\n\nGültige Anfragen werden priorisiert. Fälle ohne Rückmeldung können ohne zusätzliche Benachrichtigung bearbeitet werden.',
    navHelp: 'Hilfe-Center',
    navPrivacy: 'Datenschutzrichtlinie',
    navTerms: 'Nutzungsbedingungen',
    navCommunity: 'Community-Richtlinien',
    navMeta: 'Meta © {year}',
  },
  captcha: {
    notRobot: 'Ich bin kein Roboter',
    p1: 'Damit bekämpfen wir schädliches Verhalten, erkennen Spam und wahren die Integrität unserer Produkte.',
    p2: 'Wir verwenden Googles reCAPTCHA Enterprise für diese Sicherheitsprüfung. Die Nutzung unterliegt der Datenschutzerklärung und den Nutzungsbedingungen von Google.',
    p3: 'reCAPTCHA Enterprise erfasst Hardware- und Softwareinformationen und sendet sie an Google zur Bereitstellung, Wartung und Verbesserung sowie zu allgemeinen Sicherheitszwecken. Google nutzt diese Daten nicht für personalisierte Werbung.',
    privacyTerms: 'Datenschutz - Bedingungen',
  },
  i18nSwitcher: 'Sprache',
}
