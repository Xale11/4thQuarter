import React, { useEffect, useRef, useState } from 'react'
import "./Squad.css"
import { useNavigate } from 'react-router-dom'
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject, list} from "firebase/storage"
import { storage, uploadSquadPhotos } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const Squad = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const photosRef = useRef()

    const [photos, setPhotos] = useState()
    const [show, setShow] = useState("")
    const [reveal, setReveal] = useState(false)
    const [loading, setLoading] = useState(0)
    const [download, setDownload] = useState(false)

    const fetchSquadPhotos = async () => {
        let data = await uploadSquadPhotos()
        setPhotos([...data])
    }

    const deleteImg = (name) => {
        try {
            const deleteRef = ref(storage, `squad/${name}`)
            deleteObject(deleteRef)
            alert("This has been deleted!")
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert("There was an error please try again.")
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDownload(true)
        for (let i = 0; i < photosRef.current.files.length; i++){
            try {
                const imageRef = ref(storage, `squad/${photosRef.current.files[i].name}`)
                await uploadBytes(imageRef, photosRef.current.files[i])
                setLoading(((i+1)/photosRef.current.files.length * 100))
            } catch (error) {
                e.preventDefault()
                alert("There was error. Please try again")
                console.error(error)
            }
        }
        alert("This has been updated!")
        window.location.reload()
    } 

    useEffect(() => {
        fetchSquadPhotos()
    }, [])

    console.log(photos)

 if (!user){
    return (<Auth/>)
 } else{
    return (
        <div className='squad'>
            <div className="squadTitle">Squad/Testimonials</div>
            <div className="squadContainer">
                <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="formTitle">Squad Photos:</div>
                    <input type="file" name="" id="" multiple ref={photosRef} required/>
                    <button className='submitMsg' >Submit {download && `${loading}%`}</button>
                </form>
                <div className="formTitle">Squad Photos List:</div>
                <div className="squadPhotoList">
                    {photos?.map((photo) => {
                        return (
                            <div className="photo">
                                <img src={photo.url} onClick={() => {setShow(photo.name); setReveal("photo.name")}} alt="" srcset="" />
                                {show == photo.name && <div className="deleteIt">
                                    {reveal !== photo.name && <div onClick={() => {alert("You cannot recover the image after you delete.");setReveal(photo.name)}}>Delete</div>}
                                    {reveal == photo.name && <div onClick={() => {setReveal("")}}>Close Delete</div>}
                                    {reveal == photo.name && <div onClick={() => deleteImg(photo.name)}>Confirm Delete</div>}
                                </div>}
                            </div>
                        )
                        
                    })}
                </div>
            </div>
        </div>
      )
 }
}

export default Squad