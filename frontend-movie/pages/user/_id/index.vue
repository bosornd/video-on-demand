<template>
  <div>
    <!-- <notice></notice> -->
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm12 md 12>
          <v-text-field
            :value=user.id
            label="아이디"
            outline
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md 12>
          <v-text-field
            :value=user.name
            label="이름"
            outline
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md 12>
          <v-text-field
            :value=user.email
            label="이메일"
            outline
            readonly
          ></v-text-field>
        </v-flex>
        <v-flex xs10 sm10 md10>
          <h2>내가 본 영화</h2>
        </v-flex>
        <v-flex xs1 sm1 md1>
          <v-btn left round small v-if="more ===false" @click="more = true">더보기</v-btn>
          <v-btn left round small v-if="more ===true" @click="more = false">접기</v-btn>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <v-layout row wrap >
            <v-flex xs12 sm4 md3 v-for="movie in movies()">
              <v-card height=420px ripple :to="'/movie/' + movie.id">
                <v-img :src="movie.poster" height=340px>
                </v-img>
                <v-card-title primary title>
                  <div>
                    <span><h3>{{movie.title}}</h3></span>
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
  data () {
    return {
      more: false
    }
  },
  components: {
    notice
  },
  middleware: [
    'auth'
  ],
  methods: {
    movies () {
      if (this.more === false) {
        var arr = this.user.movies.slice(0, 4)
        return arr
      } else if (this.more === true) {
        return this.user.movies.slice(0, 30)
      }
    }
  },
  async asyncData ({ route, $axios, redirect }) {
    var user = await $axios.$get('/api/users/' + route.params.id, 'id')

    return {
      user
    }
  }

}
</script>
