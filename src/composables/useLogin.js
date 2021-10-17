import {ref} from "vue";

import {connectAuthEmulator, signInWithEmailAndPassword} from "firebase/auth";
import {projectAuth} from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)
// connectAuthEmulator(projectAuth, "http://localhost:9099");
const login = async (email,password) => {
    error.value = null //reset
    isPending.value = true
    await signInWithEmailAndPassword(projectAuth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            isPending.value = false
            // ...
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            error.value='Incorrect login credentials'
            isPending.value = false
        });
}

const useLogin = () => {
    return {error,login, isPending}
}


export default  useLogin
