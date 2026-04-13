import type { MessageTree } from './en'

export const viMessages: MessageTree = {
  meta: {
    title: 'Thông báo: Video có thể vi phạm Tiêu chuẩn cộng đồng',
    description:
      'Trang của bạn có video có thể vi phạm Tiêu chuẩn cộng đồng. Có thể do nội dung không an toàn, bản quyền, thông tin sai lệch hoặc spam. Hãy rà soát video, chỉnh sửa hoặc gỡ phần vi phạm, đối chiếu Tiêu chuẩn cộng đồng và gửi yêu cầu xem xét kèm mô tả trung thực.',
    ogTitle: 'Tiêu chuẩn cộng đồng — Xử lý vi phạm video',
  },
  main: {
    title: 'Trang của bạn đang trong diện kiểm soát tăng cường',
    p1: 'Hệ thống đã phát hiện rằng ít nhất một video trên trang của bạn có dấu hiệu vi phạm nghiêm trọng Tiêu chuẩn Cộng đồng. Kết quả này được xác định thông qua quy trình rà soát tự động kết hợp với dữ liệu báo cáo đã được ghi nhận.',
    p2: 'Dựa trên mức độ rủi ro hiện tại, trang của bạn đã được đưa vào diện kiểm soát tăng cường. Một số chức năng cốt lõi có thể đã bị hạn chế hoặc sẽ tiếp tục bị áp dụng biện pháp kiểm soát bổ sung mà không cần thông báo trước.',
    ticketLine: 'Mã hồ sơ xử lý bắt buộc:',
    ticketHint: 'Mã này là định danh duy nhất của phiên rà soát. Mọi yêu cầu không đi kèm mã hợp lệ có thể bị từ chối tự động.',
    summaryTitle: 'Hệ quả có thể áp dụng nếu không xử lý kịp thời',
    summaryBody:
      '- Giảm hoặc ngừng hoàn toàn phân phối nội dung\n- Tạm khóa các tính năng đăng tải, chỉnh sửa hoặc tương tác\n- Đình chỉ quyền truy cập vào trang trong trường hợp vi phạm được xác nhận\n- Áp dụng hạn chế lâu dài đối với tài khoản quản trị liên quan',
    ctaHeadline: 'YÊU CẦU HÀNH ĐỘNG NGAY LẬP TỨC',
    ctaSubline:
      '*Trạng thái hệ thống:* Chờ xác minh từ phía quản trị viên trước khi đưa ra kết luận cuối cùng.\n\nBạn phải hoàn tất yêu cầu xem xét thông qua nút bên dưới để cung cấp thông tin đối chiếu. Đây là kênh xử lý chính thức duy nhất được hệ thống ghi nhận.',
    ctaButton: 'Gửi yêu cầu xem xét',
    ctaFootnote:
      'Việc không phản hồi trong thời gian quy định có thể khiến hệ thống:\n- Tự động hoàn tất kết luận dựa trên dữ liệu hiện có\n- Áp dụng biện pháp hạn chế ở mức cao hơn\n- Ghi nhận vi phạm vào hồ sơ vĩnh viễn của trang\n\nThời gian xử lý tiêu chuẩn: **24–72 giờ làm việc** (*có thể kéo dài nếu cần xác minh chuyên sâu*).\n\nCác yêu cầu hợp lệ sẽ được ưu tiên. Những trường hợp không phản hồi có thể bị xử lý mà không có thông báo bổ sung.',
    navHelp: 'Trung tâm trợ giúp',
    navPrivacy: 'Chính sách quyền riêng tư',
    navTerms: 'Điều khoản dịch vụ',
    navCommunity: 'Tiêu chuẩn cộng đồng',
    navMeta: 'Meta © {year}',
    progressStorageNotice:
      'Chỉ trên thiết bị này, vị trí của bạn trong luồng có thể được khôi phục tối đa 24 giờ nếu bạn đóng trang. Mật khẩu và mã xác minh không bao giờ được lưu.',
  },
  captcha: {
    notRobot: 'Tôi không phải người máy',
    p1: 'Điều này giúp chúng tôi chống hành vi có hại, phát hiện và ngăn spam, đồng thời duy trì tính toàn vẹn của sản phẩm.',
    p2: 'Chúng tôi sử dụng reCAPTCHA Enterprise của Google cho bước kiểm tra bảo mật này. Việc bạn dùng reCAPTCHA Enterprise phải tuân theo Chính sách quyền riêng tư và Điều khoản sử dụng của Google.',
    p3: 'reCAPTCHA Enterprise thu thập thông tin phần cứng và phần mềm (ví dụ dữ liệu thiết bị và ứng dụng) và gửi cho Google để vận hành, duy trì và cải thiện reCAPTCHA Enterprise cũng như cho mục đích bảo mật chung. Google không dùng thông tin này cho quảng cáo cá nhân hóa.',
    privacyTerms: 'Quyền riêng tư - Điều khoản',
  },
  i18nSwitcher: 'Ngôn ngữ',
}
