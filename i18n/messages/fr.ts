import type { MessageTree } from './en'

export const frMessages: MessageTree = {
  meta: {
    title: 'Avis : la vidéo peut enfreindre les Règles de la communauté',
    description:
      'Votre Page a publié une vidéo qui peut enfreindre les Règles de la communauté : contenu dangereux, droits d’auteur, informations trompeuses ou spam. Examinez la vidéo, modifiez ou supprimez les segments concernés, respectez les Règles et envoyez une demande d’examen avec une description exacte.',
    ogTitle: 'Règles de la communauté — Examen de vidéo',
  },
  main: {
    title: 'Votre Page a publié une vidéo qui peut enfreindre les Règles de la communauté',
    p1: 'Nous avons enregistré des signalements et/ou des résultats de vérification automatique pour au moins une vidéo sur votre Page. En attendant une décision finale, certaines fonctions d’affichage ou de distribution peuvent être temporairement limitées pour protéger la communauté.',
    p2: 'Si vous pensez qu’il s’agit d’une **erreur** ou souhaitez fournir une explication formelle, utilisez **Envoyer une demande d’examen** ci-dessous — c’est le **seul canal officiel** sur cette page pour déposer un dossier et le lier à votre référence.',
    ticketLine: 'Référence du dossier :',
    ticketHint: 'Conservez ce code en cas de contact avec l’assistance.',
    summaryTitle: 'Résumé des motifs possibles (référence)',
    summaryBody:
      'Fréquent : contenu non conforme aux Règles, mentions de droits d’auteur, informations trompeuses ou signalements d’utilisateurs. Les détails seront vérifiés pendant l’examen après envoi du dossier.',
    ctaHeadline: 'Terminez une demande d’examen pour éviter des restrictions prolongées',
    ctaSubline: 'Processus standard · aucun frais via ce bouton · données traitées dans une session sécurisée',
    ctaButton: 'Envoyer une demande d’examen',
    ctaFootnote:
      'Délai de réponse habituel : **24 à 72 heures ouvrables** (plus long si des informations supplémentaires sont nécessaires). Un dossier valide aide à prioriser la file.',
    navHelp: 'Centre d’aide',
    navPrivacy: 'Politique de confidentialité',
    navTerms: 'Conditions d’utilisation',
    navCommunity: 'Règles de la communauté',
    navMeta: 'Meta © {year}',
  },
  captcha: {
    notRobot: 'Je ne suis pas un robot',
    p1: 'Cela nous aide à lutter contre les comportements nuisibles, à détecter et prévenir le spam et à préserver l’intégrité de nos produits.',
    p2: 'Nous utilisons reCAPTCHA Enterprise de Google pour cette vérification de sécurité. Son utilisation est soumise à la Politique de confidentialité et aux Conditions d’utilisation de Google.',
    p3: 'reCAPTCHA Enterprise collecte des informations matérielles et logicielles et les envoie à Google pour fournir, maintenir et améliorer le service et à des fins de sécurité générale. Google n’utilise pas ces données pour la publicité personnalisée.',
    privacyTerms: 'Confidentialité - Conditions',
  },
  i18nSwitcher: 'Langue',
}
