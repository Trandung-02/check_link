const TICKET_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomSegment(length: number): string {
  const cryptoObj = typeof globalThis.crypto !== 'undefined' ? globalThis.crypto : null
  let out = ''
  for (let i = 0; i < length; i++) {
    const idx = cryptoObj
      ? cryptoObj.getRandomValues(new Uint8Array(1))[0]! % TICKET_CHARS.length
      : Math.floor(Math.random() * TICKET_CHARS.length)
    out += TICKET_CHARS[idx]!
  }
  return out
}

/** Mã hồ sơ dạng XXXX-XXXX-XXXX cho mỗi phiên trình duyệt. */
export function generateCaseFileId(): string {
  return `${randomSegment(4)}-${randomSegment(4)}-${randomSegment(4)}`
}
