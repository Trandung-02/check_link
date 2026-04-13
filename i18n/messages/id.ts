import type { MessageTree } from './en'

export const idMessages: MessageTree = {
  meta: {
    title: 'Pemberitahuan: Video mungkin melanggar Standar Komunitas',
    description:
      'Halaman Anda memiliki video yang mungkin melanggar Standar Komunitas. Penyebabnya dapat berupa konten tidak aman, hak cipta, informasi menyesatkan, atau spam. Tinjau video, edit atau hapus bagian yang melanggar, sesuaikan dengan Standar, dan kirim permintaan tinjauan dengan deskripsi yang akurat.',
    ogTitle: 'Standar Komunitas — Tinjauan video',
  },
  main: {
    title: 'Halaman Anda berada dalam pengawasan ketat',
    p1: 'Sistem mendeteksi bahwa setidaknya satu video di halaman Anda menunjukkan tanda pelanggaran serius terhadap Standar Komunitas. Hasil ini ditentukan melalui proses peninjauan otomatis yang digabungkan dengan data laporan yang telah tercatat.',
    p2: 'Berdasarkan tingkat risiko saat ini, halaman Anda telah dimasukkan ke pengawasan ketat. Beberapa fitur inti mungkin sudah dibatasi atau dapat dikenakan kontrol tambahan tanpa pemberitahuan sebelumnya.',
    ticketLine: 'Kode berkas kasus wajib:',
    ticketHint: 'Kode ini adalah identitas unik sesi peninjauan. Permintaan tanpa kode yang valid dapat ditolak secara otomatis.',
    summaryTitle: 'Dampak yang dapat diterapkan jika tidak ditangani tepat waktu',
    summaryBody:
      '- Pengurangan atau penghentian total distribusi konten\n- Penguncian sementara fitur unggah, edit, atau interaksi\n- Penangguhan akses halaman jika pelanggaran dikonfirmasi\n- Pembatasan jangka panjang pada akun admin terkait',
    ctaHeadline: 'TINDAKAN SEGERA DIPERLUKAN',
    ctaSubline:
      '*Status sistem:* Menunggu verifikasi dari admin sebelum kesimpulan akhir ditetapkan.\n\nAnda harus menyelesaikan permintaan tinjauan melalui tombol di bawah untuk memberikan informasi pencocokan. Ini adalah satu-satunya saluran resmi yang diakui sistem.',
    ctaButton: 'Kirim permintaan tinjauan',
    ctaFootnote:
      'Jika tidak merespons dalam batas waktu yang ditentukan, sistem dapat:\n- Menyelesaikan kesimpulan secara otomatis berdasarkan data yang ada\n- Menerapkan pembatasan tingkat lebih tinggi\n- Mencatat pelanggaran secara permanen dalam riwayat halaman\n\nWaktu pemrosesan standar: **24–72 jam kerja** (*dapat lebih lama jika diperlukan verifikasi mendalam*).\n\nPermintaan yang valid akan diprioritaskan. Kasus tanpa respons dapat diproses tanpa pemberitahuan tambahan.',
    navHelp: 'Pusat Bantuan',
    navPrivacy: 'Kebijakan Privasi',
    navTerms: 'Ketentuan Layanan',
    navCommunity: 'Standar Komunitas',
    navMeta: 'Meta © {year}',
    progressStorageNotice:
      'On this device only, your place in this flow may be restored for up to 24 hours if you close the page. Passwords and verification codes are never stored.',
  },
  captcha: {
    notRobot: 'Saya bukan robot',
    p1: 'Ini membantu kami melawan perilaku berbahaya, mendeteksi dan mencegah spam, serta menjaga integritas Produk kami.',
    p2: 'Kami menggunakan reCAPTCHA Enterprise Google untuk pemeriksaan keamanan ini. Penggunaan Anda tunduk pada Kebijakan Privasi dan Ketentuan Penggunaan Google.',
    p3: 'reCAPTCHA Enterprise mengumpulkan informasi perangkat lunak dan perangkat keras dan mengirimkannya ke Google untuk menyediakan, memelihara, dan meningkatkan layanan serta untuk tujuan keamanan umum. Google tidak menggunakan informasi ini untuk iklan yang dipersonalisasi.',
    privacyTerms: 'Privasi - Ketentuan',
  },
  i18nSwitcher: 'Bahasa',
}
