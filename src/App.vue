<script setup lang="ts">
import { onMounted } from 'vue'
import { useLenis } from './composables/useLenis'
import AppNav from './components/AppNav.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExpertiseSection from './components/sections/ExpertiseSection.vue'
import EngineersSection from './components/sections/EngineersSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'

onMounted(() => {
  useLenis()
})
</script>

<template>
  <AppNav />
  <main>
    <HeroSection />
    <AboutSection />
    <ExpertiseSection />
    <EngineersSection />
    <ProjectsSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
