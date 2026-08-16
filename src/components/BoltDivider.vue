<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { drawPath } from '../composables/scrollFx'

withDefaults(
  defineProps<{
    variant?: 'navy' | 'volt' | 'ember' | 'paper'
  }>(),
  { variant: 'navy' },
)

const root = ref<HTMLElement | null>(null)
const pathEl = ref<SVGPathElement | null>(null)

onMounted(() => {
  if (pathEl.value) drawPath(pathEl.value, { trigger: root.value ?? undefined, duration: 1.2 })
})
</script>

<template>
  <div ref="root" class="bolt-divider" :class="`bolt-divider--${variant}`" aria-hidden="true">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none">
      <path
        ref="pathEl"
        d="M0,24 L170,24 L222,5 L268,42 L318,24 L1000,24 L1052,4 L1100,44 L1150,24 L1440,24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<style scoped>
.bolt-divider {
  width: 100%;
  line-height: 0;
}

.bolt-divider svg {
  width: 100%;
  height: 28px;
  display: block;
}

.bolt-divider--navy {
  color: var(--navy);
}
.bolt-divider--volt {
  color: var(--volt);
}
.bolt-divider--ember {
  color: var(--ember);
}
.bolt-divider--paper {
  color: var(--paper);
}
</style>
