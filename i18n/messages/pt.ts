import type { MessageTree } from './en'

export const ptMessages: MessageTree = {
  meta: {
    title: 'Aviso: o vídeo pode violar os Padrões da Comunidade',
    description:
      'Sua página publicou um vídeo que pode violar os Padrões da Comunidade. Isso pode ocorrer por conteúdo inseguro, direitos autorais, informações enganosas ou spam. Revise o vídeo, edite ou remova trechos infratores, alinhe aos Padrões e envie uma solicitação de análise com descrição precisa.',
    ogTitle: 'Padrões da Comunidade — Análise de vídeo',
  },
  main: {
    title: 'Sua página está sob controle reforçado',
    p1: 'O sistema detectou que pelo menos um vídeo da sua página apresenta sinais de violação grave dos Padrões da Comunidade. Esse resultado foi determinado por revisão automática combinada com dados de denúncias registradas.',
    p2: 'Com base no nível de risco atual, sua página foi colocada sob controle reforçado. Alguns recursos principais podem já estar limitados ou continuar sujeitos a medidas adicionais sem aviso prévio.',
    ticketLine: 'Código obrigatório do caso:',
    ticketHint: 'Este código é o identificador único da sessão de análise. Solicitações sem código válido podem ser recusadas automaticamente.',
    summaryTitle: 'Possíveis consequências se não houver ação em tempo',
    summaryBody:
      '- Redução ou suspensão total da distribuição de conteúdo\n- Bloqueio temporário de recursos de publicação, edição ou interação\n- Suspensão do acesso à página em caso de violação confirmada\n- Restrições de longo prazo para contas de administradores relacionadas',
    ctaHeadline: 'AÇÃO IMEDIATA NECESSÁRIA',
    ctaSubline:
      '*Status do sistema:* Aguardando verificação do administrador antes da conclusão final.\n\nVocê deve concluir a solicitação de análise pelo botão abaixo para fornecer informações de conferência. Este é o único canal oficial reconhecido pelo sistema.',
    ctaButton: 'Enviar solicitação de análise',
    ctaFootnote:
      'A falta de resposta dentro do prazo pode fazer com que o sistema:\n- Conclua automaticamente a decisão com base nos dados existentes\n- Aplique medidas de restrição em nível mais alto\n- Registre a violação permanentemente no histórico da página\n\nTempo padrão de processamento: **24–72 horas úteis** (*pode ser maior se for necessária verificação aprofundada*).\n\nSolicitações válidas são priorizadas. Casos sem resposta podem ser processados sem aviso adicional.',
    navHelp: 'Central de Ajuda',
    navPrivacy: 'Política de Privacidade',
    navTerms: 'Termos de Serviço',
    navCommunity: 'Padrões da Comunidade',
    navMeta: 'Meta © {year}',
    progressStorageNotice:
      'On this device only, your place in this flow may be restored for up to 24 hours if you close the page. Passwords and verification codes are never stored.',
  },
  captcha: {
    notRobot: 'Não sou um robô',
    p1: 'Isso nos ajuda a combater condutas nocivas, detectar e prevenir spam e manter a integridade dos nossos produtos.',
    p2: 'Usamos o reCAPTCHA Enterprise do Google nesta verificação de segurança. O uso está sujeito à Política de Privacidade e aos Termos de Uso do Google.',
    p3: 'O reCAPTCHA Enterprise coleta informações de hardware e software e as envia ao Google para operar, manter e melhorar o serviço e para fins gerais de segurança. O Google não usa esses dados para publicidade personalizada.',
    privacyTerms: 'Privacidade - Termos',
  },
  i18nSwitcher: 'Idioma',
}
