<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-text-field v-model="title" prepend-icon="search" label="Title or Description" @keyup.enter="search"></v-text-field>
      </v-flex>
      <v-flex v-if="searched.length" xs12>searched movies</v-flex>
      <v-container v-if="searched.length" fluid grid-list-md xs12>
        <v-layout row wrap>
          <v-flex v-for="card in searched" :key="card.title" xs12 sm4 md2>
            <v-hover>
              <v-card
                slot-scope="{hover}"
                class="mx-auto"
                max-width="400"
                height="360"
                :to="'/movie/' + card._id"
              >
              <v-img :src="card.poster" height=360px>
                <transition class="fade-transition">
                  <div
                    v-if="hover"
                    class="d-flex black darken-2 v-card--reveal white--text"
                    style="height: 100%"
                  >
                    <div class="pa-4">
                      <p><v-icon color="yellow">star</v-icon> {{card.vote_average}}</p>
                      <h2>{{card.title}}</h2>
                      <p><h3>{{card.description.slice(0,100)}}...</h3></p>
                    </div>
                  </div>
                </transition>
              </v-img>
            </v-card>
          </v-hover>
          <div>
            <span><h3>{{card.title}}</h3></span>
          </div>
        </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      searched: []
    }
  },

  methods: {
    async search () {
      console.log(this.title)
      this.searched = await this.$axios.$get('/api/movies/search?text=' + this.title)
    }
  }
}
</script>
