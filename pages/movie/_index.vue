<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-img :src="'http://image.tmdb.org/t/p/w185/' + movie.poster" />

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{movie.title}}</h3>
            <div>{{movie.description}}</div>
          </div>
        </v-card-title>
      </v-card>

      <v-card>
        11111111
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get('/api/movies/' + params.index)
    console.log(movie)
    return {
      movie
    }
  }
}
</script>
