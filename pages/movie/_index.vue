<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs8 sm8>

        <v-card>
          <v-img :src="'http://image.tmdb.org/t/p/w185/' + movie.poster" />

<!-- <          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{movie.title}}</h3>
              <div>{{movie.description}}</div>
            </div>
          </v-card-title>
        </v-card>

        <v-card>-->
          <v-card-title primary-title>
            <div>
            <h3 class="headline mb-0">{{movie.title}}</h3>
            <v-icon color="yellow accent-4">star</v-icon>
            &nbsp;{{movie.vote_average}}
            <br><br>
            <div style="float:left;">give rating</div>
            <div style="float:left;"> <v-rating v-model="rating"
            background-color="grey"
            color="red" small></v-rating></div>
            </div>
          </v-card-title>
        </v-card>

        <v-card color="grey lighten-3">
          <v-card-title>
            <!-- <strong>genres</strong>&nbsp;{{movie.genres.name}}&nbsp; -->
            |&nbsp;<strong>release date</strong>&nbsp;{{movie.released_date}}
          </v-card-title>

          <v-card-actions>
          <v-spacer></v-spacer>
          <strong>movie plot</strong>
           <v-btn icon @click="show = !show">
             <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
           </v-btn>
         </v-card-actions>

         <v-slide-y-transition>
            <v-card-text v-show="show">
              {{movie.description}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>

      <v-flex xs4 sm4>
        <v-card>
          <div>
            <v-layout>
              <v-subheader>Latest Movies</v-subheader>
            </v-layout>
            <v-container
              id="scroll-target"
              style="max-height: 400px"
              class="scroll-y">
              <v-layout
                v-scroll:#scroll-target="onScroll"
                column
                align-center
                justify-center
                style="height: 1000px"
              >
                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs12 sm6 v-for="card in latest":key="card.title">
                      <v-card>
                        <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster">
                        </v-img>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>

              </v-layout>
            </v-container>
          </div>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get('/api/movies/' + params.index)
    const latest = await $axios.$get('/api/movies/latest?genres.name=' + 'Drama')
    console.log(movie)
    return {
      movie,
      latest
    }
  }
}
</script>
