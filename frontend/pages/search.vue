<template>
  <v-container>
    <v-layout column>
      <v-flex xs12>
        <v-text-field v-model="title" prepend-icon="search" label="Title or Description" @keyup.enter="search"></v-text-field>
      </v-flex>
      <v-flex v-if="searched.length" xs12>searched movies</v-flex>
      <v-flex v-if="searched.length" xs12>
        <v-data-table v-model="selected" :headers="headers" :items="searched"
          item-key="title" select-all :pagination.sync="table_attribute" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td><v-checkbox v-model="props.selected" primary hide-details></v-checkbox></td>
            <td class="text-xs-center"><nuxt-link :to="'/movie/' + props.item._id">{{props.item.title}}</nuxt-link></td>
            <td class="text-xs-center"><v-btn v-for="(genre,i) in props.item.genres" :key="i"><nuxt-link :to="'/genre/' + genre.name">{{genre.name}}</nuxt-link></v-btn></td>
            <td class="text-xs-center">{{props.item.released_date}}</td>
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
      ],
      table_attribute: {
        descending: true,
        rowsPerPage: 10,
        sortBy: 'released_date'
      },
      title: '',
      searched: []
    }
  },
  methods: {
    async search(){
      console.log(this.title)
      this.searched = await this.$axios.$get('/api/movies/search?text=' + this.title)
    }
  }
}
</script>
