import {ref} from "vue";
import {db} from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

const useCollection = (collectionName) => {

    const error = ref(null) //inside the useCollection so every single collection has an error-related
    const addDocument = async (doc) =>{
        error.value = null // reset errors
        try {
            const docRef =  await addDoc(collection(db,collectionName),doc)
           console.log("Document written with ID: ", docRef.id);
        }catch (err){
            console.log(err.message)
            error.value = 'cannot send the message: '+err.message
        }
    }

    return {error,addDocument}

}

export default useCollection
