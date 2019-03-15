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
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="yellow accent-4" fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat><h3>랭킹</h3></v-btn>
       <v-btn flat><h3>MY</h3></v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-title><b><h2>{{title}}</h2></b></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat><h3>이벤트</h3></v-btn>
       <v-btn flat><h3>로그인</h3></v-btn>
     </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>


    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
        title: 'Simple Video-on-Demand Example'
      }
    },
    computed: {
      items: function () {
        return [
          { icon: 'filter_1', title: 'Action', to: '/genre/Action' },
          { icon: 'filter_2', title: 'Adventure', to: '/genre/Adventure' },
          { icon: 'filter_3', title: 'Animation', to: '/genre/Animation' },
          { icon: 'filter_4', title: 'Comedy', to: '/genre/Comedy' },
          { icon: 'filter_5', title: 'Drama', to: '/genre/Drama' },
          { icon: 'filter_6', title: 'Family', to: '/genre/Family' },
          { icon: 'filter_7', title: 'Romance', to: '/genre/Romance' },
          { icon: 'filter_8', title: 'Science Fiction', to: '/genre/Science Fiction' },
          { icon: 'filter_9', title: 'TV Movie', to: '/genre/TV Movie' }
        ]
      }
    },
    methods: {
    }
  }
</script>
