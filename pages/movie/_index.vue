<template>
  <v-container fluid grid-list-md>
    <v-layout v-bind="binding" row wrap pa-2>

      <v-flex xs12 sm8 md8>
          <v-card>
            <v-img :src="'http://image.tmdb.org/t/p/w185/' + movie.poster"></v-img>
          </v-card>

          <br>
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

      <v-flex xs12 sm4 md4>
        <v-card>
          <div>
            <v-layout>
              <v-subheader>Latest Movies</v-subheader>
            </v-layout>
            <v-container id="scroll-target" class="scroll-y" style="max-height: 1000px">
              <v-layout
                v-scroll:#scroll-target="onScroll"
                column
                align-center
                justify-center
                >

                <v-container grid-list-md>
                  <v-layout row wrap>
                    <v-flex xs6 sm6 v-for="card in latest":key="card.title">
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

    <br><br>
    <v-layout row wrap pa-2>
      <h3 class="headline mb-0">Recommended Movies</h3>
      <v-flex xs12 sm12 md12>
        <v-card flat>
          <v-window v-model="onboarding">
            <v-window-item v-for="n in length" :key="`card-${n}`">
                <v-layout row wrap>
                  <v-flex xs3 v-for="card in ranked.slice(4*(n-1),4*n)" :key="card.title">
                    <v-card color="white">
                      <v-img :src="'http://image.tmdb.org/t/p/w185' + card.poster" height="320px">
                      </v-img>
                    </v-card>
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
                    @click="toggle"
                  >
                    <v-icon>mdi-record</v-icon>
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
      <v-layout row wrap>
        <h3 class="headline mb-0">Comments</h3>
        <v-flex xs12 sm12 md12>
          <v-text-field
          v-model="message"
          outline
          label="comment section"
          type="text"
          append-icon="reply">
          </v-text-field>
        </v-flex>
      </v-layout>

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

    </v-container>
  </v-form>
 </v-container>
</template>

<script>
export default {
  computed: {
    binding () {
      const binding = {}

      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false

      return binding
    }
  },

  data: () => ({
    show: false,

    length: 3,
    onboarding: 0,

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

  methods: {
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
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
