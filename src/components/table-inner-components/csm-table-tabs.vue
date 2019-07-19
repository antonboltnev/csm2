<template>
  <div class='csm-table-tabs'>
    <v-tabs
        color="transparent"
    >
    <v-tab>
      <router-link :to="{name: 'tabAll'}">Все</router-link>
    </v-tab>
    <v-tab>
      <router-link :to="{name: 'tabEscalation'}">На эскалации</router-link>
    </v-tab>
    <v-tab>
      <router-link :to="{name: 'tabInWork'}">Мои в работе</router-link>
    </v-tab>
    <v-tab>
      <router-link :to="{name: 'tabNew'}">Мои новые</router-link>
    </v-tab>
    </v-tabs>
  </div>
</template>

<script>
    export default {
        name: "csm-table-tabs"
    }
</script>

<style>
  a {
    text-decoration: none;
  }
</style>