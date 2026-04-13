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

/** Hỗ trợ **đậm** và *nghiêng* trong một dòng. */
export function inlineRich(text: string): React.ReactNode {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g)

  return boldParts.map((boldPart, boldIndex) => {
    if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
      return <b key={`b-${boldIndex}`}>{boldPart.slice(2, -2)}</b>
    }

    const italicParts = boldPart.split(/(\*[^*]+\*)/g)
    return italicParts.map((italicPart, italicIndex) => {
      if (italicPart.startsWith('*') && italicPart.endsWith('*')) {
        return <i key={`i-${boldIndex}-${italicIndex}`}>{italicPart.slice(1, -1)}</i>
      }
      return <React.Fragment key={`t-${boldIndex}-${italicIndex}`}>{italicPart}</React.Fragment>
    })
  })
}

/**
 * Render khối văn bản chuyên nghiệp:
 * - Dòng thường => đoạn văn
 * - Dòng bắt đầu bằng "- " => danh sách gạch đầu dòng
 */
export function renderStructuredText(
  text: string,
  options?: {
    containerClassName?: string
    paragraphClassName?: string
    listClassName?: string
  }
): React.ReactNode {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length === 0) return null

  const elements: React.ReactNode[] = []
  let bulletBuffer: string[] = []
  let paragraphBuffer: string[] = []

  const containerClassName = options?.containerClassName ?? 'space-y-3'
  const paragraphClassName = options?.paragraphClassName ?? 'text-prose text-slate-700'
  const listClassName = options?.listClassName ?? 'list-disc space-y-1.5 pl-5 text-prose text-slate-700'

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return
    const paragraphText = paragraphBuffer.join(' ')
    elements.push(
      <p key={`p-${elements.length}`} className={paragraphClassName}>
        {inlineRich(paragraphText)}
      </p>
    )
    paragraphBuffer = []
  }

  const flushBullets = () => {
    if (bulletBuffer.length === 0) return
    elements.push(
      <ul key={`ul-${elements.length}`} className={listClassName}>
        {bulletBuffer.map((item, idx) => (
          <li key={`li-${idx}`}>{inlineRich(item)}</li>
        ))}
      </ul>
    )
    bulletBuffer = []
  }

  for (const line of lines) {
    if (line.startsWith('- ')) {
      flushParagraph()
      bulletBuffer.push(line.slice(2).trim())
      continue
    }

    flushBullets()
    paragraphBuffer.push(line)
  }

  flushParagraph()
  flushBullets()

  return <div className={containerClassName}>{elements}</div>
}
