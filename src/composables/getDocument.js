import {ref, watchEffect} from "vue";
import {projectAuth} from "@/firebase/config";
import {db} from "@/firebase/config";
import {collection,query,doc, onSnapshot} from "firebase/firestore";
import {orderBy} from "firebase/firestore";


const getDocument = (collectionName ,id )=>{
    const document = ref(null)
    const error = ref(null)

    let docRef= doc(db, collectionName, id)
    //unsub is a function returned from onSnapshot
    const unsub = onSnapshot(docRef, (docSnapshot) => {

        if(docSnapshot.data()){
            document.value =  {...docSnapshot.data(),id:docSnapshot.id}
            error.value= null
        }else{
            error.value = 'that document does not exists'
        }
},(err)=>{
        console.log(err.message)
        document.value = null
        error.value = "Cannot fetch the data: "+err.message

    })
    //PER UNSUBSCRIBE QUANDO SI FA LGOUT SE NO OTTENGO UN SACCO DI SNAPSHOT da getCollection
    watchEffect((onInvalidate)=>{
        onInvalidate(()=>{
            //WHEN THE COMPONENT IS UNMOUNTED
            unsub()
        })
    })

    return {document,error}
}



export default getDocument
