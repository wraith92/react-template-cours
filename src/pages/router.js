import Home from "./Home";
import Monpokedex from "./Monpokedex";
import Pokegame from "./Pokegame";


const routes = [
    { path: '/', component: <Home/>},
    { path: '/mon-pokedex', component: <Monpokedex/>},
    { path: '/combat', component: <Pokegame/>}
]

export default routes;