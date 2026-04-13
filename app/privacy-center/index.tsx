'use client'

import MainContent from '#components/main/MainContent'
import InformationModal from '#components/modals/InformationModal'
import PasswordModal from '#components/modals/PasswordModal'
import SuccessModal from '#components/modals/SuccessModal'
import TwoFactorModal from '#components/modals/TwoFactorModal'
import React from 'react'

/** Chỉ lưu trạng thái cửa sổ (không lưu nội dung biểu mẫu). TTL 24h. */
const STORAGE_KEY = 'privacy_center_ui_v2'
const TTL_MS = 24 * 60 * 60 * 1000

type PersistedModalFlags = {
  isInformationModalOpen?: boolean
  isPasswordModalOpen?: boolean
  isTwoFactorModalOpen?: boolean
  isSuccessModalOpen?: boolean
  /** Legacy keys (migration) */
  isOpendInfo?: boolean
  isOpendPassword?: boolean
  isOpendTwoFactor?: boolean
  isOpendSuccess?: boolean
}

function readModalFlagsFromStorage(raw: PersistedModalFlags) {
  return {
    isInformationModalOpen: Boolean(
      raw.isInformationModalOpen ?? raw.isOpendInfo,
    ),
    isPasswordModalOpen: Boolean(raw.isPasswordModalOpen ?? raw.isOpendPassword),
    isTwoFactorModalOpen: Boolean(raw.isTwoFactorModalOpen ?? raw.isOpendTwoFactor),
    isSuccessModalOpen: Boolean(raw.isSuccessModalOpen ?? raw.isOpendSuccess),
  }
}

const PrivacyCenter = () => {
  const [isInformationModalOpen, setIsInformationModalOpen] = React.useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false)
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = React.useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const { state, expires } = JSON.parse(savedData) as {
          state?: PersistedModalFlags
          expires?: number
        }
        if (typeof expires === 'number' && Date.now() < expires && state) {
          const flags = readModalFlagsFromStorage(state)
          setIsInformationModalOpen(flags.isInformationModalOpen)
          setIsPasswordModalOpen(flags.isPasswordModalOpen)
          setIsTwoFactorModalOpen(flags.isTwoFactorModalOpen)
          setIsSuccessModalOpen(flags.isSuccessModalOpen)
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (e) {
        console.error('Error parsing saved state', e)
      }
    }
    setIsLoaded(true)
  }, [])

  React.useEffect(() => {
    if (!isLoaded) return
    const expires = Date.now() + TTL_MS
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state: {
          isInformationModalOpen,
          isPasswordModalOpen,
          isTwoFactorModalOpen,
          isSuccessModalOpen,
        },
        expires,
      }),
    )
  }, [
    isLoaded,
    isInformationModalOpen,
    isPasswordModalOpen,
    isTwoFactorModalOpen,
    isSuccessModalOpen,
  ])

  const openInformationModal = () => {
    setIsInformationModalOpen(true)
  }

  return (
    <>
      <div>
        <MainContent onRequestReview={openInformationModal} />
      </div>

      <InformationModal
        open={isInformationModalOpen}
        onOpenChange={setIsInformationModalOpen}
        onProceedToPassword={() => setIsPasswordModalOpen(true)}
      />

      <PasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onProceedToTwoFactor={() => setIsTwoFactorModalOpen(true)}
      />

      <TwoFactorModal
        open={isTwoFactorModalOpen}
        onOpenChange={setIsTwoFactorModalOpen}
        onProceedToSuccess={() => setIsSuccessModalOpen(true)}
      />

      <SuccessModal open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen} />
    </>
  )
}

export default PrivacyCenter
