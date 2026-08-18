<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { revealUp } from '../../composables/scrollFx'
import ContactIcon from '../ContactIcon.vue'

const { t, tm } = useI18n()

const contactsMeta = [
  {
    id: 'sofiane' as const,
    email: 'sofien.fayala@yahoo.fr',
    phone: '+216 23 402 862',
    whatsapp: 'https://wa.me/21623402862',
    linkedin: 'https://www.linkedin.com/in/sofiane-fayala-4983b836/',
  },
  {
    id: 'imen' as const,
    email: 'imen_fayala@yahoo.fr',
    phone: '+216 98 683 846',
    whatsapp: 'https://wa.me/21698683846',
  },
]

const contacts = computed(() =>
  contactsMeta.map((c) => ({
    ...c,
    name: t(`team.${c.id}.name`),
    role: (tm(`team.${c.id}.specialties`) as unknown as string[]).join(' · '),
  })),
)

const form = reactive({
  name: '',
  email: '',
  recipient: contactsMeta[0]!.email,
  message: '',
})

const sent = ref(false)

const officeCoords = { lat: 35.8272352, lon: 10.632845 }
const googleMapsUrl = 'https://maps.app.goo.gl/bN187FsuPyuU9GDK8'
const osmEmbedUrl = (() => {
  const { lat, lon } = officeCoords
  const dLat = 0.006
  const dLon = 0.014
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].join(',')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
})()

function submitForm() {
  const to = form.recipient
  const subject = encodeURIComponent(
    `${t('contact.mailSubjectPrefix')} — ${form.name || t('contact.mailNewMessage')}`,
  )
  const body = encodeURIComponent(
    `${t('contact.mailBodyName')} : ${form.name}\n${t('contact.mailBodyEmail')} : ${form.email}\n\n${form.message}`,
  )
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  sent.value = true
}

const root = ref<HTMLElement | null>(null)
const left = ref<HTMLElement | null>(null)
const right = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (left.value) revealUp(left.value.children, { stagger: 0.12, trigger: left.value })
  if (right.value) revealUp(right.value, { trigger: right.value })
  if (mapEl.value) revealUp(mapEl.value, { trigger: mapEl.value })
})
</script>

<template>
  <section id="contact" ref="root" class="contact">
    <div class="container contact__inner">
      <div ref="left" class="contact__left">
        <div class="reveal">
          <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
          <h2 class="contact__title">{{ t('contact.title') }}</h2>
        </div>

        <div class="contact__cards reveal">
          <article v-for="c in contacts" :key="c.id" class="contact__card">
            <p class="contact__card-role">{{ c.role }}</p>
            <h3 class="contact__card-name">{{ c.name }}</h3>
            <ul class="contact__card-links">
              <li>
                <a :href="`tel:${c.phone.replace(/[^\d+]/g, '')}`"><ContactIcon type="phone" /><span dir="ltr">{{ c.phone }}</span></a>
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
              <li>
                <a :href="googleMapsUrl" target="_blank" rel="noopener"><ContactIcon type="map" />{{ t('common.address') }}</a>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <form ref="right" class="contact__form reveal" @submit.prevent="submitForm">
        <p class="eyebrow">{{ t('contact.formEyebrow') }}</p>

        <label class="contact__field">
          <span>{{ t('contact.fieldName') }}</span>
          <input v-model="form.name" type="text" name="name" required :placeholder="t('contact.placeholderName')" />
        </label>

        <label class="contact__field">
          <span>{{ t('contact.fieldEmail') }}</span>
          <input v-model="form.email" type="email" name="email" required :placeholder="t('contact.placeholderEmail')" />
        </label>

        <label class="contact__field">
          <span>{{ t('contact.fieldRecipient') }}</span>
          <select v-model="form.recipient" name="recipient">
            <option v-for="c in contacts" :key="c.email" :value="c.email">{{ c.name }}</option>
          </select>
        </label>

        <label class="contact__field">
          <span>{{ t('contact.fieldMessage') }}</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="5"
            required
            :placeholder="t('contact.placeholderMessage')"
          />
        </label>

        <button type="submit" class="btn btn--volt">{{ t('contact.submit') }}</button>
        <p v-if="sent" class="contact__sent">{{ t('contact.sentMessage') }}</p>
      </form>
    </div>

    <div ref="mapEl" class="contact__map reveal">
      <iframe
        class="contact__map-frame"
        :src="osmEmbedUrl"
        loading="lazy"
        :title="t('contact.mapIframeTitle')"
      />
      <a class="contact__map-text" :href="googleMapsUrl" target="_blank" rel="noopener">
        <ContactIcon type="map" />
        <div>
          <strong>{{ t('contact.mapCardTitle') }}</strong>
          <span>{{ t('contact.mapCardSubtitle') }}</span>
        </div>
      </a>
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
  position: relative;
  width: 100%;
  margin-top: clamp(4rem, 8vw, 6.5rem);
  overflow: hidden;
  background: var(--navy-night);
}

.contact__map-frame {
  display: block;
  width: 100%;
  height: clamp(320px, 42vw, 480px);
  border: 0;
  filter: grayscale(0.55) contrast(1.05) brightness(1.03);
}

.contact__map-text {
  position: absolute;
  inset-inline-start: var(--edge);
  bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  max-width: min(24rem, calc(100% - 2 * var(--edge)));
  padding: 1.1rem 1.4rem;
  background: rgba(247, 246, 242, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(20, 20, 20, 0.1);
  border-radius: var(--radius);
  box-shadow: 0 18px 34px -18px rgba(var(--navy-night-rgb), 0.55);
  color: var(--ink);
  text-decoration: none;
  transition: transform 0.25s var(--ease-out), box-shadow 0.25s;
}

.contact__map-text:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 40px -16px rgba(var(--navy-night-rgb), 0.65);
}

.contact__map-text div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: var(--fs-small);
}

.contact__map-text strong {
  color: var(--navy-night);
}

.contact__map-text span {
  color: rgba(20, 20, 20, 0.55);
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
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
