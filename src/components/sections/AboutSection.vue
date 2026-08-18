<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { revealUp, countUp } from '../../composables/scrollFx'
import BoltDivider from '../BoltDivider.vue'

const { t } = useI18n()

const yearsExperience = new Date().getFullYear() - 2000

const root = ref<HTMLElement | null>(null)
const statement = ref<HTMLElement | null>(null)
const text = ref<HTMLElement | null>(null)
const stats = ref<HTMLElement | null>(null)
const badge = ref<HTMLElement | null>(null)
const statFounded = ref<HTMLElement | null>(null)
const statYears = ref<HTMLElement | null>(null)
const statDomains = ref<HTMLElement | null>(null)

onMounted(() => {
  if (statement.value) revealUp(statement.value)
  if (text.value) revealUp(text.value, { delay: 0.1 })
  if (stats.value) revealUp(stats.value.children, { stagger: 0.12, trigger: stats.value })
  if (badge.value) revealUp(badge.value, { delay: 0.1 })

  if (statFounded.value) countUp(statFounded.value, 2000, { duration: 1.4, trigger: stats.value ?? undefined })
  if (statYears.value)
    countUp(statYears.value, yearsExperience, { suffix: '+', trigger: stats.value ?? undefined })
  if (statDomains.value) countUp(statDomains.value, 4, { trigger: stats.value ?? undefined })
})
</script>

<template>
  <section id="about" ref="root" class="about">
    <div class="container about__inner">
      <div class="about__head">
        <p class="eyebrow">{{ t('about.eyebrow') }}</p>
        <h2 ref="statement" class="about__statement reveal" v-html="t('about.statementHtml')" />
      </div>

      <div class="about__grid">
        <div ref="text" class="about__text reveal">
          <p v-html="t('about.textP1')" />
          <p>{{ t('about.textP2') }}</p>
        </div>

        <dl ref="stats" class="about__stats">
          <div class="about__stat reveal">
            <dt ref="statFounded" class="about__stat-value">0</dt>
            <dd class="about__stat-label">{{ t('about.statFoundedLabel') }}</dd>
          </div>
          <div class="about__stat reveal">
            <dt ref="statYears" class="about__stat-value">0</dt>
            <dd class="about__stat-label">{{ t('about.statYearsLabel') }}</dd>
          </div>
          <div class="about__stat reveal">
            <dt ref="statDomains" class="about__stat-value">0</dt>
            <dd class="about__stat-label">{{ t('about.statDomainsLabel') }}</dd>
          </div>
        </dl>
      </div>

      <div ref="badge" class="about__badge reveal">
        <div class="about__badge-marks">
          <div class="about__badge-logo">
            <img src="../../assets/ministere-equipement.png" :alt="t('about.badgeAlt')" />
          </div>
        </div>

        <p class="about__badge-text">{{ t('about.badgeText') }}</p>
      </div>
    </div>

    <BoltDivider variant="navy" />
  </section>
</template>

<style scoped>
.about {
  background: var(--paper);
  padding-block: clamp(4rem, 8vw, 8rem) 0;
}

.about__head {
  max-width: 52rem;
}

.about__statement {
  margin-top: 1.4rem;
  font-size: var(--fs-h1);
  color: var(--navy-night);
}

.about__statement em {
  font-style: italic;
  color: var(--navy);
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-top: 3.5rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(20, 20, 20, 0.12);
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 34rem;
  color: rgba(20, 20, 20, 0.78);
}

.about__text strong {
  color: var(--ink);
  font-weight: 600;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.about__stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 3vw, 3.2rem);
  color: var(--navy);
}

.about__stat-label {
  margin-top: 0.4rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.55);
}

.about__badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 4rem;
  padding-block: 3.5rem;
  border-top: 1px solid rgba(20, 20, 20, 0.12);
  text-align: center;
}

.about__badge-marks {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
}

.about__badge-logo {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  padding: 16px;
  border-radius: 50%;
  background: var(--paper-dim);
  border: 1px solid rgba(var(--navy-rgb), 0.14);
}

.about__badge-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.about__badge-divider {
  width: 1px;
  height: 70px;
  flex-shrink: 0;
  background: rgba(20, 20, 20, 0.14);
}

.stamp {
  width: 148px;
  height: 148px;
  flex-shrink: 0;
  transform: rotate(-6deg);
  opacity: 0.92;
}

.stamp__ring {
  fill: none;
  stroke: var(--ember);
  stroke-width: 1.2;
}

.stamp__ring--inner {
  stroke-width: 1;
}

.stamp__ring--dashed {
  stroke-width: 0.75;
  stroke-dasharray: 2 3;
  opacity: 0.65;
}

.stamp__path-text {
  fill: var(--ember);
}

.stamp__title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 700;
  fill: var(--navy-night);
  letter-spacing: 0.06em;
}

.stamp__sub {
  font-family: var(--font-mono);
  font-size: 6.5px;
  fill: var(--navy-night);
  letter-spacing: 0.08em;
}

.about__badge-text {
  max-width: 30rem;
  margin-inline: auto;
  font-size: var(--fs-small);
  color: rgba(20, 20, 20, 0.65);
}

@media (min-width: 800px) {
  .about__grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}
</style>
