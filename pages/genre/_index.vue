<template>
  <v-container grid-list-lg>
    <v-layout justify-center row wrap>
      <v-flex
        v-for="card in latest"
        :key="card.title"
        xs6 sm4 md3
        v-bind="{ [`xs${card.flex}`]: true }"
      >
          <v-card nuxt-link :to="'/movie/' + card._id">
            <v-img
              :src="'http://image.tmdb.org/t/p/w185/' + card.poster"
              height="370px"
            >
              <v-container
                fluid
                fill-height
                pa-2
              >
                <v-layout align-end fill-height>
                </v-layout>

              </v-container>
            </v-img>
            <v-card-title primary-title>
             <div>
               {{card.title}}
               <div> {{ card_text }} </div>
             </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  export default {
    async asyncData ({ params, $axios }) {
      const latest = await $axios.$get('/api/movies/latest?genres.name=' + params.index)
      const ranked = await $axios.$get('/api/movies/ranked?genres.name=' + params.index)
      return {
        latest,
        ranked
      }
    }
  }
</script>
