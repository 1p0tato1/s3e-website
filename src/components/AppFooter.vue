<script setup lang="ts">
import LogoMark from './LogoMark.vue'

const year = new Date().getFullYear()

const links = [
  { href: '#about', label: 'Bureau' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#engineers', label: 'Ingénieurs' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__mark"><LogoMark fill="var(--paper)" bolt="var(--volt)" /></span>
        <div>
          <p class="footer__wordmark">S·3·E</p>
          <p class="footer__tagline">Bureau d'études — Sousse, Tunisie — depuis 2000</p>
        </div>
      </div>

      <nav class="footer__links" aria-label="Navigation pied de page">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <div class="footer__meta">
        <a href="https://www.linkedin.com/in/sofiane-fayala-4983b836/" target="_blank" rel="noopener"
          >LinkedIn</a
        >
        <a href="https://maps.app.goo.gl/bN187FsuPyuU9GDK8" target="_blank" rel="noopener">Localisation</a>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>© {{ year }} S3E — Société Études Équipements Exécutions.</p>
      <p>Structure · VRD · Électricité · Sécurité Incendie</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--navy-night);
  color: rgba(247, 246, 242, 0.8);
  padding-top: 4rem;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(247, 246, 242, 0.12);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__mark {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.footer__wordmark {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--paper);
}

.footer__tagline {
  margin-top: 0.2rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.04em;
  color: rgba(247, 246, 242, 0.5);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
}

.footer__links a:hover {
  color: var(--volt);
}

.footer__meta {
  display: flex;
  gap: 1.4rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
}

.footer__meta a:hover {
  color: var(--volt);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem;
  padding-block: 1.5rem;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  color: rgba(247, 246, 242, 0.45);
}

@media (min-width: 780px) {
  .footer__inner {
    grid-template-columns: 1.4fr 1fr 1fr;
    align-items: center;
  }
}
</style>
