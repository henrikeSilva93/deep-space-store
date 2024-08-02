/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes:{
      light:{
        dark:false,
        colors:{
          background: 'ECEFF1',
          primary: '183459',
          secondary: '9FEF14'
        }
      }
    }
  },
})
