import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore'
import { db, fetchEmails } from '../firebase/firebase'
import { MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import "./Email.css"
import e from 'cors'


const Email = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [emailList, setEmailList] = useState([])

    const clearEmail = () => {
        setEmail("")
    }

    const appendEmail = async (e) => {
        e.preventDefault()
        try {
          const docRef = doc(db, "emails", "emailList")
          const updateRef = await updateDoc(docRef, {
            email: arrayUnion(email)
          })
          setEmail("Email has been added.")
          setTimeout(clearEmail, 1700)
          window.location.reload()
        } catch (error) {
          console.error(error)
        }
      }
      
    const removeEmail = async (email) => {
        try {
          const docRef = doc(db, "emails", "emailList")
          const updateRef = await updateDoc(docRef, {
            email: arrayRemove(email)
          })
          window.location.reload()
        } catch (error) {
          console.error(error)
          alert("There was error please try again")
        }
      }

      const uploadEmailList = async () => {
        try {
            let data = await fetchEmails()
            console.log(data)
            setEmailList([...data.email])
        } catch (error) {
            console.error(error)
        }
      }

      const downloadEmails = () => {
        let csvContent = 'email\n'; // Header line
        emailList.forEach(email => {
            csvContent += `${email}\n`; // Add each email address
        });

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'email_list.csv'; // Filename
        downloadLink.style.display = 'none';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
      }

      useEffect(() => {
        uploadEmailList()
      }, [])

      console.log(emailList)

  return (
    <div className='squad'>
            <div className="squadTitle">Customer Emails</div>
            <div className="squadContainer">
                <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
                <form className='form' onSubmit={(e) => {appendEmail(e)}}>
                    <div className="formTitle">Add New Email:</div>
                    <input className="emailCmsInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <button className='submitMsg'>Submit </button>
                </form>
                <div className="formTitle">Email List:</div>
                <div className="downloadEmailCsv" onClick={downloadEmails}>Download Emails <FaDownload /></div>
                <div className="emailCmsList">
                    {emailList.map((contact) => {
                        return (
                            <div className="customerEmail"><div className='emailValue'>{contact}</div><div className='emailDelete' onClick={() => removeEmail(contact)}><MdDeleteForever /></div></div>
                        )
                    })}
                </div>
            </div>
        </div>
  )
}

export default Email