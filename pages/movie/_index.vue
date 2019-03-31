<template>
  <div>
    <notice></notice>
    <v-container fluid grid-list-md>
      <v-layout v-bind="binding" align-center justify-center full-height row wrap pa-2>

          <v-flex xs12 sm5 md5>
            <v-card height>
                <v-card>
                  <v-img :src="movie.poster"></v-img>
                </v-card>

                <v-card>
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
                    <strong>Genres</strong>&nbsp;
                    <v-text v-for="(genre,i) in movie.genres" :key="i">{{genre.name}} &nbsp;</v-text>
                    |&nbsp;<strong>Release Date</strong>&nbsp;{{movie.released_date}}
                    |&nbsp;<strong>Running Time</strong>&nbsp;{{movie.running_time}} min
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

              <v-card color="grey lighten-3">
                <v-card-title>
                  <div>
                    <strong class="mr-2">Genres</strong>
                    <span v-text class="mr-2" v-for="(genre,i) in movie.genres" :key="i">{{genre.name}}</v-text></span>
                    |<strong class="ma-2">Release Date</strong>{{movie.released_date}}
                    |<strong class="ma-2">Running Time</strong>{{movie.running_time}} min
                  </div>
                </v-card-title>

          <v-flex xs12 sm3 md3>
            <v-card height>
              <v-layout>
                <v-subheader>Latest Movies</v-subheader>
              </v-layout>
              <v-container fluid id="scroll-target" class="scroll-y" style="max-height: 1000px">
                <v-layout
                  v-scroll:#scroll-target="onScroll"
                  column
                  align-center
                  justify-center
                  >

                    <v-container grid-list-md>
                      <v-layout row wrap>
                        <v-flex xs6 sm6 md6 v-for="card in latest":key="card.title">
                          <v-hover>
                            <v-card slot-scope="{ hover }" class="mx-auto">
                              <nuxt-link :to="'/movie/' + card._id">
                                <v-img :src="card.poster">
                                  <v-transition class="fade-transition">
                                    <div
                                      v-if="hover"
                                      class="d-flex black darken-2 v-card--reveal"
                                      style="height: 100%"
                                    >
                                    </div>
                                  </v-transition>
                                </v-img>
                              </nuxt-link>
                            </v-card>
                          </v-hover>
                          <v-card-text>
                            {{card.title}}
                          </v-card-text>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-layout>
                </v-container>
              </v-card>
          </v-flex>
        </v-layout>


        <v-flex xs12 sm3 md3>
          <v-card height>
            <v-layout>
              <v-subheader>Latest Movies</v-subheader>
            </v-layout>
            <v-container fluid id="scroll-target" class="scroll-y" style="max-height: 1000px">
              <v-layout
                v-scroll
                column
                align-center
                justify-center
                >

                  <v-container grid-list-md>
                    <v-layout row wrap>
                      <v-flex xs6 sm6 md6 v-for="card in latest":key="card.title">
                        <v-hover>
                          <v-card slot-scope="{ hover }" class="mx-auto">
                            <nuxt-link :to="'/movie/' + card._id">
                              <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster">
                                <transition class="fade-transition">
                                  <div
                                    v-if="hover"
                                    class="d-flex black darken-2 v-card--reveal"
                                    style="height: 100%"
                                  >
                                  </div>
                                </transition>
                              </v-img>
                            </nuxt-link>
                          </v-card>
                        </v-hover>
                        <v-card-text>
                          {{card.title}}
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-layout>
              </v-container>
            </v-card>
        </v-flex>
      </v-layout>


    <br><br>
    <v-layout align-center justify-center row wrap pa-2>
      <v-flex xs12 sm8 md8>
        <div><h3 class="headline mb-0">Recommended Movies</h3></div>
      </v-flex>
      <v-flex xs12 sm8 md8>
        <v-card flat>
          <v-window v-model="onboarding">
            <v-window-item v-for="n in length" :key="`card-${n}`">
                <v-layout row wrap>
                  <v-flex xs3 sm3 md3 v-for="card in ranked.slice(4*(n-1),4*n)" :key="card.title">
                    <v-hover>
                      <v-card slot-scope="{ hover }" class="mx-auto">
                        <nuxt-link :to="'/movie/' + card._id">
                          <v-img :src="'http://image.tmdb.org/t/p/w185' + card.poster" height="320px">
                            <transition class="fade-transition">
                              <div
                                v-if="hover"
                                class="d-flex black darken-2 v-card--reveal white--text"
                                style="height: 100%"
                              >
                                <div class="pa-4">
                                  <p><v-icon color="yellow">star</v-icon> {{card.vote_average}}</p>
                                  <h2>{{card.title}}</h2>
                                  <p><h3>{{card.description.slice(0,150)}}...</h3></p>
                                </div>
                            </div>
                          </transition>
                          </v-img>
                        </nuxt-link>
                      </v-card>
                  </v-hover>
                    <v-card-text>
                      {{card.title}}
                    </v-card-text>
                  </v-flex>
                </v-layout>
            </v-window-item>
          </v-window>

          <v-card-actions class="justify-center">
            <v-item-group
                v-model="onboarding"
                class="text-xs-center"
                mandatory
            >
                <v-item
                  v-for="n in length"
                  :key="`btn-${n}`"
                >
                  <v-btn
                    slot-scope="{ active, toggle }"
                    :input-value="active"
                    icon
                    :color="active ? 'grey darken-2' : 'grey lighten-2'"
                    @click="toggle"
                  >
                  </v-btn>
                </v-item>
              </v-item-group>
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>

  <br>
  <v-form>
    <v-container>
      <v-layout align-center justify-center row wrap pa-2>
        <v-flex xs12 sm9 md9>
        <h3 class="headline mb-0">Comments</h3>
      </v-flex>
        <v-flex xs12 sm9 md9>
          <v-text-field
          v-model="message"
          outline
          label="comment section"
          type="text"
          append-icon="reply">
          </v-text-field>
        </v-flex>
          <v-flex xs12 sm9 md9>
            <v-text-field
            v-model="message"
            outline
            label="comment section"
            type="text"
            append-icon="reply">
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-layout align-center justify-center row wrap pa-2>
          <v-flex xs12 sm9 md9>
            <v-list two-line>
              <template v-for="(comment, index) in comments.slice(0, 6)">
                <v-subheader v-if="comments.date" :key="comments.date"></v-subheader>
                <v-divider v-else-if="comment.divider" :key="index"></v-divider>
                <v-list-tile-content>
                  <v-list-tile-title v-html="comment.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="comment.text"></v-list-tile-sub-title>
                </v-list-tile-content>
              </template>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
   </v-container>
 </div>
</template>

<script>
import notice from '~/components/notice.vue'
export default {
  computed: {
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false

      return binding
    }
  },
  components: {
    notice
  },
  data: () => ({
    rating: 0,
    show: false,

    length: 3,
    onboarding: 0,

    message: '',

    comments: [
      { date: 'Today' },
      { name: 'merc**', text: 'comment' },
      { divider: true },
      { name: 'Summer BBQ', text: 'asd' },
      { divider: true },
      { name: 'Oui oui', text: 'fdfdfdf' },
      { divider: true },
      { name: 'Birthday gift', text: 'ghghghg' },
      { divider: true },
      { name: 'Recipe', text: 'ew et wtqwt wtwet qt e' }
    ]
  }),

  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get('/api/movies/' + params.index)
    const latest = await $axios.$get('/api/movies/latest?genres.name=' + 'Drama')
    const ranked = await $axios.$get('/api/movies/ranked?genres.name=' + 'Drama')

    console.log(movie)
    return {
      movie,
      latest,
      ranked
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .7;
  position: absolute;
  width: 100%;
}
</style>
