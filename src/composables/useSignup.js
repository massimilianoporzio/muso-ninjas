import {ref} from "vue";
const error = ref(null)
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {projectAuth} from '@/firebase/config'
const isPending = ref(false)
const signup = async (email, password, displayName)=>{
    error.value = null // reset errors
    isPending.value=true
    try {
      const res =  await createUserWithEmailAndPassword(projectAuth,email,password)
        if(!res){
            //se errore
            throw new Error('Could not complete signup')
        }
        await updateProfile(res.user,{displayName: displayName})
        error.value = null
        isPending.value = false
        return res

    }
    catch (err) {
        console.log(err)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {


    return {error, signup,isPending}
}

export default useSignup
