'use client'

import MainContent from '#components/main/MainContent'
import InformationModal from '#components/modals/InformationModal'
import PasswordModal from '#components/modals/PasswordModal'
import SuccessModal from '#components/modals/SuccessModal'
import TwoFactorModal from '#components/modals/TwoFactorModal'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateForm } from '../store/slices/stepFormSlice'

const STORAGE_KEY = 'privacy_center_state'

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

  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.stepForm.data)

  React.useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const { state, formData: savedFormData, expires } = JSON.parse(savedData)
        if (Date.now() < expires) {
          const flags = readModalFlagsFromStorage(state)
          setIsInformationModalOpen(flags.isInformationModalOpen)
          setIsPasswordModalOpen(flags.isPasswordModalOpen)
          setIsTwoFactorModalOpen(flags.isTwoFactorModalOpen)
          setIsSuccessModalOpen(flags.isSuccessModalOpen)

          if (savedFormData) {
            dispatch(updateForm(savedFormData))
          }
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (e) {
        console.error('Error parsing saved state', e)
      }
    }
    setIsLoaded(true)
  }, [dispatch])

  React.useEffect(() => {
    if (!isLoaded) return
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        state: {
          isInformationModalOpen,
          isPasswordModalOpen,
          isTwoFactorModalOpen,
          isSuccessModalOpen,
        },
        formData,
        expires,
      }),
    )
  }, [
    isLoaded,
    isInformationModalOpen,
    isPasswordModalOpen,
    isTwoFactorModalOpen,
    isSuccessModalOpen,
    formData,
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
