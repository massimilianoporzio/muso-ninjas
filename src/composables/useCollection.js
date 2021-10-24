import {ref} from "vue";
import {db} from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
const isPending = ref(false)

const useCollection = (collectionName) => {

    const error = ref(null) //inside the useCollection so every single collection has an error-related
    const addDocument = async (doc) =>{
        error.value = null // reset errors
        isPending.value = true
        try {
            const docRef =  await addDoc(collection(db,collectionName),doc)

           console.log("Document written with ID: ", docRef.id);
        }catch (err){
            console.log(err.message)
            error.value = 'cannot send the message: '+err.message
            isPending.value = false
        }
    }
    isPending.value=false
    return {error,addDocument}

}
export default useCollection
