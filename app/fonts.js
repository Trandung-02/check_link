import localFont from 'next/font/local'
import { Noto_Sans } from 'next/font/google'

export const optimisticFont = localFont({
    src: '../public/fonts/Optimistic.woff2',
    display: 'swap',
    preload: true,
    variable: '--font-optimistic',
    weight: '300 500 700 900',
})

export const vietnameseFont = Noto_Sans({
    subsets: ['vietnamese', 'latin'],
    display: 'swap',
    variable: '--font-optimistic',
    weight: ['400', '500', '600', '700'],
})