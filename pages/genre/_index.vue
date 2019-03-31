
<template>
  <div>
    <notice></notice>
    <v-container grid-list-lg>
      <v-layout justify-center row wrap>
        <v-flex xs12 sm12 md12>
        </v-flex>
        <v-flex xs12 sm12 md12>
        </v-flex>
        <v-flex xs12 sm12 md12>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-tabs fixed-tabs hide-slider>
           <v-tab
             v-for="item in items"
             :key="item.title"
             :to="`${item.to}`"
           >
             {{item.title}}
           </v-tab>
          </v-tabs>
        </v-flex>
        <v-flex
          v-for="(card) in latest.slice(0, 20)"
          :key="card.title"
          xs6 sm4 md3

        >
        <v-hover>
            <v-card
            slot-scope="{ hover }"

            nuxt-link :to="'/movie/' + card._id"
            boolean flat false>
              <v-img
                :src="card.poster"
                height="370px"
              >
              <v-transition class="fade-transition">
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
              </v-transition>

                <v-container
                  fluid
                  fill-height
                  pa-2
                >
                  <v-layout align-end fill-height>
                  </v-layout>

                </v-container>
              </v-img>
              <v-card-title primary-title left>



               <div>
                 {{card.title}}
                 <div> {{ card_text }} </div>
               </div>
              </v-card-title>
            </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import notice from '~/components/notice.vue'
export default {
  data: () => ({
    items: [
      { title: 'Action', to: '/genre/Action' },
      { title: 'Adventure', to: '/genre/Adventure' },
      { title: 'Animation', to: '/genre/Animation' },
      { title: 'Comedy', to: '/genre/Comedy' },
      { title: 'Drama', to: '/genre/Drama' },
      { title: 'Family', to: '/genre/Family' },
      { title: 'Romance', to: '/genre/Romance' }
    ]
  }),
  components: {
    notice
  },
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

<style scoped="">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}

</style>
