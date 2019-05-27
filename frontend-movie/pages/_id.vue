<template>
  <div>
    <pre>param :: {{params}}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({

  }),
  async asyncData ({ params, $axios }) {
    return {
      params
    }
  },

}
</script>
