<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Add Contact</router-link> |
        <router-link to="/search">Search Contacts</router-link>
      </div>
      <router-link to="/">
        <img alt="Vue logo" src="./assets/logo.png">
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  margin-bottom: 50vh;
}
#nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
  img {
    height: 75px;
  }
}
a {
  font-weight: bold;
  color: var(--color-blue);
  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
