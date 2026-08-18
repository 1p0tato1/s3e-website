import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import ar from './locales/ar'
import { projectsFr, projectsAr } from './locales/projects'

export type Locale = 'fr' | 'ar'

const STORAGE_KEY = 's3e-locale'

function storedLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'ar' ? 'ar' : 'fr'
}

export const i18n = createI18n({
  legacy: false,
  locale: storedLocale(),
  fallbackLocale: 'fr',
  messages: {
    fr: { ...fr, projects: projectsFr },
    ar: { ...ar, projects: projectsAr },
  },
})

function applyDocumentLocale(locale: Locale) {
  const messages = locale === 'ar' ? ar : fr
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.title = messages.meta.title
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', messages.meta.description)
}

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  applyDocumentLocale(locale)
}

applyDocumentLocale(i18n.global.locale.value as Locale)
