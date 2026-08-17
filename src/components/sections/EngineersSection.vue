<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { revealUp } from '../../composables/scrollFx'
import BoltDivider from '../BoltDivider.vue'
import ContactIcon from '../ContactIcon.vue'

interface Engineer {
  name: string
  initials: string
  title: string
  specialties: string[]
  bio: string
  phones: string[]
  email: string
  linkedin?: string
  whatsapp: string
}

const engineers: Engineer[] = [
  {
    name: 'Sofiane Fayala',
    initials: 'SF',
    title: 'Ingénieur Conseil — Expert Judiciaire auprès des Tribunaux',
    specialties: ['Électricité', 'Sécurité Incendie'],
    bio: "Ingénieur Principal en Génie Électrique diplômé de l'ENIM (1996), Sofiane Fayala fonde S3E en 2000 et en assure la direction depuis. Expert Judiciaire auprès des tribunaux depuis 2023, il s'est formé auprès de grands industriels internationaux — Schneider Electric (France), ABB (Allemagne), Fermax (Espagne) — pour affiner son expertise en électricité et en sécurité incendie.",
    phones: ['Fixe: (+216) 73 845 105', 'Mobile: (+216) 23 402 862'],
    email: 'sofien.fayala@yahoo.fr',
    linkedin: 'https://www.linkedin.com/in/sofiane-fayala-4983b836/',
    whatsapp: 'https://wa.me/21623402862',
  },
  {
    name: 'Imen Fayala Grissi',
    initials: 'IF',
    title: 'Ingénieur Conseil Agréé & Expert Judiciaire | Génie Civil',
    specialties: ['Génie Civil'],
    bio: "Ingénieure Principale en Génie Civil diplômée de [ÉCOLE] ([ANNÉE]), Imen Fayala Grissi dirige le pôle Génie Civil de S3E depuis sa création. Experte Judiciaire auprès des tribunaux, elle s'est perfectionnée en calcul des structures en béton armé et des ouvrages porteurs, [ex: à travers des collaborations avec des bureaux d'études internationaux], et intervient régulièrement sur des dossiers d'expertise technique et de contentieux.",
    phones: ['Fixe: (+216) 73 845 105', 'Mobile: (+216) 98 683 846'],
    email: 'imen_fayala@yahoo.fr',
    whatsapp: 'https://wa.me/21698683846',
  },
]

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

const root = ref<HTMLElement | null>(null)
const cards = ref<HTMLElement[]>([])

onMounted(() => {
  if (cards.value.length) revealUp(cards.value, { stagger: 0.15, trigger: root.value ?? undefined })
})
</script>

<template>
  <section id="engineers" ref="root" class="engineers">
    <div class="container">
      <p class="eyebrow">L'équipe</p>
      <h2 class="engineers__title">Les ingénieurs</h2>
    </div>

    <div class="engineers__list container">
      <article
        v-for="(e, i) in engineers"
        :key="e.name"
        ref="cards"
        class="engineer reveal"
        :class="{ 'engineer--reverse': i % 2 === 1 }"
      >
        <div class="engineer__avatar">
          <div class="engineer__diamond">
            <span>{{ e.initials }}</span>
          </div>
        </div>

        <div class="engineer__body">
          <p class="engineer__title">{{ e.title }}</p>
          <h3 class="engineer__name">{{ e.name }}</h3>

          <ul class="engineer__specialties">
            <li v-for="s in e.specialties" :key="s">{{ s }}</li>
          </ul>

          <p class="engineer__bio">{{ e.bio }}</p>

          <ul class="engineer__contacts">
            <li v-for="p in e.phones" :key="p">
              <a :href="telHref(p)"><ContactIcon type="phone" />{{ p }}</a>
            </li>
            <li>
              <a :href="`mailto:${e.email}`"><ContactIcon type="mail" />{{ e.email }}</a>
            </li>
            <li v-if="e.linkedin">
              <a :href="e.linkedin" target="_blank" rel="noopener"><ContactIcon type="linkedin" />LinkedIn</a>
            </li>
            <li>
              <a :href="e.whatsapp" target="_blank" rel="noopener"><ContactIcon type="whatsapp" />WhatsApp</a>
            </li>
          </ul>
        </div>
      </article>
    </div>

    <p class="engineers__address container">
      <ContactIcon type="map" />
      Bureau n°2.2, Immeuble le 103, Av. Ibn El Jazzar, 4000 Sousse ·
      <a href="https://maps.app.goo.gl/bN187FsuPyuU9GDK8" target="_blank" rel="noopener">voir sur la carte</a>
    </p>

    <BoltDivider variant="navy" />
  </section>
</template>

<style scoped>
.engineers {
  background: var(--paper);
  padding-top: clamp(4rem, 8vw, 8rem);
}

.engineers__title {
  margin-top: 1.4rem;
  font-size: var(--fs-h1);
  color: var(--navy-night);
}

.engineers__list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 3.5rem;
}

.engineer {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}

.engineer__avatar {
  display: flex;
}

.engineer__diamond {
  width: 108px;
  height: 108px;
  flex-shrink: 0;
  background: linear-gradient(155deg, var(--navy) 0%, var(--navy-night) 100%);
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.engineer__diamond span {
  transform: rotate(-45deg);
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--paper);
}

.engineer__title {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--navy);
}

.engineer__name {
  margin-top: 0.5rem;
  font-size: var(--fs-h2);
  color: var(--ink);
}

.engineer__specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.1rem;
}

.engineer__specialties li {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.04em;
  padding: 0.35em 0.8em;
  border-radius: 999px;
  background: rgba(var(--volt-rgb), 0.16);
  color: var(--navy-night);
}

.engineer__bio {
  max-width: 38rem;
  margin-top: 1.3rem;
  color: rgba(20, 20, 20, 0.75);
}

.engineer__contacts {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1.6rem;
}

.engineer__contacts a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: var(--ink);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s, color 0.25s;
}

.engineer__contacts a:hover {
  border-color: var(--volt);
  color: var(--navy);
}

.engineers__address {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(20, 20, 20, 0.12);
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  color: rgba(20, 20, 20, 0.7);
  flex-wrap: wrap;
}

.engineers__address a {
  color: var(--navy);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (min-width: 780px) {
  .engineer {
    grid-template-columns: 160px 1fr;
    gap: 3rem;
  }

  .engineer--reverse {
    grid-template-columns: 1fr 160px;
  }

  .engineer--reverse .engineer__avatar {
    order: 2;
    justify-content: flex-end;
  }

  .engineer--reverse .engineer__body {
    order: 1;
    text-align: right;
  }

  .engineer--reverse .engineer__specialties,
  .engineer--reverse .engineer__contacts {
    align-items: flex-end;
  }

  .engineer--reverse .engineer__specialties {
    justify-content: flex-end;
  }

  .engineer--reverse .engineer__bio {
    margin-left: auto;
  }
}
</style>