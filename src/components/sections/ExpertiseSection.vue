<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { revealUp } from '../../composables/scrollFx'
import BoltDivider from '../BoltDivider.vue'

const { t, tm } = useI18n()

const domainIds = ['structure', 'vrd', 'electricite', 'incendie'] as const

const domains = computed(() =>
  domainIds.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, '0'),
    title: t(`expertise.domains.${id}.title`),
    desc: t(`expertise.domains.${id}.desc`),
    tags: tm(`expertise.domains.${id}.tags`) as unknown as string[],
  })),
)

const root = ref<HTMLElement | null>(null)
const rows = ref<HTMLElement[]>([])

onMounted(() => {
  if (rows.value.length) revealUp(rows.value, { stagger: 0.12, trigger: root.value ?? undefined })
})
</script>

<template>
  <section id="expertise" ref="root" class="expertise">
    <div class="container">
      <p class="eyebrow">{{ t('expertise.eyebrow') }}</p>
      <h2 class="expertise__title">{{ t('expertise.title') }}</h2>
    </div>

    <div class="expertise__list">
      <article
        v-for="d in domains"
        :key="d.id"
        ref="rows"
        class="expertise__row reveal"
      >
        <div class="container expertise__row-inner">
          <span class="expertise__index">{{ t('expertise.indexLabel', { n: d.index }) }}</span>
          <h3 class="expertise__name">{{ d.title }}</h3>
          <p class="expertise__desc">{{ d.desc }}</p>
          <ul class="expertise__tags">
            <li v-for="tag in d.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </article>
    </div>

    <BoltDivider variant="navy" />
  </section>
</template>

<style scoped>
.expertise {
  background: var(--paper);
  padding-top: clamp(4rem, 8vw, 8rem);
}

.expertise__title {
  margin-top: 1.4rem;
  font-size: var(--fs-h1);
  color: var(--navy-night);
  max-width: 30rem;
}

.expertise__list {
  margin-top: 3.5rem;
  border-top: 1px solid rgba(20, 20, 20, 0.12);
}

.expertise__row {
  border-bottom: 1px solid rgba(20, 20, 20, 0.12);
  transition: background-color 0.4s var(--ease-out);
}

.expertise__row:hover {
  background: rgba(var(--navy-rgb), 0.05);
}

.expertise__row-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem 2rem;
  padding-block: 2rem;
}

.expertise__index {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--navy);
}
.expertise__row--ember .expertise__index {
  color: var(--ember);
} 
.expertise__name {
  font-size: clamp(1.7rem, 2.4vw, 2.5rem);
  color: var(--ink);
}

.expertise__desc {
  max-width: 34rem;
  color: rgba(20, 20, 20, 0.72);
}

.expertise__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.8rem;
  margin-top: 0.4rem;
}

.expertise__tags li {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.04em;
  color: var(--paper);
  background: var(--navy);
  padding: 0.3em 0.7em;
  border: 1px solid var(--navy);
  border-radius: 999px;
  transition:
    background-color 0.4s var(--ease-out),
    color 0.4s var(--ease-out);
}

.expertise__tags li:hover {
  background: var(--paper);
  color: var(--navy);
}

@media (min-width: 860px) {
  .expertise__row-inner {
    grid-template-columns: 10rem 1fr 1fr;
    align-items: center;
  }

  .expertise__desc {
    align-self: center;
  }

  .expertise__tags {
    grid-column: 3;
    justify-content: flex-end;
    text-transform: uppercase;
  }

  .expertise__tags li:hover {
    cursor: pointer;
  }
}
</style>
