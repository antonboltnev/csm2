<template>
    <v-sheet class='csm-navigation-drawer border' tile>
      <v-navigation-drawer
              expand-on-hover
              permanent
              color="#2f2946"
              dark
      >
        <template v-slot:prepend>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item
                    link
                    two-line
            >
              <v-list-item-content>
                <v-list-item-title class="title">Ваня Иванов</v-list-item-title>
                <v-list-item-subtitle>ваня88@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>

        <v-divider></v-divider>

        <v-list
                nav
                dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Список товаров</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Логистика</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Доставка</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
</template>

<script>
    export default {
        name: "csm-navigation-drawer"
    }
</script>

<style scoped>

</style>