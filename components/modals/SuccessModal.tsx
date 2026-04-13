import React from 'react';
import Modal from './Modal';
import { btnPrimary, textLead, textMuted } from '@/components/privacy-flow/ui-styles';

export interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onOpenChange }) => {
  const [isOpen, setIsOpen] = React.useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} title="Request submitted" onClose={handleClose}>
      <div className="flex h-full w-full flex-1 flex-col items-center justify-between">
        <div className="w-full">
          <div className="mb-4 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <img src="/images/meta/succes.jpg" width="100%" alt="" />
          </div>
          <p className={`mb-3 pt-1 ${textLead}`}>
            Your request has been queued for processing. If we need more information, we will contact you using the
            details you provided.
          </p>
          <p className={`mb-6 ${textMuted} font-medium`}>— Support team</p>
          <button type="button" className={btnPrimary} onClick={handleClose}>
            Close
          </button>
        </div>

        <div className="mx-auto mt-8 w-[60px]">
          <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
