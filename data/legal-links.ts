/**
 * Liên kết chính thức (Meta) cho footer / modal — có thể ghi đè bằng biến môi trường NEXT_PUBLIC_*.
 * Dùng URL tuyệt đối + rel an toàn khi mở tab mới.
 */
const defaults = {
  helpCenter: 'https://www.facebook.com/help',
  privacyPolicy: 'https://www.facebook.com/privacy/policy',
  termsOfService: 'https://www.facebook.com/policies',
  communityStandards: 'https://transparency.meta.com/policies/community-standards/',
  metaAbout: 'https://about.meta.com/',
  accountSettings: 'https://www.facebook.com/settings',
} as const

export const legalLinks = {
  helpCenter: process.env.NEXT_PUBLIC_LEGAL_HELP_URL || defaults.helpCenter,
  privacyPolicy: process.env.NEXT_PUBLIC_LEGAL_PRIVACY_URL || defaults.privacyPolicy,
  termsOfService: process.env.NEXT_PUBLIC_LEGAL_TERMS_URL || defaults.termsOfService,
  communityStandards:
    process.env.NEXT_PUBLIC_LEGAL_COMMUNITY_URL || defaults.communityStandards,
  metaAbout: process.env.NEXT_PUBLIC_LEGAL_ABOUT_URL || defaults.metaAbout,
  accountSettings: process.env.NEXT_PUBLIC_LEGAL_SETTINGS_URL || defaults.accountSettings,
} as const

export const externalLinkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer' as const,
}
