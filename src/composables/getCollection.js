import {ref, watchEffect} from "vue";
import {projectAuth} from "@/firebase/config";
import {db} from "@/firebase/config";
import {collection,query,onSnapshot} from "firebase/firestore";
import {orderBy} from "firebase/firestore";

const getCollection = (collectionName)=>{
    const documents = ref(null)
    const error = ref(null)

    let q = query(collection(db,collectionName),orderBy("createdAt","asc"))

    const unsub = onSnapshot(q, (querySnapshot) => {
        console.log('SNAPSHOT')
        let results = [];
        querySnapshot.forEach((doc) => {
            doc.data().createdAt && results.push({...doc.data(), id:doc.id}); // quando c'è sul server (non local snapshot)
        });
        documents.value = results
        error.value= null
    },(err)=>{
        console.log(err.message)
        documents.value = null
        error.value = "Cannot fetch the data: "+err.message

    })
    //PER UNSUBSCRIBE QUANDO SI FA LGOUT SE NO OTTENGO UN SACCO DI SNAPSHOT da getCollection
    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            //WHEN THE COMPONENT IS UNMOUNTED
            unsub()
        })
    })

    return {documents,error}
}



export default getCollection
