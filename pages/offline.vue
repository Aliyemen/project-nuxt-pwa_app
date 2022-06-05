<template lang="pug">
v-row(justify="center" align="center")
	v-col( cols="12" sm="8" md="6")
		div.logo.py-4.d-flex.justify-center 
			v-avatar(
						size="166px"
						color="#F7F8FA"
				).mt-8
					v-icon(
							size="73px"
							color="#BEC0CC"
					) mdi-wifi-off
			.text-h6.mt-3.grey--text.text--darken-4.mb-8 Sem conexão com internet
			p {{content }}
			v-btn( @click="refresh()") Atualizar 
    
</template>

<script>
export default {
  name: 'OfflinePage',
  asyncData() {
      return { content: 'data : ' + new Date().toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }
    },
  methods:{
	  refresh() {
        this.$nuxt.refresh()
      }

  }
}
</script>
