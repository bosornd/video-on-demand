
<template>
  <div>
    <v-container grid-list-lg>
      <v-layout justify-center row wrap>
        <v-flex
          v-for="(card) in ranked.slice(0, 50)"
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
              </v-img>
              <v-card-title primary-title left>
               <div>
                 {{card.title}} ( {{card.count}} )
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

  }),
  components: {
    notice
  },
  async asyncData ({ params, $axios }) {
    const ranked = await $axios.$get('/api/movies/ranked')
    return {
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
