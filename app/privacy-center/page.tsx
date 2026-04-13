import React from 'react'
import AccountsCenter from '.'
import { generateCommunityViolationMetadata } from '@/i18n/community-page-metadata'

export const generateMetadata = generateCommunityViolationMetadata

const AccountsCenterPage = () => {
  return (
    <AccountsCenter />
  )
}

export default AccountsCenterPage
