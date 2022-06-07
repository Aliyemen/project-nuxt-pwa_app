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
