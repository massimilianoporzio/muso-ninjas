import {ref} from "vue";
import {db} from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
const isPending = ref(false)

const useDocument = (collectionName,docId)=>{
    const error = ref(null)
    const isPending = ref(false)
    const docRef = doc(db,collectionName,docId)
    //delete a document
    const deleteDocument = async (docId)=>{
        isPending.value = true
        error.value = null // reset error
        try {
            console.log(docId)
            const res = await deleteDoc(docRef)
            isPending.value = false
            return res
        }catch(err){
            console.log(err.message)
            error.value = "Cannot delete this document"
            isPending.value = false
        }
    }

    return {error,isPending, deleteDocument}
}

export default useDocument
