<template>
  <div>
    <notice></notice>
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

      <v-tab v-for="tab in tabs" :to="tab.to">
        {{tab.title}}
        <v-icon>{{tab.icon}}</v-icon>
      </v-tab>
  </v-tabs>
  <div class="grey lighten-3">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm 12 md12>
          <v-container fluid grid-list-md>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs12 sm8 md8>
                <div><h1>투데이! Vod</h1></div>
              </v-flex>
              <v-flex xs4 sm4 md4>
                <v-item-group
                  v-model="window1"
                  class="text-xs-right"
                  mandatory
                  max="5"
                >
                  <v-item v-for="n in length" :key="n">

                    <v-icon
                    slot-scope="{active,toggle}"
                    :input-value="active"
                    icon
                    :color="active ? 'black' : 'grey'"
                    class="hidden-xs-and-down"
                    @click="toggle">fiber_manual_record</v-icon>

                  </v-item>
                </v-item-group>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <v-window
        v-model="window1"
        horizontal
      >
        <v-window-item
          v-for="i in length"
          :key="'${i}'"
           xs6 sm6 md4
        >
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex v-for="card in latest.slice(6*(i-1)+6,6*i+6)" :key="card.title" xs12 sm6 md4>
                <v-card height=420px ripple :to="'/movie/' + card._id">
                  <v-img :src="card.poster" height=340px>
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

  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm 12 md12>
        <v-container fluid grid-list-md>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs8 sm8 md8>
              <div><h1>최신영화</h1></div>
            </v-flex>
            <v-flex xs4 sm4 md4>
              <v-item-group
                v-model="window2"
                class="text-xs-right"
                mandatory
                max="5"
              >
                <v-item v-for="k in length" :key="k">
                  <v-icon
                    slot-scope="{active,toggle}"
                    :input-value="active"
                    :color="active ? 'black' : 'grey'"
                    icon
                    @click="toggle">fiber_manual_record
                  </v-icon>
                </v-item>
              </v-item-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-window
      v-model="window2"
      horizontal
    >
      <v-window-item
        v-for="j in length"
        :key="'${j}'"
         xs6 sm6 md4
      >
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="card in latest.slice(6*(j-1),6*j)" :key="card.title" xs12 sm4 md2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  class="mx-auto"
                  max-width="400"
                  height="360"
                  :to="'/movie/' + card._id"
                >
                  <v-img :src="card.poster" height=360px>
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
                </v-card>
              </v-hover>
              <div>
                <span><h2>{{card.title}}</h2></span>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-window-item>
    </v-window>

    <v-layout row wrap>
      <v-flex xs12 sm 12 md12>
        <v-container fluid grid-list-md>
          <v-layout align-center justify-center row fill-height>
            <v-flex xs8 sm8 md8>
              <div><h1>인기영화</h1></div>
            </v-flex>
            <v-flex xs4 sm4 md4>
              <v-item-group
                v-model="window3"
                class="text-xs-right"
                mandatory
                max="5"
              >
                <v-item v-for="k in length" :key="k">
                  <v-icon
                    slot-scope="{active,toggle}"
                    :input-value="active"
                    :color="active ? 'black' : 'grey'"
                    icon
                    @click="toggle">fiber_manual_record
                  </v-icon>
                </v-item>
              </v-item-group>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-window
      v-model="window3"
      horizontal
    >
      <v-window-item
        v-for="j in length"
        :key="'${j}'"
         xs6 sm6 md4
      >
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="card in ranked.slice(6*(j-1),6*j)" :key="card.title" xs12 sm4 md2>
              <v-hover>
                <v-card
                  slot-scope="{ hover }"
                  class="mx-auto"
                  max-width="400"
                  height="360"
                  :to="'/movie/' + card._id"
                >
                  <v-img :src="card.poster" height=360px>
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
                </v-card>
              </v-hover>
              <div>
                <span><h2>{{card.title}}</h2></span>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-window-item>
    </v-window>
    </v-container>
  </div>
</template>

<script>
import notice from '~/components/notice.vue'
export default {
  data: () => ({
    // length: 5,
    window1: 0,
    window2: 0,
    window3: 0,
    items: [
      {
        src: 'https://gdurl.com/h6bg'
      },
      {
        src: 'https://gdurl.com/BV1u'
      },
      {
        src: 'https://gdurl.com/LMbi'
      },
      {
        src: 'https://gdurl.com/M8vn'
      }
    ],
    tabs: [
      {
        title: '무료',
        icon: 'business_center',
        to: '/'
      },
      {
        title: '실시간',
        icon: 'timer',
        to: '/'
      },
      {
        title: '영화',
        icon: 'movie_creation',
        to: '/genre/Action'
      }

    ]
  }),
  components: {
    notice
  },
  computed: {
    length ({ $vuetify }) {
      if ($vuetify.breakpoint.xs === true) {
        return 3
      } else if ($vuetify.breakpoint.sm === true) {
        return 4
      } else if ($vuetify.breakpoint.mdAndUp === true) {
        return 5
      }
    }
  },
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
