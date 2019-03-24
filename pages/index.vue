<template>
  <div>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
  <v-tabs
  centered
  color="white"
  icons-and-text
  >
    <v-tabs-slider color="white"></v-tabs-slider>

    <v-tab href="#tab-1">
      Recents
      <v-icon>phone</v-icon>
    </v-tab>

    <v-tab href="#tab-2">
      Favorites
      <v-icon>favorite</v-icon>
    </v-tab>

    <v-tab href="#tab-3">
      Nearby
      <v-icon>account_box</v-icon>
    </v-tab>

    <v-tab-item
      v-for="i in 3"
      :key="i"
      :value="'tab-' + i"
    >
      <v-card flat>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm 12 md12>
        <v-container fluid grid-list-md>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs8 sm8 md8>
              <div><h1>투데이! Vod</h1></div>
            </v-flex>
            <v-flex xs4 sm4 md4>
              <v-item-group
                v-model="window"
                class="text-xs-right"
                mandatory
                max="5"
              >
                <v-item v-for="n in length" :key="n">
                  <v-icon
                  slot-scope="{active,toggle}"
                  :input-value="active"
                  icon
                  color="grey"
                  @click="toggle">
                    fiber_manual_record
                  </v-icon>
                </v-item>
              </v-item-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-window
      v-model="window"
      horizontal
    >
      <v-window-item
        v-for="i in length"
        :key="'${i}'"
         xs6 sm6 md4
      >
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="card in latest.slice(6*(i-1),6*i)" :key="card.title" xs6 sm6 md4>
              <v-card height=420px ripple>
                <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster" height=340px>
                <v-container fill-height align-front>
                  <v-layout align-end fill-height>
                    <v-flex>
                      <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <v-card-title primary title>
                  <div>
                    <span><h3>{{card.title}} ({{card.released_date}})</h3></span>
                    <span class="grey--text">{{card.description.slice(0,50)}}...</span><br>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-window-item>
    </v-window>

    <v-layout row wrap>
      <v-flex xs12 sm 12 md12>
        <v-container fluid grid-list-md>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs12 sm12 md12>
              <div><h1>최신영화</h1></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-window
        v-model="window"
        horizontal
    >
      <v-window-item
          v-for="i in length"
          :key="'${i}'"
           xs6 sm6 md4
        >
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="card in ranked.slice(0,6)" :key="card.title" xs6 sm6 md4>
                <v-card height=420px ripple>
                  <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster" height=340px>
                  <v-container fill-height align-front>
                    <v-layout align-end fill-height>
                      <v-flex>
                        <span class="headline white--text" v-text="card.title"></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                  <v-card-title primary title>
                    <div>
                      <span><h3>{{card.title}} ({{card.released_date}})</h3></span>
                      <span class="grey--text">{{card.description.slice(0,50)}}...</span><br>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-window-item>
      </v-window>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    length: 5,
    window: 0,
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      }
    ]
  }),

  async asyncData ({ $axios }) {
    const latest = await $axios.$get('/api/movies/latest')
    const ranked = await $axios.$get('/api/movies/ranked')
    return {
      latest,
      ranked
    }
  }
}
</script>
