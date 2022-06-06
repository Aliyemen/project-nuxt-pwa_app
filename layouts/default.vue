<template lang="pug">
v-app(v-if="!loading" dark)
  v-app-bar(app)
    v-btn( icon @click="refrech")
      v-icon mdi-refresh
    v-spacer 
    v-toolbar-title( justify="center" align="center" v-text="title")
    v-spacer 
  v-main
    v-container.container-app
      Nuxt 
  
  v-footer( app)
    span &copy; {{ new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }}
</template>

<script>
import usersMixin from "@/mixin/usersMixin" 

export default {
  mixins: [usersMixin],
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Usuários github',
       loading: true,
    }
  },
  created() {
     this.$nextTick(function() {
      this.loading = false
    })
    if(this.$nuxt.isOffline){
      this.$router.push('/offline')
    }
  },
  methods:{
    refrech(){
      this.setSearch('')
      this.getlistUsres()

    }
  }
  
}
</script>
