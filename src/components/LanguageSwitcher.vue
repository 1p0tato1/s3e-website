<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, type Locale } from '../i18n'

const { locale, t } = useI18n()

function toggle() {
  const next: Locale = locale.value === 'ar' ? 'fr' : 'ar'
  setLocale(next)
}
</script>

<template>
  <button
    type="button"
    class="lang-switch"
    :class="{ 'lang-switch--ar': locale === 'ar' }"
    role="switch"
    :aria-checked="locale === 'ar'"
    :aria-label="t('common.switchAria')"
    @click="toggle"
  >
    <span class="lang-switch__option">{{ t('common.langFr') }}</span>
    <span class="lang-switch__option">{{ t('common.langAr') }}</span>
    <span class="lang-switch__thumb" aria-hidden="true">
      {{ locale === 'ar' ? t('common.langAr') : t('common.langFr') }}
    </span>
  </button>
</template>

<style scoped>
.lang-switch {
  position: relative;
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  direction: ltr;
  width: 4.6rem;
  height: 2rem;
  flex-shrink: 0;
  padding: 0.2rem;
  background: rgba(20, 20, 20, 0.06);
  border: 1px solid rgba(20, 20, 20, 0.16);
  border-radius: 999px;
  overflow: hidden;
}

.lang-switch__option {
  position: relative;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  text-align: center;
  color: rgba(20, 20, 20, 0.55);
  transition: color 0.3s var(--ease-out);
  pointer-events: none;
}

.lang-switch__thumb {
  position: absolute;
  inset-block: 0.2rem;
  left: 0.2rem;
  width: calc(50% - 0.2rem);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--navy-night);
  color: var(--volt);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  transition: transform 0.35s var(--ease-out);
}

.lang-switch--ar .lang-switch__thumb {
  transform: translateX(100%);
}

.lang-switch--ar .lang-switch__option:last-child,
.lang-switch:not(.lang-switch--ar) .lang-switch__option:first-child {
  color: var(--paper);
}
</style>
