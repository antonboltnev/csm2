<template>
  <div class='csm-main-table'>
    <csm-table-tabs></csm-table-tabs>
    <keep-alive>
      <router-view name="tableHead" />
    </keep-alive>
    <keep-alive>
      <router-view name="tableBody" />
    </keep-alive>
  </div>
</template>

<script>

    import csmTableTabs from '../components/table-inner-components/csm-table-tabs'

    export default {
        name: "csm-main-table",
        components: {
            csmTableTabs
        }
    }
</script>

<style scoped>

</style>