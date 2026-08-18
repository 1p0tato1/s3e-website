<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ContactIcon from './ContactIcon.vue'

const links = [
  { href: '#about', label: 'Bureau' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#engineers', label: 'L\'équipe' },
  { href: '#projects', label: 'Projets' },
]

const googleMapsUrl = 'https://maps.app.goo.gl/bN187FsuPyuU9GDK8'

const scrolled = ref(false)
const open = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

function closeMenu() {
  open.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled, 'nav--open': open }">
    <div class="nav__inner container">
      <a href="#top" class="nav__brand" @click="closeMenu">
        <img src="/S3EE-NoBG.png" alt="S3E" class="nav__mark" />
      </a>

      <nav class="nav__links" aria-label="Navigation principale">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav__link">
          <span class="nav__link-text">{{ l.label }}</span>
        </a>
      </nav>

      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener"
        class="nav__map"
        aria-label="Voir le bureau S3E sur Google Maps"
      >
        <ContactIcon type="map" />
      </a>

      <a href="#contact" class="btn nav__cta">Nous contacter</a>

      <button
        class="nav__toggle"
        :aria-expanded="open"
        aria-label="Ouvrir le menu"
        @click="open = !open"
      >
        <span />
        <span />
      </button>
    </div>

    <div class="nav__mobile" v-if="open">
      <a v-for="l in links" :key="l.href" :href="l.href" class="nav__mobile-link" @click="closeMenu">
        {{ l.label }}
      </a>
      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener"
        class="nav__mobile-link nav__mobile-map"
        @click="closeMenu"
      >
        <ContactIcon type="map" />
        Voir le bureau sur Google Maps
      </a>
      <a href="#contact" class="btn btn--volt nav__mobile-cta" @click="closeMenu">Nous contacter</a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 500;
  transition: background-color 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(247, 246, 242, 0.86);
  backdrop-filter: blur(10px);
  border-color: rgba(20, 20, 20, 0.08);
}

.nav--open {
  background: var(--paper);
  border-color: rgba(20, 20, 20, 0.08);
  min-height: 100dvh;
  overflow-y: auto;
}

.nav__inner {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-block: 1.1rem;
}

.nav__brand {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.nav__mark {
  height: 40px;
  width: auto;
  flex-shrink: 0;
  display: block;
}

.nav__links {
  display: none;
  gap: 2rem;
}

.nav__link {
  position: relative;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-block: 0.3rem;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: var(--volt);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.nav__link:hover::after {
  transform: scaleX(1);
}

.nav__cta {
  display: none;
  padding: 0.7em 1.3em;
}

.nav__map {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid rgba(20, 20, 20, 0.2);
  border-radius: 50%;
  color: var(--ink);
  font-size: 1.1rem;
  transition: border-color 0.25s var(--ease-out), color 0.25s var(--ease-out), background-color 0.25s var(--ease-out);
}

.nav__map:hover {
  border-color: var(--volt);
  background: var(--volt);
  color: var(--navy-night);
}

.nav__toggle {
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
}

.nav__toggle span {
  height: 2px;
  background: var(--ink);
  transition: transform 0.3s var(--ease-out), opacity 0.3s;
}

.nav--open .nav__toggle span:first-child {
  transform: translateY(9px) rotate(45deg);
}

.nav--open .nav__toggle span:last-child {
  transform: translateY(-9px) rotate(-45deg);
}

.nav__mobile {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0.5rem var(--edge) 2rem;
  border-top: 1px solid rgba(20, 20, 20, 0.08);
}

.nav__mobile-link {
  font-family: var(--font-display);
  font-size: 1.6rem;
  padding-block: 0.7rem;
  border-bottom: 1px solid rgba(20, 20, 20, 0.08);
}

.nav__mobile-map {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: rgba(20, 20, 20, 0.75);
}

.nav__mobile-cta {
  margin-top: 1.5rem;
  align-self: flex-start;
}

@media (min-width: 900px) {
  .nav__links {
    display: flex;
  }
  .nav__cta {
    display: inline-flex;
  }
  .nav__map {
    display: flex;
  }
  .nav__toggle {
    display: none;
  }
}
</style>
