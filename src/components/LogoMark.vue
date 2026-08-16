<script setup lang="ts">
withDefaults(
  defineProps<{
    fill?: string
    bolt?: string
  }>(),
  {
    fill: 'var(--navy)',
    bolt: 'var(--paper)',
  },
)
</script>

<template>
  <svg viewBox="0 0 64 64" class="logo-mark" aria-hidden="true">
    <polygon points="32,6 59,55 5,55" :fill="fill" />
    <line x1="10" y1="55" x2="54" y2="55" :stroke="bolt" stroke-width="1.4" opacity="0.5" />
    <line x1="14" y1="47" x2="50" y2="47" :stroke="bolt" stroke-width="1.4" opacity="0.5" />
    <line x1="18" y1="39" x2="46" y2="39" :stroke="bolt" stroke-width="1.4" opacity="0.5" />
    <line x1="22" y1="31" x2="42" y2="31" :stroke="bolt" stroke-width="1.4" opacity="0.5" />
    <polyline
      points="37,15 25,33 35,33 27,53"
      fill="none"
      :stroke="bolt"
      stroke-width="4.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
.logo-mark {
  width: 100%;
  height: 100%;
}
</style>
