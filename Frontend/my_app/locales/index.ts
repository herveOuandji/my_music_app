import { I18n } from 'i18n-js'
import en from './en.json'
import fr from './fr.json'
import * as Localization from 'expo-localization'

// Initialize i18n with language files
const i18n = new I18n({ en, fr })

// Enable fallback to another language if translation is missing
i18n.enableFallback = true

// Set default locale
i18n.defaultLocale = 'en'

// Set locale based on device settings using the updated API
i18n.locale = Localization.getLocales()[0]?.languageCode || i18n.defaultLocale

export default i18n
