<template lang="pug">
v-data-table(
			:headers="headers"
			:items="filteredItems"
			:items-per-page="perPage"
			:page.sync="currentPage"
			hide-default-footer
		).tab-style-font.elevation-1
	template( v-slot:item.avatar_url="{ item }")
		v-avatar(size="32" color="primary").app--avatar
			img(:src="item.avatar_url"  :alt='item.name')
	template( v-slot:item.login="{ item }")
		span {{ item.login }}
	template( v-slot:item.site_admin="{ item }")
		span {{item.site_admin? 'Sim':'Não' }}
	template( v-slot:item.html_url="{ item }")
		v-btn( icon  @click="goToAnotherSite(item.html_url)" )
			v-icon(color="#404554") mdi-web-check
	template( v-slot:item.actions="{ item }")
			v-btn( icon  @click="detailsUser(item)" )
				v-icon(color="#404554") mdi-eye-outline
	template(slot="no-data")
			v-avatar(
				size="166px"
				color="#F7F8FA"
			).mt-8
				v-icon(
					size="73px"
					color="#BEC0CC"
				) mdi-account-multiple-outline
			.text-h6.mt-3.grey--text.text--darken-4.mb-8 Nenhuma usuário
</template>
<script>
import globalMixin from "@/mixin/globalMixin"
import usersMixin from "@/mixin/usersMixin" 
export default {
	mixins: [globalMixin, usersMixin],
	 props:{
		currentPage: {
			type:Number,
			default: 1,
		},
		perPage:{
			type:Number,
			default: 20,
		},
		headers:{
			type:Array,
			default(){
				return []
			}
		},
		filteredItems:{
			type:Array,
			default(){
				return []
			}
		},
		showDialogProp:{
			type:Boolean,
			default:false
		}
	},
	computed:{
		showDialog:{
			get() {
				return this.showDialogProp

			},
			set(newValue){
				this.$emit('eventChangeModal',newValue)
			}
		}

	},
	methods: {
		changeDialog(event) {
			this.showDialog = event
		},
		detailsUser(item) {
			this.user =  {...item}
			this.showDialog = true
		},
	}
	
}
</script>