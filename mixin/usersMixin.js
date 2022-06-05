import { mapGetters,  mapActions } from "vuex"

const usersMixin =  {
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
    }


}
export default usersMixin;