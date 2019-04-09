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
                  <v-btn color="yellow accent-4" depressed @click="watch($auth)"><h3>watch</h3></v-btn>
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
                              <v-img :src="card.poster" :aspect-ratio="10/16">
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
                        <div class="body-1">{{card.title}}</div>
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
                          <v-img :src="card.poster" height="320px">
                            <transition class="fade-transition">
                              <div
                                v-if="hover"
                                class="d-flex black darken-2 v-card--reveal white--text"
                                style="height: 100%"
                              >
                                <div class="pa-4">
                                  <p><v-icon color="yellow">star</v-icon> {{card.vote_average}}</p>
                                  <h2>{{card.title}}</h2>
                                  <p><h4>{{card.description.slice(0,100)}}...</h4></p>
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
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false

      return binding
    }
  },

  data: () => ({
    rating: 0,
    show: false,

    length: 3,
    onboarding: 0,

    message: '',

    comments: [
      { date: 'Today' },
      { name: 'merc**', text: '좋은 영화네요' },
      { divider: true },
      { name: 'Summ***', text: '극장에서 봤어야 할 영화네요! 감동!' },
      { divider: true },
      { name: 'Ou***', text: '꼭 보세요. 굿~!' }
    ]
  }),
  methods: {
    watch (auth, $axios) {
      console.log(auth.user)
      axios.put('/api/users/' + auth.user.id, { $push: { 'movies': { id: this.movie._id, title: this.movie.title, poster: this.movie.poster } } })
        .then((r) => {
          console.log('watch success')
        })
        .catch((e) => {
          console.log('watch error')
        })
    }
  },
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
