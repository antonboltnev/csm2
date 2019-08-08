<template>
  <v-container class='csm-order-edit-page'>
    <h1 class="text-md-center">Редактирование заказа</h1>
    <csm-order-list/>
  </v-container>
</template>

<script>

  import csmOrderList from './csm-order-list'

    export default {
        name: "csm-order-edit-page",
        components: {
            csmOrderList
        }
    }
</script>

<style>
  h1 {
    margin: 50px 0;
  }
</style>