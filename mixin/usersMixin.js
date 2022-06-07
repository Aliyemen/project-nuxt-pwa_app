import globalMixin from "@/mixin/globalMixin"
import { mapGetters,  mapActions } from "vuex"

const usersMixin = {
    mixins: [globalMixin],
    computed: {
        ...mapGetters({
            getSearch:"users/getSearch",
            getUsers:"users/getUsers",
            getUser:"users/getUser",
            getHeaderUsres:"users/getHeaderUsres",
            getUrlUserRepos:"users/getUrlUserRepos",
            getUrlUserFollowers:"users/getUrlUserFollowers",
            getUrlUserOrganizations:"users/getUrlUserOrganizations",
        }),
        searchVx:{
            get(){
                return this.getSearch
            },
            set(newvalue) {
                this.setSearch(newvalue)
            }
        } ,
        users:{
            get(){
                return this.getUsers
            },
            set(newvalue) {
                this.setUsers(newvalue)
            }
        } ,
        user:{
            get(){
                return this.getUser
            },
            set(newvalue) {
                this.setUser(newvalue)
            }
        } ,
    },
    methods: {
        ...mapActions({
            setSearch:"users/setUsers",
            setUsers:"users/setUsers",
            setUser:"users/setUser",
        }),
        async getlistUsres() {
            try {
                let  { data }  = await this.requestApi('GET','users')
                this.setUsers([...data])
                
            } catch (error) {
                
                console.log('error',error)
            }
        },
        async serachUserApi(search){
            try {
                let serachParam = search.replace(' ','').trim()
                let  { data }  = await this.requestApi('GET',`users/${serachParam}`)
                let users = []
                users.push({...data})
                this.setUsers([...users])
                
            } catch (error) {
                
                console.log('error',error)
            }
        }
    },

}
export default usersMixin;