const globalMixin =  {
  methods: {
    async requestApi(method, route, body, type, pages, token) {
        let tokenNoHeader =  token ? token: null
        let headers = {}
        if (type && type == 'file') {
          headers = {'Content-Type' :'multipart/form-data'}
        }
        if (tokenNoHeader){
          headers.Authorization = `Bearer ${tokenNoHeader}`
        }
        
        let urlRoute = route
        if (type && type == 'page') {
            let newPages = {
              size : pages && pages.size? pages.size : 10, 
              page : pages && pages.page? pages.page : 1
            }
          urlRoute = `${route}&size=${newPages.size}&page=${newPages.page}`
        }
        return await this.$axios({
          method,
          url: urlRoute,
          data: body,
          headers :{...headers}
  
        })
        .then((res) => {
          return res
        })
        .catch((error) => {
          this.errorResponse(error.response)
          if ( error.response &&  error.response.data && error.response.data.message){
            throw error.response.data
          }
  
          throw error.response
        })
      },
      errorResponse(error){
        if (error.response && error.response.status === 401) {
          sessionStorage.clear();
          window.location = '/';
        }
      },
      goToAnotherSite(url){
        var win = window.open(url, '_blank');
			  win.focus();
      }
    }
}

export default globalMixin;