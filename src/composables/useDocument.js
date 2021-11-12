import {ref} from "vue";
import {db} from "@/firebase/config";
import { doc, deleteDoc,updateDoc,collection, query, where, getDocs  } from "firebase/firestore";

const isPending = ref(false)

const getPlaylistWithSongUrl = async (songPath)=>{
     console.log("songPAth is ",songPath)
    const q = await query(collection(db, "playlists"),where("paths", "array-contains", songPath));
    const querySnapshot = await getDocs(q);
    let count = 0
    querySnapshot.forEach((doc) => {count++})
    console.log(`trovate ${count} playlist con quella canzone`)
    let deleteMp3 = false
    if(count===1){
        // cerco se nell'unica playlist (che deve essere per forza quella in cui si trova la canzone sulla quale
        // ho cliccato delete) ci sono più canzoni con lo stesso file mp3 (non ho messo check in aggiunta)
        const q = await query(collection(db, "playlists"),where("paths", "array-contains", songPath));
        const querySnapshot = await getDocs(q);
        let count = 0
        querySnapshot.forEach((doc) => {count++})
        console.log(`trovate ${count} playlist con quella canzone`)
    }
    return {count}
}


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

    return {error,isPending,docRef, deleteDocument,updateDocument,getPlaylistWithSongUrl}
}

export default useDocument
