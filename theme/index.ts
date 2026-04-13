import { extendTheme } from '@chakra-ui/react'
import { theme as baseTheme } from '@saas-ui/react'

import components from './components'
import { fontSizes } from './foundations/typography'

const uiStack =
  'var(--font-optimistic), ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: (props: any) => ({
        body: {
          color: 'gray.900',
          bg: 'white',
          fontFamily: uiStack,
          fontSize: '1rem',
          lineHeight: 1.5,
          _dark: {
            color: 'white',
            bg: 'gray.900',
          },
        },
      }),
    },
    fonts: {
      heading: uiStack,
      body: uiStack,
    },
    fontSizes,
    components,
  },
  baseTheme,
)
