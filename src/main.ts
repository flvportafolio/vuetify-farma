import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, ThemeDefinition  } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/es';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

import Notifications from '@kyvg/vue3-notification';
import router from './router';
import { createPinia } from 'pinia';

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#007bff',
    'primary-darken-1': '#3700B3',
    secondary: '#6c757d',
    'secondary-darken-1': '#018786',
    error: '#dc3545',
    info: '#17a2b8',
    success: '#28a745',
    warning: '#ffc107',
  }
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  }
})

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.component('multiselect', Multiselect);
app.use(DatePicker);
app.use(Notifications);
app.mount('#app');
