/* import { createStore } from 'vuex';


export const store = createStore({
    state: {
        users: [
            {name: 'User',role:'ggg'},
            {name: 'User',role:'ggg'},

    ]
        
    },
    getters: {
        uu: (state) => {
            var uu = state.users.map( user => {
                return {
                    name:'**'+ user.name ,
                    role:'gggg'
                };
            });
            return uu;
        }
    },

});
 */