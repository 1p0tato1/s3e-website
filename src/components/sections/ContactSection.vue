<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { revealUp } from '../../composables/scrollFx'
import ContactIcon from '../ContactIcon.vue'

const contacts = [
  {
    name: 'Sofiane Fayala',
    role: 'Électricité · Sécurité Incendie',
    email: 'sofien.fayala@yahoo.fr',
    phone: '+216 23 402 862',
    whatsapp: 'https://wa.me/21623402862',
    linkedin: 'https://www.linkedin.com/in/sofiane-fayala-4983b836/',
  },
  {
    name: 'Imen Fayala Grissi',
    role: 'Génie Civil',
    email: 'imen_fayala@yahoo.fr',
    phone: '+216 98 683 846',
    whatsapp: 'https://wa.me/21698683846',
  },
]

const form = reactive({
  name: '',
  email: '',
  recipient: contacts[0]!.email,
  message: '',
})

const sent = ref(false)

function submitForm() {
  const to = form.recipient
  const subject = encodeURIComponent(`Contact site S3E — ${form.name || 'Nouveau message'}`)
  const body = encodeURIComponent(
    `Nom : ${form.name}\nEmail : ${form.email}\n\n${form.message}`,
  )
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  sent.value = true
}

const root = ref<HTMLElement | null>(null)
const left = ref<HTMLElement | null>(null)
const right = ref<HTMLElement | null>(null)

onMounted(() => {
  if (left.value) revealUp(left.value.children, { stagger: 0.12, trigger: left.value })
  if (right.value) revealUp(right.value, { trigger: right.value })
})
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <div class="container contact__inner">
      <div ref="left" class="contact__left">
        <div class="reveal">
          <p class="eyebrow">Contact</p>
          <h2 class="contact__title">Parlons de votre projet.</h2>
        </div>

        <div class="contact__cards reveal">
          <article v-for="c in contacts" :key="c.name" class="contact__card">
            <p class="contact__card-role">{{ c.role }}</p>
            <h3 class="contact__card-name">{{ c.name }}</h3>
            <ul class="contact__card-links">
              <li>
                <a :href="`tel:${c.phone.replace(/[^\d+]/g, '')}`"><ContactIcon type="phone" />{{ c.phone }}</a>
              </li>
              <li>
                <a :href="`mailto:${c.email}`"><ContactIcon type="mail" />{{ c.email }}</a>
              </li>
              <li v-if="c.linkedin">
                <a :href="c.linkedin" target="_blank" rel="noopener"><ContactIcon type="linkedin" />LinkedIn</a>
              </li>
              <li>
                <a :href="c.whatsapp" target="_blank" rel="noopener"><ContactIcon type="whatsapp" />WhatsApp</a>
              </li>
            </ul>
          </article>
        </div>

        <a
          class="contact__map reveal"
          href="https://maps.app.goo.gl/bN187FsuPyuU9GDK8"
          target="_blank"
          rel="noopener"
        >
          <div class="contact__map-plan" aria-hidden="true">
            <span v-for="n in 6" :key="n" />
          </div>
          <div class="contact__map-text">
            <ContactIcon type="map" />
            <div>
              <strong>Bureau n°2.2, Immeuble le 103</strong>
              <span>Av. Ibn El Jazzar, 4000 Sousse — ouvrir dans Google Maps</span>
            </div>
          </div>
        </a>
      </div>

      <form ref="right" class="contact__form reveal" @submit.prevent="submitForm">
        <p class="eyebrow">Écrivez-nous</p>

        <label class="contact__field">
          <span>Nom</span>
          <input v-model="form.name" type="text" name="name" required placeholder="Votre nom" />
        </label>

        <label class="contact__field">
          <span>Email</span>
          <input v-model="form.email" type="email" name="email" required placeholder="vous@exemple.com" />
        </label>

        <label class="contact__field">
          <span>Destinataire</span>
          <select v-model="form.recipient" name="recipient">
            <option v-for="c in contacts" :key="c.email" :value="c.email">{{ c.name }}</option>
          </select>
        </label>

        <label class="contact__field">
          <span>Message</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="5"
            required
            placeholder="Décrivez votre projet en quelques mots…"
          />
        </label>

        <button type="submit" class="btn btn--volt">Envoyer le message</button>
        <p v-if="sent" class="contact__sent">Votre client mail va s'ouvrir pour finaliser l'envoi.</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--paper);
  padding-block: clamp(4rem, 8vw, 8rem);
}

.contact__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
}

.contact__title {
  margin-top: 1.4rem;
  font-size: var(--fs-h1);
  color: var(--navy-night);
  max-width: 22rem;
}

.contact__cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3rem;
}

.contact__card {
  padding: 1.6rem;
  border: 1px solid rgba(20, 20, 20, 0.14);
  border-radius: var(--radius);
}

.contact__card-role {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--navy);
}

.contact__card-name {
  margin-top: 0.4rem;
  font-size: 1.4rem;
}

.contact__card-links {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 1rem;
}

.contact__card-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: var(--fs-small);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s, color 0.25s;
}

.contact__card-links a:hover {
  border-color: var(--volt);
  color: var(--navy);
}

.contact__map {
  display: block;
  position: relative;
  margin-top: 1.5rem;
  border: 1px solid rgba(20, 20, 20, 0.14);
  border-radius: var(--radius);
  overflow: hidden;
}

.contact__map-plan {
  height: 90px;
  background: var(--navy-night);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-inline: 1rem;
}

.contact__map-plan span {
  width: 1px;
  height: 60%;
  background: rgba(247, 246, 242, 0.14);
}

.contact__map-text {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.1rem 1.3rem;
  color: var(--ink);
}

.contact__map-text div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: var(--fs-small);
}

.contact__map-text span {
  color: rgba(20, 20, 20, 0.55);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 2rem;
  background: var(--paper-dim);
  border: 1px solid rgba(20, 20, 20, 0.12);
  border-radius: var(--radius);
  align-self: start;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contact__field span {
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(20, 20, 20, 0.6);
}

.contact__field input,
.contact__field select,
.contact__field textarea {
  padding: 0.75em 0.9em;
  background: var(--paper);
  border: 1px solid rgba(20, 20, 20, 0.2);
  border-radius: var(--radius);
  resize: vertical;
}

.contact__field input:focus,
.contact__field select:focus,
.contact__field textarea:focus {
  border-color: var(--navy);
}

.contact__form .btn {
  margin-top: 0.4rem;
  align-self: flex-start;
}

.contact__sent {
  font-size: var(--fs-small);
  color: var(--navy);
}

@media (min-width: 960px) {
  .contact__inner {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 4.5rem;
  }
}
</style>
