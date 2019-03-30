
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
          v-for="(card) in latest"
          :key="card.title"
          xs6 sm4 md3
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
