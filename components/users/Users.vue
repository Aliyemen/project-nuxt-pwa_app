<template lang="pug">
v-container.container-app
	div.d-flex.flex-row.bd-highlight.mb-2.d-flex.justify-content-center
		div( style="width:100%").d-flex.flex-colum
			v-text-field(
					type="text"
					:label="lebalFilter" 
					v-model="search"  
					:append-icon="search !=''? 'mdi-close' : 'mdi-magnify' "
					align-self,
					background-color="#F7F8FA",
					solo,
					flat
					full-width
					dense
					@click:append="appendIconCallback"
					@change="findListAgaine"
					).font-size-api.mr-5
					//- :disabled="!editar"
		div().d-flex.flex-colum.justify-end.ml-3.mr-6
			v-btn(
			outlined
			color="primary"
			height="40px"
			:disabled="filteredItems.length > 0"
			@click="serachUserApi(search)"
			).border-opacity-btn
				v-icon(left size="24px").mr-3 mdi-magnify
				.text-subtitle-2 Buscar novamente
	div.row.tab-style.mt-4(no-gutters)
		div.col-md-12.col-sm-12
			tableApp(
						id="tableUsres"
						:headers="headers"
						:filteredItems="filteredItems"
						:perPage="perPage"
						:currentPage="currentPage"
						v-on:eventChangeModal="eventChangeModal"
					)
		div.col-md-12.col-sm-12.d-flex.mt-n10
			div.row
				div.col-md-2
					v-select(:items="pagesList"
							v-model="perPage"
							small
							label="Padrão as linhas na página").mt-9.tab-style-font.mr-5
				div(v-if="pages > 0" ).col-md-10
					v-pagination( 
										v-model="currentPage"
										:length="pages"
										color="primary"
									).mt-9.tab-style-font
	User(:showUser="showModal" :user="user" v-on:eventChangeModal="eventChangeModal")

</template>
<script>
import globalMixin from "@/mixin/globalMixin"
import usersMixin from "@/mixin/usersMixin" 
export default {
	  mixins: [globalMixin, usersMixin],
		data(){
			return{
					currentPage:1,
					perPage: 20,
					search:'',
					pagesList:[5,10,20,50],
					showModal:false,
			}
		},
		async fetch() {
			await this.getlistUsres()
		},
		fetchOnServer: false,
		 computed: {
			 lebalFilter(){
				 return 'Pesquise por nome'
			 },
			 	headers () {
      		return this.getHeaderUsres
				},
				filteredItems () {
						if(!this.users || !this.users.length){
							return []
						}
						if (this.search != "") {
							return this.users.filter(item => {
								return item.login.toLowerCase().indexOf(this.search.toLowerCase()) > -1
							})
						}
						return this.users
				},
				pages () {
					return Math.floor(this.filteredItems.length / this.perPage)
				},
		 },
		 	methods: {
				eventChangeModal(event){
					this.showModal= event
				},
				appendIconCallback (){
					if (this.search != '') {
						this.search =''
						this.findListAgaine()
					}
				},
				findListAgaine(){
					let needCallAgin = [0,1]
					if(this.search=='' && needCallAgin.includes(this.filteredItems.length)){
						this.getlistUsres()
					}

				}
				
			
		}
	
};
</script>