<template>
  <div>
    <h1 class="text-md-center">Пользователь</h1>
    <v-container>
      <v-layout class="justify-center">
        <v-flex xs2>
          <v-avatar
                  class="profile"
                  :size="$vuetify.breakpoint.smAndUp ? 164 : 128"
                  color="grey"
          >
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex xs6>
          <v-layout class='csm-user-info wrap'>
            <v-flex xs12 ml-2 mr-2>
              <v-text-field
                      class="body-2"
                      label="Клиент КП"
                      placeholder="Введите имя"
                      outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 ml-2 mr-2>
              <v-text-field
                      class="body-2"
                      label="Email"
                      placeholder="Введите Email"
                      outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs12 ml-2 mr-2>
              <v-text-field
                      type="tel"
                      class="body-2"
                      label="Телефон"
                      placeholder="Введите номер"
                      outlined
              ></v-text-field>
            </v-flex>
            <v-flex xs3 ml-2 mr-2 mt-0 mb-5>
              <v-btn min-height="54" tile color="success body-2">Отправить код</v-btn>
            </v-flex>
            <v-flex xs3 ml-2 mr-2>
              <v-text-field
                      type="number"
                      class="body-2"
                      label="Код из СМС"
                      placeholder="Введите код"
                      outlined
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
    export default {
        name: "csm-user-info",
    }
</script>

<style>

</style>