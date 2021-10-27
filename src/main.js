import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'
import {projectAuth} from "@/firebase/config";


let app
projectAuth.onAuthStateChanged(()=>{
    // mount only when someone is logged (?) FIRST TIME (se faccio refresh DOPO il login NON MI rimanda al login
    if(!app){
        app =  createApp(App).use(router).mount('#app')
    }

})

