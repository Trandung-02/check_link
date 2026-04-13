import MetaDataComponent from './index'
import { generateCommunityViolationMetadata } from '@/i18n/community-page-metadata'

export const generateMetadata = generateCommunityViolationMetadata

export default function MetaDataPage() {
  return <MetaDataComponent />
}
