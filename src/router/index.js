import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import Signup from "@/views/auth/Signup";
import CreatePlaylist from "@/views/playlists/CreatePlaylist"

// route guard
import {projectAuth} from "@/firebase/config";
import PlayListDetails from "@/views/playlists/PlayListDetails";

const requireAuth = (to,from,next)=>{
  let user = projectAuth.currentUser
  if(!user){
    //redirect to login
    next({name: 'Login'})
  }else{
    next()
  }
}

const redirectToHome = (to, from, next)=> {
  console.log('Hello')
  next('Home')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,

  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
    // playlist
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlists/:id',
    name: 'PlaylistDetails',
    component: PlayListDetails,
    beforeEnter: requireAuth,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
