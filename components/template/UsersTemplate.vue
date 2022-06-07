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
					).font-size-api.mr-5
	div.row.tab-style.mt-4(no-gutters)
		div.col-md-12.col-sm-12
			tableAppTemplate(
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
