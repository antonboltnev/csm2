<template>
  <v-app id="inspire">
    <v-container>
      <v-layout wrap column>
        <!--<csm-main-table/>-->
        <csm-order-edit-page/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import csmMainTable from './components/csm-main-table'
import csmOrderEditPage from './components/order-edit-page/csm-order-edit-page'

export default {
  name: 'app',
  components: {
      csmMainTable,
      csmOrderEditPage
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
