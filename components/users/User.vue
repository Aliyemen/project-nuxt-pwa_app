<template lang="pug">
v-navigation-drawer(
    v-model="show",
    fixed,
    temporary,
    right
    width="100%"
    
  )
    v-container.user-container.pt-11.pb-0.px-0
      v-row.user-header.mx-0.mt-1
        v-col(cols="11")
          .text-h5.font-weight-bold {{user.login}}
        v-col(cols="1").d-flex.align-center.justify-center
          v-icon(color="black" @click="closeModal()") mdi-close
      v-row.user-body.mx-0
        v-card(width="100%"  tile).mx-auto
          v-system-bar
          v-row.user-body.mx-0
            v-col(cols="4")
              v-card-title
                v-img(:src="user.avatar_url"  :alt="user.login"  max-height="250" max-width="350" )
            v-col(cols="auto")
              v-card-title.mt-12 Usuário  {{user.login}}
              v-card-subtitle.mt-2.text-left
                p Tem  {{repositories.length}} repositórios
                p Seguindo  {{following.length}} desenvolvedores
                p Esta em {{organizations.length}} organizações
          v-divider
          v-card-actions.justify-space-between.pb-5.pt-4.px-6
            v-btn(color='#676767' outlined @click='closeModal()') Fechar
            v-btn(color='error' elevation="0" @click='goToAnotherSite(user.html_url)') Visualizar site {{user.login}}
      
</template>

<script>
import globalMixin from "@/mixin/globalMixin"

export default {
  mixins: [globalMixin],
  name: 'userPage',
  props: {
    user:{
      type:Object,
      default(){
        return null
      }
    },
    showUser: {
      type: Boolean,
      default: false

    }

  },
  data(){
    return {
      repositories:[],
      following:[],
      organizations:[],
      noData: false,
    }
  },
  computed: {
    show: {
      get() {
        return this.showUser;
      },
      set(newValue) {
        this.$emit("eventChangeModal", newValue);
      },
    }

  },
	beforeMount(){
    this.init() 
	},
  watch:{
    showUser: {
      handler(newValue) {
        if(newValue) {
          this.init() 
        }
      },
      immediate: true
    }
  },
  methods:{
    init(){
      if(!this.user.avatar_url){
			this.noData = true
		}
    this.noData = false
    this.getOrganizations()
    this.getRepositories()
    this.getFollowing()

    },
    closeModal() {
			this.show = false
		},
    async getOrganizations() {
      try {
        this.organizations =[]
        let  { data }  = await this.requestApi('GET',`users/${this.user.login}/orgs`)
        this.organizations =[...data]
      } catch (error) {
        console.log('error', error)
      }

    },
    async getRepositories() {
      try {
        this.repositories =[]
        let  { data }  = await this.requestApi('GET',`users/${this.user.login}/followers`)
        this.repositories =[...data]
      } catch (error) {
        console.log('error', error)
      }
    },
     async getFollowing(){
      try {
        this.following =[]
        let  { data }  = await this.requestApi('GET',`users/${this.user.login}/repos`)
        this.following =[...data]
      } catch (error) {
        console.log('error', error)
      }
    }
  }
};
</script>
