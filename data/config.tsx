import { Link } from '@saas-ui/react'
import { Metadata } from 'next'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Account & community resources',
    description:
      'Security review workflows, privacy center navigation, and community standards information.',
  } as Metadata,
  termsUrl: 'https://www.facebook.com/policies',
  privacyUrl: 'https://www.facebook.com/privacy/policy',
  header: {
    links: [
      {
        label: 'Privacy center',
        href: '/privacy-center',
      },
      {
        id: 'benefits',
        label: 'Overview',
      },
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'pricing',
        label: 'Pricing',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Help Center',
        href: 'https://www.facebook.com/help',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        © {new Date().getFullYear()}{' '}
        <Link href="/privacy-center">Account &amp; privacy resources</Link>
      </>
    ),
    links: [
      {
        href: '/privacy-center',
        label: 'Privacy center',
      },
      {
        href: 'https://www.facebook.com/privacy/policy',
        label: 'Privacy Policy',
      },
      {
        href: 'https://www.facebook.com/policies',
        label: 'Terms',
      },
    ],
  },
  signup: {
    title: 'Account security & review',
    features: [
      {
        icon: FiCheck,
        title: 'Guided review',
        description: 'Step-by-step flow to submit information for account-related reviews.',
      },
      {
        icon: FiCheck,
        title: 'Privacy center',
        description: 'Quick access to privacy topics and official policy resources.',
      },
      {
        icon: FiCheck,
        title: 'Community standards',
        description: 'Links to official community standards and help content.',
      },
      {
        icon: FiCheck,
        title: 'Multi-language',
        description: 'Interface available in multiple languages where supported.',
      },
    ],
  },
}

export default siteConfig
