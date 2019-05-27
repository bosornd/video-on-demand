<template>
  <v-container fluid grid-list-md>
    <v-layout v-bind="binding" align-center justify-center full-height row wrap pa-2>
        <v-flex xs12 sm5 md5>
          <v-card height>
              <v-card>
                <v-img :src="movie.poster"></v-img>
              </v-card>
              <v-card>
                <v-card-title primary-title>
                  <h3 class="headline mb-0">{{movie.title}}</h3>
                </v-card-title>
                <v-card-actions class="pa-3">
                  <v-icon color="yellow accent-4" size="19">star</v-icon>
                  {{movie.vote_average}}
                  &nbsp;&nbsp;give rating
                  <v-rating
                    v-model="rating"
                    background-color="grey"
                    color="red"
                    dense
                    half-increments
                    size="18"
                  ></v-rating>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
              <v-card color="grey lighten-3">
                <v-card-title>
                  <div>
                    <strong class="mr-2">Genres</strong>
                    <span v-text class="mr-2" v-for="(genre,i) in movie.genres" :key="i">{{genre.name}}</v-text></span>
                    |<strong class="ma-2">Release Date</strong>{{movie.released_date}}
                    |<strong class="ma-2">Running Time</strong>{{movie.running_time}} min
                  </div>
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                  <strong>movie plot</strong>
                    <v-btn icon @click="show = !show">
                     <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                </v-card-actions>
               <v-slide-y-transition>
                  <v-card-text v-show="show">
                    {{movie.description}}
                  </v-card-text>
                </v-slide-y-transition>
              </v-card>
            </v-card>
          </v-flex>
      </v-layout>
 </v-container>
</template>

<script>
export default {
  data: () => ({
    rating: 0,
    show: false,
    length: 3,
    onboarding: 0,
    message: '',
  }),
  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get('/api/movies/' + params.id)
    $axios.$put('/api/movies/' + params.id, { $set: { 'count': movie.count + 1 } })
    return {
      movie
    }
  },

}
</script>
