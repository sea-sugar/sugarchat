<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./css/common.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background:url("./assets/bgc.png");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

body{
  margin:0;
  padding:0;
  border:0
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
