<template>
  <div id="cart-app">
    <sticky-header />
    <nav-bar />
    <main>
      <router-view />
    </main>
    <sticky-footer />
  </div>
</template>

<script>
import StickyHeader from './components/StickyHeader.vue';
import NavBar from './components/NavBar.vue';
import StickyFooter from './components/StickyFooter.vue';

export default {
  components: {
    StickyHeader,
    NavBar,
    StickyFooter
  }
}
</script>

<style>
#cart-app {
  height: 100vh;
}
</style>