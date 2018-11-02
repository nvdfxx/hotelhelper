export default {
    state: {
        posts: [
            {
                id: 1,
                title: 'post 1 title',
                description: 'post 1 description post 1 description',
                body: 'post 1 body post 1 body post 1 body post 1 body post 1 body post 1 body'
            },
            {
                id: 2,
                title: 'post 2 title',
                description: 'post 2 description post 2 description',
                body: 'post 2 body post 2 body post 2 body post 2 body post 2 body post 2 body'
            },
            {
                id: 3,
                title: 'post 3 title',
                description: 'post 3 description post 3 description',
                body: 'post 3 body post 3 body post 3 body post 3 body post 3 body post 3 body'
            }
        ]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        getPosts: state => state.posts
    }
}