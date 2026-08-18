<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__bottom">
      <span class="footer__mark"><img src="/S3EE-NoBG.png" alt="Logo S3E" /></span>
      <p>© {{ year }} S3E - Société Études Équipements Exécutions.</p>
      <p>Structure · VRD · Électricité · Sécurité Incendie</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--navy-night);
  color: rgba(247, 246, 242, 0.8);
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding-block: 2rem;
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--fs-micro);
  color: rgba(247, 246, 242, 0.45);
}

.footer__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  margin-bottom: 0.6rem;
  background: var(--paper);
  border-radius: var(--radius);
}

.footer__mark img {
  height: 40px;
  width: auto;
  display: block;
}
</style>
