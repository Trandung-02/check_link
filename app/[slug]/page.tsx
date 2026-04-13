import React from 'react'
import ReCapcha from '.'
import { generateCommunityViolationMetadata } from '@/i18n/community-page-metadata'

export const generateMetadata = generateCommunityViolationMetadata

const page = () => {
    return (
        <ReCapcha />
    )
}

export default page
