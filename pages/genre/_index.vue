<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>latest movies</v-flex>
      <v-flex xs12>
        <v-data-table v-model="selected" :headers="headers" :items="latest"
          item-key="title" select-all class="elevation-1" :disable-initial-sort="true">
          <template slot="items" slot-scope="props">
            <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
            <td class="text-xs-center"><nuxt-link :to="'/movie/' + props.item._id">{{props.item.title}}</nuxt-link></td>
            <td class="text-xs-center"><v-btn v-for="(genre,i) in props.item.genres" :key="i"><nuxt-link :to="'/genre/' + genre.name">{{genre.name}}</nuxt-link></v-btn></td>
            <td class="text-xs-center">{{props.item.released_date.substring(0,10)}}</td>
            <td class="text-xs-center">{{props.item.vote_average}}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12>favorite movies</v-flex>
      <v-flex xs12>
        <v-data-table v-model="selected" :headers="headers" :items="ranked"
          item-key="title" select-all class="elevation-1" :disable-initial-sort="true">
          <template slot="items" slot-scope="props">
            <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
            <td class="text-xs-center"><nuxt-link :to="'/movie/' + props.item._id">{{props.item.title}}</nuxt-link></td>
            <td class="text-xs-center"><v-btn v-for="(genre,i) in props.item.genres" :key="i"><nuxt-link :to="'/genre/' + genre.name">{{genre.name}}</nuxt-link></v-btn></td>
            <td class="text-xs-center">{{props.item.released_date.substring(0,10)}}</td>
            <td class="text-xs-center">{{props.item.vote_average}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      headers: [
        { text: 'title', align: 'center', value: 'title' },
        { text: 'genres', align: 'center', value: 'genres' },
        { text: 'released', align: 'center', value: 'released_date' },
        { text: 'rate', align: 'center', value: 'vote_average' }
      ]
    }
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
