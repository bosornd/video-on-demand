<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile router to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router to="/search">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          router
          :key="i"
          v-for="(menu, i) in menus"
          :to="menu.to"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="menu.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="yellow accent-4" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat><h3>MY</h3></v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <nuxt-link :to="'/'" class="link"><v-toolbar-title><b><h2>{{title}}</h2></b></v-toolbar-title></nuxt-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
       <v-btn flat><h3>로그인</h3></v-btn>
     </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <nuxt />
    </v-content>
    <v-footer
      height="auto"
      color="grey darken-3"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          grey darken-3
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2019 — <strong>oksusu</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        clipped: true,
        miniVariant: false,
        title: 'oksusu',
        menus: [
          { icon: 'filter_1', title: 'Action', to: '/genre/Action' },
          { icon: 'filter_2', title: 'Adventure', to: '/genre/Adventure' },
          { icon: 'filter_3', title: 'Animation', to: '/genre/Animation' },
          { icon: 'filter_4', title: 'Comedy', to: '/genre/Comedy' },
          { icon: 'filter_5', title: 'Drama', to: '/genre/Drama' },
          { icon: 'filter_6', title: 'Family', to: '/genre/Family' },
          { icon: 'filter_7', title: 'Romance', to: '/genre/Romance' }
        ],
        links: [
          '홈',
          '소개',
          '공지사항',
          '이용약관',
          '개인정보처리방침',
          '고객센터'
        ]

      }
    }
  }
</script>
</script>

<style>

 a:link { color: black; text-decoration: none;}
 a:visited { color: black; text-decoration: none;}
 a:hover { color: black; text-decoration: none;}

</style>
