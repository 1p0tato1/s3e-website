<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap, revealUp, countUp } from '../../composables/scrollFx'
import { projectCategories as projectCategoriesMeta, projectStats as projectStatsMeta, trustedClients as trustedClientsMeta } from '../../data/projects'
import BoltDivider from '../BoltDivider.vue'

const { t, tm } = useI18n()

const clientLogoFiles = import.meta.glob('../../assets/clients/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function logoFor(file: string) {
  const match = Object.entries(clientLogoFiles).find(([path]) => path.endsWith(`/${file}`))
  return match?.[1]
}

const projectCategories = computed(() =>
  projectCategoriesMeta.map((c) => ({
    ...c,
    label: t(`projects.categories.${c.id}.label`),
    items: tm(`projects.categories.${c.id}.items`) as unknown as string[],
  })),
)

const projectStats = computed(() =>
  projectStatsMeta.map((s, i) => ({
    ...s,
    label: (tm('projects.stats') as unknown as string[])[i]!,
  })),
)

const trustedClients = computed(() =>
  trustedClientsMeta.map((c) => ({
    ...c,
    name: t(`projects.trustedClients.${c.id}.name`),
  })),
)

const trustedLogos = computed(() => trustedClients.value.filter((c) => logoFor(c.file)))
const trustTrain = computed(() => [...trustedLogos.value, ...trustedLogos.value])

const active = ref(projectCategoriesMeta[0]!.id)
const root = ref<HTMLElement | null>(null)
const statsRow = ref<HTMLElement | null>(null)
const statEls = ref<HTMLElement[]>([])
const ledger = ref<HTMLElement | null>(null)

function activeCategory() {
  return projectCategories.value.find((c) => c.id === active.value) ?? projectCategories.value[0]!
}

async function setActive(id: string) {
  if (id === active.value) return
  active.value = id
  await nextTick()
  if (ledger.value) {
    const rows = ledger.value.querySelectorAll('.ledger__row')
    gsap.fromTo(
      rows,
      { opacity: 0, x: -14 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.03 },
    )
  }
}

onMounted(() => {
  if (statsRow.value) revealUp(statsRow.value.children, { stagger: 0.1, trigger: statsRow.value })
  statEls.value.forEach((el, i) => {
    const stat = projectStatsMeta[i]
    if (stat) countUp(el, stat.value, { suffix: stat.suffix, trigger: statsRow.value ?? undefined })
  })
  if (ledger.value) {
    const rows = ledger.value.querySelectorAll('.ledger__row')
    revealUp(rows, { stagger: 0.03, trigger: ledger.value })
  }
})
</script>

<template>
  <section id="projects" ref="root" class="projects on-dark">
    <div class="container">
      <p class="eyebrow">{{ t('projects.eyebrow') }}</p>
      <h2 class="projects__title">{{ t('projects.titleTemplate', { n: new Date().getFullYear() - 2000 }) }}</h2>

      <dl ref="statsRow" class="projects__stats">
        <div v-for="(s, i) in projectStats" :key="i" class="projects__stat reveal">
          <dt ref="statEls" class="projects__stat-value">0</dt>
          <dd class="projects__stat-label">{{ s.label }}</dd>
        </div>
      </dl>
    </div>

    <div class="container">
      <div class="projects__tabs" role="tablist">
        <button
          v-for="c in projectCategories"
          :key="c.id"
          role="tab"
          class="projects__tab"
          :class="{ 'projects__tab--active': active === c.id }"
          :aria-selected="active === c.id"
          @click="setActive(c.id)"
        >
          <span class="projects__tab-count">{{ c.count }}</span>
          {{ c.label }}
        </button>
      </div>

      <div ref="ledger" class="ledger">
        <div v-for="(item, i) in activeCategory().items" :key="i" class="ledger__row">
          <span class="ledger__row-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ledger__row-name">{{ item }}</span>
        </div>
      </div>
    </div>

    <div class="trust">
      <p class="container eyebrow trust__eyebrow">{{ t('projects.trustEyebrow') }}</p>
      <div class="trust__rail" role="list" aria-label="Clients et partenaires">
        <div class="trust__track">
          <component
            :is="c.url ? 'a' : 'div'"
            v-for="(c, i) in trustTrain"
            :key="i"
            class="trust__wagon"
            :class="{ 'trust__wagon--light': c.light }"
            role="listitem"
            :aria-hidden="i >= trustedLogos.length"
            v-bind="c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
          >
            <img :src="logoFor(c.file)" :alt="c.name" class="trust__logo" loading="lazy" />
          </component>
        </div>
      </div>
    </div>

    <BoltDivider variant="volt" />
  </section>
</template>

