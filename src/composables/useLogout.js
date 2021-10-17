import {ref} from "vue";
import {getAuthm, signOut } from "firebase/auth";
import {projectAuth} from "@/firebase/config";
const isPending = ref(false)
const error = ref(null)

const logout = async ()=>{
    error.value=null // reset
    isPending.value = true
    await signOut(projectAuth).then(() => {
        // Sign-out successful.
        console.log("SIGNED OUT")
        isPending.value=false
    }).catch((err) => {
        // An error happened.
        error.value = err.message
        isPending.value = false
    });
}

const useLogout = ()=>{
     return {logout, error, isPending}
}

export default useLogout
