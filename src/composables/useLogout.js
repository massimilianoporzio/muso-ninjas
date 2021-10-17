import {ref} from "vue";
import {getAuthm, signOut } from "firebase/auth";
import {projectAuth} from "@/firebase/config";

const error = ref(null)

const logout = async ()=>{
    error.value=null // reset
    await signOut(projectAuth).then(() => {
        // Sign-out successful.
        console.log("SIGNED OUT")
    }).catch((err) => {
        // An error happened.
        error.value = err.message
    });
}

const useLogout = ()=>{
     return {logout, error}
}

export default useLogout