<style scoped>
.projects {
  background: linear-gradient(180deg, var(--navy-night) 0%, var(--navy) 100%);
  color: var(--paper);
  padding-top: clamp(4rem, 8vw, 8rem);
}

.projects__title {
  margin-top: 1.4rem;
  font-size: var(--fs-h1);
  max-width: 40rem;
}

.projects__stats {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2.5rem;
  margin-top: 3rem;
  width: fit-content;
}

.projects__stat-value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 3rem);
  color: var(--volt);
}

.projects__stat-label {
  margin-top: 0.3rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(247, 246, 242, 0.6);
}

.projects__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 4rem;
}

.projects__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  letter-spacing: 0.03em;
  padding: 0.6em 1.1em;
  border: 1px solid rgba(247, 246, 242, 0.25);
  border-radius: 999px;
  color: rgba(247, 246, 242, 0.7);
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}

.projects__tab-count {
  color: rgba(247, 246, 242, 0.4);
}

.projects__tab:hover {
  border-color: var(--volt);
  color: var(--paper);
}

.projects__tab--active {
  background: var(--volt);
  border-color: var(--volt);
  color: var(--navy-night);
}

.projects__tab--active .projects__tab-count {
  color: rgba(5, 19, 66, 0.55);
}

.ledger {
  margin-top: 2.5rem;
  border-top: 1px solid rgba(247, 246, 242, 0.16);
  padding-bottom: 4rem;
}

.ledger__row {
  display: flex;
  gap: 1.2rem;
  padding-block: 0.9rem;
  border-bottom: 1px solid rgba(247, 246, 242, 0.1);
  transition: padding-inline-start 0.25s var(--ease-out);
}

.ledger__row:hover {
  padding-inline-start: 0.6rem;
  background: rgba(247, 246, 242, 0.04);
}

.ledger__row-index {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  color: var(--volt);
  flex-shrink: 0;
  padding-top: 0.15em;
}

.ledger__row-name {
  color: rgba(247, 246, 242, 0.86);
}

.trust {
  margin-top: 6.5rem;
  padding-bottom: clamp(4rem, 7vw, 6.5rem);
}

.trust__eyebrow {
  margin-bottom: 2.2rem;
}

.trust__rail {
  position: relative;
  overflow: hidden;
  padding-block: 2.2rem;
  border-top: 1px solid rgba(247, 246, 242, 0.16);
  border-bottom: 1px solid rgba(247, 246, 242, 0.16);
  mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
}

.trust__track {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: max-content;
  animation: trust-scroll 70s linear infinite;
}

.trust__rail:hover .trust__track {
  animation-play-state: paused;
}

.trust__wagon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(10.5rem, 12vw, 13.5rem);
  height: clamp(6.4rem, 7.6vw, 8rem);
  padding: 1.2rem 1.8rem;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(155deg, rgba(var(--paper-rgb), 0.98) 0%, rgba(var(--paper-rgb), 0.86) 100%);
  border: 1px solid rgba(var(--paper-rgb), 0.5);
  box-shadow:
    0 1px 2px rgba(var(--navy-night-rgb), 0.22),
    0 22px 36px -22px rgba(var(--navy-night-rgb), 0.65);
  text-decoration: none;
  transition: transform 0.35s var(--ease-out), box-shadow 0.35s var(--ease-out), border-color 0.35s var(--ease-out);
}

.trust__wagon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), transparent 55%);
  pointer-events: none;
}

a.trust__wagon {
  cursor: pointer;
}

.trust__wagon:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--volt-rgb), 0.55);
  box-shadow:
    0 1px 2px rgba(var(--navy-night-rgb), 0.22),
    0 26px 44px -20px rgba(var(--navy-night-rgb), 0.7),
    0 0 0 1px rgba(var(--volt-rgb), 0.3) inset;
}

.trust__wagon--light {
  background: rgba(var(--paper-rgb), 0.07);
  border-color: rgba(var(--paper-rgb), 0.2);
  box-shadow: none;
}

.trust__wagon--light::before {
  display: none;
}

.trust__wagon--light:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--volt-rgb), 0.5);
  box-shadow: 0 0 0 1px rgba(var(--volt-rgb), 0.25) inset;
}

.trust__logo {
  position: relative;
  max-height: 58%;
  max-width: 78%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(1) opacity(0.75);
  transition: filter 0.35s var(--ease-out);
}

.trust__wagon:hover .trust__logo {
  filter: grayscale(0) opacity(1);
}

.trust__wagon--light .trust__logo {
  filter: brightness(0) invert(1) opacity(0.6);
}

.trust__wagon--light:hover .trust__logo {
  filter: brightness(0) invert(1) opacity(0.9);
}

@keyframes trust-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .trust__track {
    animation: none;
  }
}
</style>
