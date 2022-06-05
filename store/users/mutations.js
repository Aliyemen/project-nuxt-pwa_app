const mutations = {
    setSearch: (state, payload) => {
        state.search = payload;
    },
    setUsers: (state, payload) => {
        state.users = payload;
    },
    setUser: (state, payload) => {
        state.user = payload;
    },

};

export default mutations;
