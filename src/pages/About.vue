<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="handleClick" style="margin-bottom: 20px;">Go to /about/child</button>
    <router-view></router-view>
  </div>
</template>

<script>
import titleMixin from './mixins/title'

export default {
  name: 'Home',
  mixins: [titleMixin],
  components: {
  },
  methods: {
    handleClick () {
      this.$router.push({
        name: 'AboutChild'
      })
    }
  }
}
</script>
