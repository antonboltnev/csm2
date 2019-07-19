<template>
  <v-layout class='csm-table-filters wrap'>
    <v-flex>
      <csm-multi-select
              :select_data="selectDataNet"
              select_label="Торговая сеть"
      />
    </v-flex>
    <v-flex>
      <csm-multi-select
              :select_data="selectDataEscalation"
              select_label="Уровень эскалации"
      />
    </v-flex>
    <v-flex>
      <csm-multi-select
              :select_data="selectDataCity"
              select_label="Город"
      />
    </v-flex>
  </v-layout>
</template>

<script>

  import csmMultiSelect from '../../components/selects/csm-multi-select'

    export default {
        name: "csm-table-filters",
        components: {
            csmMultiSelect
        },
        computed: {
            selectDataCity() {
                return  [
                    'Alabama', 'Alaska', 'American Samoa', 'Arizona',
                    'Arkansas', 'California', 'Colorado', 'Connecticut',
                    'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                    'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky'
                ]
            },
            selectDataNet() {
                return [3,2,1]
            },
            selectDataEscalation() {
                return [1,2,3]
            },
            // selectLabel1() {
            //     return 'Дата создания'
            // },
            // selectLabel2() {
            //     return 'Дата закрытия'
            // }
        }
    }
</script>

<style>
  .csm-table-filters .flex {
    margin: 0 5px;
  }
</style>