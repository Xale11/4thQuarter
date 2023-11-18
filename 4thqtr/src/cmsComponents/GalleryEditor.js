import React, {useState, useRef, useEffect} from 'react'
import "./GalleryEditor.css"
import { useNavigate } from 'react-router-dom'
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject, list} from "firebase/storage"
import { storage, uploadGalleryPhotos } from '../firebase/firebase'
import { useStateContext } from '../context/context'
import Auth from './Auth'

const GalleryEditor = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const photosRef = useRef()
    const madeByRef = useRef()
    const linkRef = useRef()
    const updateMadeByRef = useRef()
    const updateLinkRef = useRef()

    const [photos, setPhotos] = useState()
    const [show, setShow] = useState("")
    const [reveal, setReveal] = useState(false)

    const fetchGalleryPhotos = async () => {
        let data = await uploadGalleryPhotos()
        return setPhotos([...data])
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

    const handleUpdate = async (name) => {
        try {
            const updateRef = ref(storage, `gallery/${name}`)
            let metaData = {
                customMetadata: {
                    madeBy: updateMadeByRef.current.value,
                    link: updateLinkRef.current.value
                }
            }
            await updateMetadata(updateRef, metaData)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert("There was an error please try again.")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let i = 0; i < photosRef.current.files.length; i++){
            try {
                const imageRef = ref(storage, `gallery/${photosRef.current.files[i].name}`)
                await uploadBytes(imageRef, photosRef.current.files[i])
                let metaData = {
                    customMetadata: {
                        madeBy: madeByRef.current.value,
                        link: linkRef.current.value
                    }
                }
                await updateMetadata(imageRef, metaData)
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
        fetchGalleryPhotos()
    }, [])

    console.log(photos)

  if (!user){
    return (<Auth/>)
  } else{
    return (
        <div className='galleryEditor'>
            <div className="galleryEditorTitle">Gallery Editor</div>
            <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
            <div className="galleryContainer">
                <form className='form' onSubmit={(e) => handleSubmit(e)}>
                        <div className="formTitle">Lookbook:</div>
                        <input type="file" name="" id="" multiple ref={photosRef} required/>
                        <div className="inputSection">
                            <div>Made By:</div>
                            <input type="text" ref={madeByRef} />
                        </div>
                        <div className="inputSection">
                            <div>Link to social:</div>
                            <input type="text" ref={linkRef} />
                        </div>
                        <button className='submitMsg'>Submit</button>
                </form>
                <div className="formTitle">Squad Photos List:</div>
                <div className="squadPhotoList">
                    {photos?.map((photo, i) => {
                        return (
                            <div className="photo">
                                <img src={photo.url} onClick={() => {setShow(photo.name); setReveal("photo.name")}} alt="" srcset="" />
                                {show == photo.name && <div className="deleteIt">
                                    {reveal !== photo.name && <div className='metaData'>
                                        <div>Made by:</div>
                                        <input type="text" ref={updateMadeByRef} value={photo.madeBy} onChange={(e) => setPhotos(state => state.map((item, x) => x == i ? {...item, madeBy: e.target.value} : {...item}))}/>
                                        <div>Link to social:</div>
                                        <input type="text" ref={updateLinkRef} value={photo.link} onChange={(e) => setPhotos(state => state.map((item, x) => x == i ? {...item, link: e.target.value} : {...item}))}/>
                                        <div className="metaButtons">
                                            <button onClick={() => handleUpdate(photo.name)}>Update</button>
                                            <button onClick={() => fetchGalleryPhotos()}>Reset to original</button>
                                        </div>
                                    </div>}
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

export default GalleryEditor