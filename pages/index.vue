<template>
  <v-layout colunm wrap>
    <v-flex xs12 sm 12 md12>
      <v-container fluid grid-list-md>
        <div><h1>투데이! Vod</h1></div>
          <v-item-group
            v-model="window"
            class="text-xs-right"
            mandatory
          >
          <v-item v-for="n in length" :key="n">
            <v-btn
              slot-scope="{active,toggle}"
              :input-value="active"
              icon
              @click="toggle"
            >
            <v-icon class="black">mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>

      <v-container justify-space-between>
        <v-layout row>
          <v-layout>
            <v-flex>
            <v-btn
              absolute
              dark
              fab
              left
              color="yellow"
              icon>
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex>
            </div>
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
          </v-flex>
        </v-layout>

        <v-flex>
          <v-btn
            absolute
            dark
            fab
            right
            color="yellow"
            icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-flex>


    </v-layout>
  </v-container>
      </v-container>
    </v-flex>

    <v-container fluid grid-list-md>
      <div><h1>최신 영화</h1></div>
      <v-layout row wrap>
        <v-flex v-for="card in latest.slice(0,6)" :key="card.title" xs4 sm4 md2>
          <v-card height=420px ripple>
            <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster" height=340px></v-img>
            <v-card-title primary title>
              <div>
                <span><h3>{{card.title}}</h3></span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <div><h1>인기 영화</h1></div>
      <v-layout row wrap>
        <v-flex v-for="card in ranked.slice(0,6)" :key="card.title" xs4 sm4 md2>
          <v-card height=420px ripple>
            <v-img :src="'http://image.tmdb.org/t/p/w185/' + card.poster" height=340px></v-img>
            <v-card-title primary title>
              <div>
                <span><h3>{{card.title}}</h3></span>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </v-layout>
</template>

<script>
export default {
  data: () => ({
    length: 5,
    window: 0
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
