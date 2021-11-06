<template>
  <div id="app">
    <div id="nav">
      <router-link tag="a" :to="{ name: 'home' }">Home</router-link>

      <router-link tag="a" :to="{ name: 'trader-dashboard' }">
        Trader dashboard
      </router-link>

      <router-link tag="a" :to="{ name: 'btc-monitoring' }">
        BTC Monitoring
      </router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #102754;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#nav {
  padding: 30px;
  flex: 0 0 auto;

  a {
    font-weight: bold;
    color: #453cc9;
    margin: 0 10px;
    transition: color 0.35s;

    &.router-link-exact-active {
      color: #22aff1;
      transition: color 0.35s;
    }

    &:hover {
      color: #102754;
      transition: color 0.35s;
    }
  }
}

// app colors
// #102754
// #453cc9
// #22aff1
// #d4e8ff
// #ffffff

// animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
