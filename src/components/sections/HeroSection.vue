<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap, ScrollTrigger } from '../../composables/scrollFx'
import ContactIcon from '../ContactIcon.vue'

const { t, tm } = useI18n()

const googleMapsUrl = 'https://maps.app.goo.gl/bN187FsuPyuU9GDK8'

const titleLines = ref<HTMLElement[]>([])
const lede = ref<HTMLElement | null>(null)
const actions = ref<HTMLElement | null>(null)
const eyebrow = ref<HTMLElement | null>(null)
const stripes = ref<HTMLElement[]>([])
const panel = ref<HTMLElement | null>(null)
const heroRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.set([titleLines.value, lede.value, actions.value, eyebrow.value], { opacity: 1 })
    .from(eyebrow.value, { opacity: 0, y: 12, duration: 0.6 })
    .from(
      titleLines.value,
      { yPercent: 110, duration: 1, stagger: 0.1 },
      '-=0.25',
    )
    .from(lede.value, { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
    .from(actions.value, { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
    .from(
      stripes.value,
      { scaleX: 0, transformOrigin: 'left center', duration: 0.9, stagger: 0.06 },
      '-=1.1',
    )

  if (panel.value && heroRoot.value) {
    gsap.to(panel.value, {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRoot.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }
})
</script>

<template>
  <section id="top" ref="heroRoot" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span
        v-for="n in 7"
        :key="n"
        ref="stripes"
        class="hero__bg-line"
        :style="{ top: `${8 + n * 11}%` }"
      />
    </div>

    <div class="container hero__inner">
      <div class="hero__copy">
        <p ref="eyebrow" class="eyebrow">{{ t('hero.eyebrow') }}</p>

        <h1 class="hero__title">
          <span v-for="(w, i) in (tm('hero.titleWords') as string[])" :key="i" class="reveal-line">
            <span ref="titleLines" class="hero__title-word" v-html="w" />
          </span>
        </h1>

        <p ref="lede" class="hero__lede">
          <strong>{{ t('hero.ledeStrong') }}</strong> <br>
          {{ t('hero.ledeText') }}
        </p>

        <div ref="actions" class="hero__actions">
          <a href="#projects" class="btn btn--volt">{{ t('hero.ctaProjects') }}</a>
          <a href="#contact" class="btn">{{ t('hero.ctaContact') }}</a>
          <a
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener"
            class="hero__map-btn"
            :aria-label="t('common.mapLinkAria')"
          >
            <ContactIcon type="map" />
          </a>
        </div>
      </div>

      <div ref="panel" class="hero__panel">
        <div class="hero__panel-stripes" aria-hidden="true">
          <span v-for="n in 9" :key="n" />
        </div>
        <img src="../../assets/S3EE-NoBG.png" :alt="t('hero.panelAlt')" class="hero__panel-image">
      </div>
    </div>

    <div class="hero__cue" aria-hidden="true">
      <span class="hero__cue-line" />
      <span>{{ t('hero.scrollCue') }}</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5rem;
  overflow: clip;
  background: var(--paper);
}

.hero__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero__bg-line {
  position: absolute;
  inset-inline-start: 0;
  width: 62%;
  height: 1px;
  background: linear-gradient(90deg, rgba(var(--navy-rgb), 0.16), transparent);
}

.hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  padding-block: 2rem 4rem;
}

.hero__copy {
  position: relative;
  z-index: 2;
}

.eyebrow {
  margin-bottom: 1.6rem;
}

.hero__title {
  font-size: var(--fs-hero);
  color: var(--navy-night);
}

.reveal-line {
  display: block;
  overflow: hidden;
}

.hero__title-word {
  display: block;
}

.hero__title em {
  font-style: italic;
  color: var(--ember);
}

.hero__lede {
  max-width: 34rem;
  margin-top: 2rem;
  font-size: 1.05rem;
  color: rgba(20, 20, 20, 0.75);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 2.4rem;
}

.hero__map-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.1em;
  height: 3.1em;
  flex-shrink: 0;
  border: 1px solid var(--ink);
  border-radius: 50%;
  font-size: 1.1rem;
  color: var(--ink);
  transition:
    background-color 0.3s var(--ease-out),
    color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out);
}

.hero__map-btn:hover {
  background: var(--ink);
  color: var(--paper);
}

.hero__panel {
  position: relative;
  min-height: 320px;
  border-radius: var(--radius);
  background: var(--paper);
  border: 1px solid rgba(var(--navy-rgb), 0.12);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__panel-stripes {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1.5rem;
}

.hero__panel-stripes span {
  height: 1px;
  background: rgba(var(--navy-rgb), 0.1);
}

.hero__panel-image {
  position: relative;
  z-index: 1;
  width: min(70%, 360px);
  height: auto;
  filter: drop-shadow(0 18px 40px rgba(var(--navy-rgb), 0.18));
}

.hero__cue {
  position: absolute;
  inset-inline-start: var(--edge);
  bottom: 1.6rem;
  display: none;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.55);
}

.hero__cue-line {
  width: 28px;
  height: 1px;
  background: currentColor;
}

@media (min-width: 720px) {
  .hero__title {
    letter-spacing: -0.02em;
  }
}

@media (min-width: 960px) {
  .hero__inner {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4rem;
  }
  .hero__panel {
    min-height: 560px;
  }
  .hero__panel-image {
    width: min(60%, 460px);
  }
  .hero__cue {
    display: flex;
  }
}
</style>
