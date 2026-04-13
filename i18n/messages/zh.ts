import type { MessageTree } from './en'

export const zhMessages: MessageTree = {
  meta: {
    title: '提示：视频可能违反社群守则',
    description:
      '你的主页发布的视频可能违反社群守则。原因可能包括不安全内容、版权、误导性信息或垃圾内容。请检查视频，编辑或删除违规片段，使其符合社群守则，并提交准确的说明以供复核。',
    ogTitle: '社群守则 — 视频复核',
  },
  main: {
    title: '你的主页发布的视频可能违反社群守则',
    p1: '我们已记录针对你主页上至少一支影片的举报和/或自动审核结果。在作出最终决定前，为保护社群，部分展示或分发功能可能会被暂时限制。',
    p2: '如果你认为这是**误判**，或需要提交正式说明，请使用下方的**提交复核请求** — 这是本页面**唯一官方渠道**，用于提交工单并与你的案件编号对应。',
    ticketLine: '案件编号：',
    ticketHint: '联系支持时请保留此代码。',
    summaryTitle: '可能原因摘要（参考）',
    summaryBody:
      '常见情况：不符合社群守则的内容、版权提示、误导性信息或用户举报。提交工单后，将在审核过程中核对具体细节。',
    ctaHeadline: '完成复核请求，以避免长期限制',
    ctaSubline: '标准流程 · 通过此按钮不收费 · 数据在安全会话中处理',
    ctaButton: '提交复核请求',
    ctaFootnote:
      '通常回复时间：**24–72 个工作日**（如需补充信息可能更长）。有效工单有助于优先排队。',
    navHelp: '帮助中心',
    navPrivacy: '隐私政策',
    navTerms: '服务条款',
    navCommunity: '社群守则',
    navMeta: 'Meta © {year}',
  },
  captcha: {
    notRobot: '我不是机器人',
    p1: '这有助于我们打击有害行为、检测并防范垃圾信息，并维护我们产品的完整性。',
    p2: '我们使用 Google 的 reCAPTCHA Enterprise 提供此安全检查。使用须遵守 Google 的隐私权政策和服务条款。',
    p3: 'reCAPTCHA Enterprise 会收集硬件和软件信息并发送给 Google，以提供、维护和改进服务以及用于一般安全目的。Google 不会将这些信息用于个性化广告。',
    privacyTerms: '隐私权 - 条款',
  },
  i18nSwitcher: '语言',
}
