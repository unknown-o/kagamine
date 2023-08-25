import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        theme: {
            defaultTheme: 'light',
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: "#ffe211",
                        second: "#ffa500",
                        accent: "#d81b60",
                    }
                },
                dark: {
                    dark: true,
                    colors: {
                        primary: "#ffe211",
                        second: "#ffa500",
                        accent: "#d81b60",
                    }
                },
            }
        }
    });

    nuxtApp.vueApp.use(vuetify);
});