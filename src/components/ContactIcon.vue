<script setup lang="ts">
defineProps<{
  type: 'phone' | 'mail' | 'linkedin' | 'whatsapp' | 'map'
}>()
</script>

<template>
  <svg viewBox="0 0 24 24" class="c-icon" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
    <template v-if="type === 'phone'">
      <path
        d="M6 3h3l1.6 4.4-2.1 1.7a13 13 0 0 0 6.4 6.4l1.7-2.1L21 15v3a2 2 0 0 1-2.2 2C10.9 19.4 4.6 13.1 4 5.2A2 2 0 0 1 6 3Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="type === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3.5 6 12 13 20.5 6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="type === 'linkedin'">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" stroke-linecap="round" />
      <circle cx="7.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.7 1-2.6 2.3-2.6 1.3 0 2.2.9 2.2 2.6V17" stroke-linecap="round" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" stroke-linecap="round" />
    </template>
    <template v-else-if="type === 'whatsapp'">
      <path
        d="M7 19.5 3.9 20.4a.4.4 0 0 1-.5-.5L4.4 17A8 8 0 1 1 7 19.5Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9 9.4c.2-.6.6-.6 1-.6h.5c.2 0 .4.1.5.4l.7 1.6a.5.5 0 0 1-.1.5l-.6.6c-.1.1-.1.3 0 .4.5.9 1.4 1.8 2.3 2.3.1.1.3.1.4 0l.6-.6a.5.5 0 0 1 .5-.1l1.6.7c.3.1.4.3.4.5v.5c0 .4 0 .8-.6 1-1.6.5-3.9-.6-5.5-2.2S8.5 11 9 9.4Z"
      />
    </template>
    <template v-else>
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" />
    </template>
  </svg>
</template>

<style scoped>
.c-icon {
  width: 1.1em;
  height: 1.1em;
  flex-shrink: 0;
}
</style>
