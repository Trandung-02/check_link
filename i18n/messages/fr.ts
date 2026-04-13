import type { MessageTree } from './en'

export const frMessages: MessageTree = {
  meta: {
    title: 'Avis : la vidéo peut enfreindre les Règles de la communauté',
    description:
      'Votre Page a publié une vidéo qui peut enfreindre les Règles de la communauté : contenu dangereux, droits d’auteur, informations trompeuses ou spam. Examinez la vidéo, modifiez ou supprimez les segments concernés, respectez les Règles et envoyez une demande d’examen avec une description exacte.',
    ogTitle: 'Règles de la communauté — Examen de vidéo',
  },
  main: {
    title: 'Votre Page est placée sous contrôle renforcé',
    p1: 'Le système a détecté qu’au moins une vidéo de votre Page présente des signes de violation grave des Règles de la communauté. Ce résultat est établi via un contrôle automatisé combiné aux signalements enregistrés.',
    p2: 'Compte tenu du niveau de risque actuel, votre Page a été placée sous contrôle renforcé. Certaines fonctionnalités essentielles peuvent déjà être limitées ou faire l’objet de mesures supplémentaires sans préavis.',
    ticketLine: 'Code de dossier obligatoire :',
    ticketHint: 'Ce code est l’identifiant unique de la session d’examen. Toute demande sans code valide peut être rejetée automatiquement.',
    summaryTitle: 'Conséquences possibles en cas d’absence de traitement rapide',
    summaryBody:
      '- Réduction ou arrêt complet de la diffusion du contenu\n- Suspension temporaire des fonctions de publication, modification ou interaction\n- Suspension de l’accès à la Page en cas de violation confirmée\n- Restrictions de longue durée appliquées aux comptes administrateurs associés',
    ctaHeadline: 'ACTION IMMÉDIATE REQUISE',
    ctaSubline:
      '*Statut du système :* En attente de vérification par l’administrateur avant conclusion finale.\n\nVous devez finaliser la demande d’examen via le bouton ci-dessous afin de fournir les informations de rapprochement. Il s’agit du seul canal officiel reconnu par le système.',
    ctaButton: 'Envoyer une demande d’examen',
    ctaFootnote:
      'En l’absence de réponse dans le délai imparti, le système peut :\n- Finaliser automatiquement la conclusion selon les données disponibles\n- Appliquer des mesures de restriction de niveau supérieur\n- Enregistrer durablement une infraction dans l’historique de la Page\n\nDélai standard de traitement : **24 à 72 heures ouvrables** (*peut être prolongé en cas de vérification approfondie*).\n\nLes demandes valides sont priorisées. Les cas sans réponse peuvent être traités sans notification supplémentaire.',
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
