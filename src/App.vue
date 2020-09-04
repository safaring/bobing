<template>
  <div id="app">
    <transition enter-active-class="animated fadeIn init-animated">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  @import 'style/base';

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .animated {
    animation-duration: 0.3s !important;
  }

  .init-animated {
    animation-duration: 0.5s !important;
  }
</style>