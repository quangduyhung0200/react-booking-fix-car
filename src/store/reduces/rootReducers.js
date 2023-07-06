const initState = {
    users: [{
        id: 1,
        name: 'duyhung'
    },
    {
        id: 2,
        name: 'thingoc'
    }
    ],
    posts: []
}
const rootReduces = (state = initState, action) => {
    switch (action.type) {
        case 'DELETE_USER':
            console.log('run into action: ', action);
            let users = state.users
            users = users.filter(item => item.id != action.payload.id)
            return {
                ...state, users
            }

        case 'CREATE_USER':
            let id = Math.floor(Math.random() * 10000)
            let user = { id, name: `ramdom${id}` }
            return {
                ...state, users: [...state.users, user]
            }
        default:
            return state;
    }

}
export default rootReduces