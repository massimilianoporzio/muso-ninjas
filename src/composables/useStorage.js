import {projectStore} from "@/firebase/config";
import {ref} from "vue";
import {ref as storeageref} from "firebase/storage"
import {uploadBytes} from "firebase/storage";
import getUser from "@/composables/getUser";
import {getDownloadURL} from "firebase/storage";

const {user}=getUser()


const useStorage = ()=>{
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file)=> {
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = storeageref(projectStore, filePath.value)
        try {
            const res = await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(res.ref)
        } catch (err) {
            console.log(err.message)
            error.value = err
        }
    }

    return{url,filePath,error,uploadImage}
}


export default useStorage
