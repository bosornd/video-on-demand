<template>
  <v-layout justify-center>
    <v-flex lg12 md6>

        <v-spacer></v-spacer>



      <v-card>
        <v-container
          fluid
          grid-list-md

        >


          <v-layout row wrap>
            <v-flex
              v-for="card in latest"
              :key="card.title"
              xs12 sm6 md4
              v-bind="{ [`xs${card.flex}`]: true }"
            >
              <v-card>
                <v-img
                  :src="'http://image.tmdb.org/t/p/w185/' + card.poster"
                  height="200px"
                >


                  <v-container
                    fluid
                    fill-height
                    pa-2
                  >
                    <v-layout align-end fill-height>
                      <v-flex >
                        <span class="headline white--text" v-text="card.title"></span>
                      </v-flex>
                    </v-layout>

                  </v-container>
                </v-img>
                <v-card-title primary-title>
                         <div>
                           {{card.description}}
                           <div> {{ card_text }} </div>
                         </div>
                       </v-card-title>



              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>

  </v-layout>

</template>

<script>
  export default {
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
