import type { MessageTree } from './en'

export const msMessages: MessageTree = {
  meta: {
    title: 'Notis: Video mungkin melanggar Piawaian Komuniti',
    description:
      'Halaman anda mempunyai video yang mungkin melanggar Piawaian Komuniti. Ini mungkin kerana kandungan tidak selamat, hak cipta, maklumat mengelirukan atau spam. Semak video, edit atau buang segmen yang melanggar, selaraskan dengan Piawaian Komuniti, dan hantar permohonan semakan dengan penerangan yang tepat.',
    ogTitle: 'Piawaian Komuniti — Semakan video',
  },
  main: {
    title: 'Halaman anda berada di bawah kawalan dipertingkat',
    p1: 'Sistem mengesan bahawa sekurang-kurangnya satu video pada halaman anda menunjukkan tanda pelanggaran serius terhadap Piawaian Komuniti. Keputusan ini ditentukan melalui semakan automatik bersama data laporan yang direkodkan.',
    p2: 'Berdasarkan tahap risiko semasa, halaman anda telah dimasukkan ke dalam kawalan dipertingkat. Sesetengah fungsi teras mungkin telah dihadkan atau akan terus dikenakan langkah kawalan tambahan tanpa notis awal.',
    ticketLine: 'Kod fail kes wajib:',
    ticketHint: 'Kod ini ialah pengenal unik untuk sesi semakan. Permintaan tanpa kod sah mungkin ditolak secara automatik.',
    summaryTitle: 'Akibat yang mungkin dikenakan jika tidak ditangani segera',
    summaryBody:
      '- Pengurangan atau penghentian sepenuhnya pengedaran kandungan\n- Penguncian sementara ciri penerbitan, penyuntingan atau interaksi\n- Penggantungan akses halaman jika pelanggaran disahkan\n- Sekatan jangka panjang terhadap akaun pentadbir berkaitan',
    ctaHeadline: 'TINDAKAN SEGERA DIPERLUKAN',
    ctaSubline:
      '*Status sistem:* Menunggu pengesahan daripada pentadbir sebelum keputusan akhir dibuat.\n\nAnda mesti melengkapkan permohonan semakan melalui butang di bawah untuk memberikan maklumat padanan. Ini satu-satunya saluran pemprosesan rasmi yang diiktiraf oleh sistem.',
    ctaButton: 'Hantar permohonan semakan',
    ctaFootnote:
      'Jika tiada respons dalam tempoh ditetapkan, sistem boleh:\n- Melengkapkan keputusan secara automatik berdasarkan data sedia ada\n- Mengenakan langkah sekatan pada tahap lebih tinggi\n- Merekod pelanggaran secara kekal dalam rekod halaman\n\nMasa pemprosesan standard: **24–72 jam bekerja** (*boleh lebih lama jika pengesahan mendalam diperlukan*).\n\nPermintaan yang sah akan diberi keutamaan. Kes tanpa respons boleh diproses tanpa notis tambahan.',
    navHelp: 'Pusat Bantuan',
    navPrivacy: 'Dasar Privasi',
    navTerms: 'Terma Perkhidmatan',
    navCommunity: 'Piawaian Komuniti',
    navMeta: 'Meta © {year}',
    progressStorageNotice:
      'On this device only, your place in this flow may be restored for up to 24 hours if you close the page. Passwords and verification codes are never stored.',
  },
  captcha: {
    notRobot: 'Saya bukan robot',
    p1: 'Ini membantu kami memerangi kelakuan berbahaya, mengesan dan mencegah spam serta mengekalkan integriti Produk kami.',
    p2: 'Kami menggunakan produk reCAPTCHA Enterprise Google untuk pemeriksaan keselamatan ini. Penggunaan anda tertakluk kepada Dasar Privasi dan Terma Penggunaan Google.',
    p3: 'reCAPTCHA Enterprise mengumpul maklumat perkakasan dan perisian serta menghantarnya ke Google untuk menyediakan, mengekalkan dan menambah baik perkhidmatan serta untuk tujuan keselamatan am. Maklumat ini tidak digunakan untuk pengiklanan diperibadikan.',
    privacyTerms: 'Privasi - Terma',
  },
  i18nSwitcher: 'Bahasa',
}
