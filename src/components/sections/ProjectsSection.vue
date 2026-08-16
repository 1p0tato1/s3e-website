<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { gsap, revealUp, countUp } from '../../composables/scrollFx'
import { projectCategories, projectStats } from '../../data/projects'
import BoltDivider from '../BoltDivider.vue'

const galleryPlaceholders = [
  'Faculté des Sciences Éco. — Sousse',
  'Clinique Internationale — Sousse',
  'Institut Sup. des Beaux-Arts — Sousse',
  'Usine Zollner — Enfidha',
  'Hôtel El Shems — Monastir',
  'Tribunal Cantonal — Bouhajla',
]

const active = ref(projectCategories[0]!.id)
const root = ref<HTMLElement | null>(null)
const statsRow = ref<HTMLElement | null>(null)
const statEls = ref<HTMLElement[]>([])
const ledger = ref<HTMLElement | null>(null)

function activeCategory() {
  return projectCategories.find((c) => c.id === active.value) ?? projectCategories[0]!
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
    const stat = projectStats[i]
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
      <p class="eyebrow">Réalisations</p>
      <h2 class="projects__title">Plus de 200 projets livrés en {{ new Date().getFullYear() - 2000 }}+ ans</h2>

      <dl ref="statsRow" class="projects__stats">
        <div v-for="s in projectStats" :key="s.label" class="projects__stat reveal">
          <dt ref="statEls" class="projects__stat-value">0</dt>
          <dd class="projects__stat-label">{{ s.label }}</dd>
        </div>
      </dl>
    </div>

    <div class="projects__gallery">
      <div class="projects__gallery-track">
        <figure v-for="g in galleryPlaceholders" :key="g" class="projects__gallery-item">
          <div class="projects__gallery-pattern">
            <span>Photo à venir</span>
          </div>
          <figcaption>{{ g }}</figcaption>
        </figure>
      </div>
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
        <div v-for="(item, i) in activeCategory().items" :key="item" class="ledger__row">
          <span class="ledger__row-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ledger__row-name">{{ item }}</span>
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

.projects__gallery {
  margin-top: 3.5rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.projects__gallery-track {
  display: flex;
  gap: 1rem;
  padding-inline: var(--edge);
  width: max-content;
}

.projects__gallery-item {
  width: clamp(180px, 22vw, 240px);
  flex-shrink: 0;
}

.projects__gallery-pattern {
  aspect-ratio: 4 / 3;
  background:
    repeating-linear-gradient(
      135deg,
      rgba(247, 246, 242, 0.09) 0 10px,
      transparent 10px 20px
    ),
    rgba(247, 246, 242, 0.04);
  border: 1px solid rgba(247, 246, 242, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}

.projects__gallery-pattern span {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(247, 246, 242, 0.45);
}

.projects__gallery-item figcaption {
  margin-top: 0.6rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  color: rgba(247, 246, 242, 0.55);
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
  transition: padding-left 0.25s var(--ease-out);
}

.ledger__row:hover {
  padding-left: 0.6rem;
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
</style>
