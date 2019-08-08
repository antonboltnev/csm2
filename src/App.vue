<template>
  <v-app id="inspire">
    <v-layout>
      <csm-navigation-drawer/>
      <v-layout wrap column>
        <keep-alive>
          <router-view name="content" />
        </keep-alive>
      </v-layout>
    </v-layout>
  </v-app>
</template>

<script>
import csmNavigationDrawer from './components/csm-navigation-drawer'

export default {
  name: 'app',
  components: {
      csmNavigationDrawer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
