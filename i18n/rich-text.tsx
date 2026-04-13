import React from 'react'

/** Chuyển **đoạn in đậm** trong chuỗi dịch thành <b>. */
export function inlineBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <b key={i}>{part.slice(2, -2)}</b>
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}
