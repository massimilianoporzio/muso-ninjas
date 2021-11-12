import {projectStore} from "@/firebase/config";
import {ref as firestoreRef, deleteObject } from "firebase/storage";
import {ref} from "vue";
import {uploadBytes} from "firebase/storage";
import getUser from "@/composables/getUser";
import {getDownloadURL} from "firebase/storage";

const {user}=getUser()


const useStorage = ()=>{
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadSong = async (file)=>{
        filePath.value = `songs/${user.value.uid}/${file.name}`
        const storageRef = firestoreRef(projectStore, filePath.value)
        try {
            const res = await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(res.ref)
        } catch (err) {
            console.log(err.message)
            error.value = err
        }
    }

    const uploadImage = async (file)=> {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = firestoreRef(projectStore, filePath.value)
        try {
            const res = await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(res.ref)
        } catch (err) {
            console.log(err.message)
            error.value = err
        }
    }

    const deleteFile = async (path)=>{
        const storageRef = firestoreRef(projectStore,path)
        try{
            const res = await deleteObject(storageRef)

        }catch(err){
            console.log(err.message)
            error.value = "Could not delete the file"
        }
    }

    return{url,filePath,error,uploadImage, deleteFile, uploadSong}
}


export default useStorage
