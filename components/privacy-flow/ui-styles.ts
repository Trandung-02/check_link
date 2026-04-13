/** Lớp Tailwind dùng chung cho luồng privacy / review — giao diện hiện đại, nhất quán */

/** Đoạn văn nền (đoạn giải thích, intro modal) — 15px / dòng ~1.65 */
export const textLead = 'text-prose text-slate-600'

/** Phụ đề dưới tiêu đề, gợi ý ngắn */
export const textMuted = 'text-sm leading-normal text-slate-500'

/** Nhãn overline (uppercase) */
export const textOverline = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500'

/** Nhãn trên ô nhập (Contact details, v.v.) */
export const formLabel = 'mb-1.5 block text-sm font-medium leading-snug text-slate-800'

export const btnPrimary =
  'inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-[15px] font-semibold leading-none text-white shadow-sm shadow-blue-900/10 transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50'

export const btnPrimarySubtle =
  'inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium leading-snug text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50'

export function fieldShell(hasError: boolean, opts?: { noMb?: boolean }): string {
  return [
    opts?.noMb ? '' : 'mb-3',
    'flex h-11 w-full min-w-0 items-stretch overflow-hidden rounded-xl border bg-white transition',
    hasError
      ? 'border-red-400 ring-1 ring-red-400/20'
      : 'border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15',
  ]
    .filter(Boolean)
    .join(' ')
}

export const fieldInput =
  'h-full w-full min-w-0 border-0 bg-transparent px-3 text-[15px] leading-normal text-slate-900 placeholder:text-slate-400 outline-none'

/** `<select>` trong `fieldShell` — giữ mũi tên hệ thống */
export const fieldSelect = `${fieldInput} cursor-pointer bg-transparent`

export const fieldTextareaShell = (hasError: boolean) =>
  [
    'mb-3 flex min-h-[100px] w-full flex-col rounded-xl border bg-white p-3 transition',
    hasError
      ? 'border-red-400 ring-1 ring-red-400/20'
      : 'border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15',
  ].join(' ')

export const fieldTextarea = `${fieldInput} min-h-[80px] resize-none py-2 leading-relaxed`

export const errorTextClass = 'mb-2 mt-0.5 text-sm font-medium leading-snug text-red-600'
