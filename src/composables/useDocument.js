import {ref} from "vue";
import {db} from "@/firebase/config";
import { doc, deleteDoc,updateDoc,collection, query, where  } from "firebase/firestore";

const isPending = ref(false)

const useDocument = (collectionName,docId)=>{
    const error = ref(null)
    const isPending = ref(false)
    const docRef = doc(db,collectionName,docId)

    //CHECK IF other songs have the same file
    const getSongsWithSameFile = async (filepath)=>{

    }

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
    //delete a document
    const updateDocument = async (updates)=>{
        isPending.value = true
        error.value = null // reset error
        try {
            console.log(docId)
            const res = await updateDoc(docRef,updates)
            isPending.value = false
            return res
        }catch(err){
            console.log(err.message)
            error.value = "Cannot update this document"
            isPending.value = false
        }
    }

    return {error,isPending,docRef, deleteDocument,updateDocument}
}

export default useDocument
