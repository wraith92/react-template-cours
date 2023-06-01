const menus = [
    {
        id: 1,
        name: 'Home',
        namesub: [
            {
                id: 1,
                sub: 'Home',
                links: '/'
            }
        ]
    },
    {
        id: 2,
        name: 'Todo',
        namesub: [
            {
                id: 1,
                sub: 'Todo-list',
                links: '/todo-list'
            }

        ],
    },
    {
        id: 3,
        name: 'Film',
        namesub: [
            {
                id: 1,
                sub: 'Film',
                links: '/Film'
            },
            {
                id: 2,
                sub: 'Quiz',
                links: '/Quiz-Film'
            },
        ],
    },
    {
        id: 4,
        name: 'API',
        namesub: [
            {
                id: 1,
                sub: 'Pockedex',
                links: '/pockedex'
            },
            {
                id: 2,
                sub: 'Citation',
                links: '/login'
            },
            {
                id: 3,
                sub: 'Register',
                links: '/register'
            },
        ],
    },
    {
        id: 4,
        name: 'Localstorage',
        namesub: [
            {
                id: 1,
                sub: 'Localstorage',
                links: '/localstorage'
            },
        ],
    },

]

export default menus;