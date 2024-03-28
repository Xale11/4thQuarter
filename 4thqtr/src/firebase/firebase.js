// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit, arrayUnion, arrayRemove } from 'firebase/firestore'
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFlBz74gEU6QVhFdZss9hTJQNikQuPH-4",
  authDomain: "thqtr-54c29.firebaseapp.com",
  projectId: "thqtr-54c29",
  storageBucket: "thqtr-54c29.appspot.com",
  messagingSenderId: "804797681586",
  appId: "1:804797681586:web:318d5dba8dc2dbb9b41eab",
  measurementId: "G-PMQCSWRNEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app)

export const listAllItems = async () => {
  let arrSet = {}
  let arrSet2 = []
  let tempArr = {}
  let nameList = {}
  let nameSet = []
  let extraArrSet2 = []
  let extraArr = {}
  let extraNameList = {}
  let extraNameSet = []
  let list = []
  let tempColour = []
  const q = query(collection(db, `allClothes`))
  let data = await getDocs(q)
  // console.log(55, data)

  try{
      let itemData = {}
      data.forEach(async (doc) => {
          itemData = {
              ...doc.data(),
              id: doc.id
          }
          list.push(itemData)
      })
      // console.log(6,list)
  } catch (err){
      console.error(err)
  }

  for (let i = 0; i < list.length; i++){
    let item = list[i]
      try{
          // console.log(1,item.id)
          const imageRef = ref(storage, `allClothes/${item.id}`)
          const imgData = await listAll(imageRef)
          for (let i = 0; i < imgData.items.length; i++){
            let item = await getDownloadURL(imgData.items[i])
            // console.log(i, item)
            arrSet2.push(item)
            nameSet.push(imgData.items[i].name)
          }
          tempArr = {...tempArr, [item.id]: arrSet2}
          nameList = {...nameList, [item.id]: nameSet}
          arrSet2 = []
          nameSet = []
          // console.log(20,tempArr)
      } catch (err){
          console.error(err)
      }
  }

  for (let i = 0; i < list.length; i++){
    let item = list[i]
      try{
          // console.log(1,item.id)
          const imageRef = ref(storage, `allClothes/${item.id}/extras`)
          const imgData = await listAll(imageRef)
          for (let i = 0; i < imgData.items.length; i++){
            let item = await getDownloadURL(imgData.items[i])
            // console.log(i, item)
            extraArrSet2.push(item)
            extraNameSet.push(imgData.items[i].name)
          }
          extraArr = {...extraArr, [item.id]: extraArrSet2}
          extraNameList = {...extraNameList, [item.id]: extraNameSet}
          extraArrSet2 = []
          extraNameSet = []
          // console.log(20,extraArr)
      } catch (err){
          console.error(err)
      }
  }

  for (let i = 0; i < list.length; i++){
    let item = list[i]
    let colourItem = tempColour[i]
      try{
          for (const key in colourItem){
            const imageRef = ref(storage, `allClothes/${item.id}/${key}`)
            const imgData = await listAll(imageRef)
            // console.log(5, imgData)
          }
          
          
          
          
      } catch (err){
          console.error(err)
      }
  }
  // console.log(51, tempArr)
  console.log(21, {items: list, colourDetails: tempColour, mainImgs: tempArr, mainImgsDets: nameList, extraImgs: extraArr, extraListDets: extraNameList})

  return {items: list, mainImgs: tempArr, mainImgsDets: nameList, extraImgs: extraArr, extraListDets: extraNameList}
}


export const uploadBrandMsg = async () => {
  let beliefData
  let visionData
  let valuesData
  let docRef
  try{
    docRef = doc(db, "brandMsg", "belief")
    beliefData = await getDoc(docRef)
    beliefData = await beliefData.data()
    docRef = doc(db, "brandMsg", "vision")
    visionData = await getDoc(docRef)
    visionData = await visionData.data()
    docRef = doc(db, "brandMsg", "values")
    valuesData = await getDoc(docRef)
    valuesData = await valuesData.data()
  } catch (err){
    console.error(err)
  }
  console.log({belief: beliefData, vision: visionData, values: valuesData})
  return {belief: beliefData, vision: visionData, values: valuesData}
}

export const uploadPolicy = async () => {
  const docRef = doc(db, "policies", "policy")
  let data
  try {
    data = await getDoc(docRef)
    data = data.data()
  } catch (err){
    console.error(err)
  }

  console.log(data)
  return {policy: data}
}

export const uploadContactInfo = async () => {
  const contactRef = collection(db, "contact")
  let docs = {}
  try {
    let data = await getDocs(contactRef)
    for (let i = 0; i < data.docs.length; i++){
      let item = data.docs[i].data()
      docs = {...docs, [data.docs[i].id]: item}
    }
  } catch (error) {
    console.error(error)
  }
  return docs
}

export const uploadSquadPhotos = async () => {
  const imageRef = ref(storage, "squad")
  let imgData = []
  try {
    let data = await listAll(imageRef)
    for (let i = 0; i < data.items.length; i++){
      let item = await getDownloadURL(data.items[i])
      imgData.push({url: item, name: data.items[i].name})
    }
  } catch (error) {
    console.error(error)
  }
  return imgData
}

export const uploadGalleryPhotos = async () => {
  const imageRef = ref(storage, "gallery")
  let imgData = []
  try {
    let data = await listAll(imageRef)
    for (let i = 0; i < data.items.length; i++){
      let item = await getDownloadURL(data.items[i])
      let extra = await getMetadata(data.items[i])
      imgData.push({url: item, name: data.items[i].name, ...extra.customMetadata})
    }
  } catch (error) {
    console.error(error)
  }
  console.log(imgData)
  return imgData
}


export const uploadPromoClothes = async () => {
  let list = []
  const q = query(collection(db, `allClothes`), where("notList", "==", false))
  const imageRef = ref(storage, "allClothes")
  let imgData = []
  let data2
  try{
      let data = await getDocs(q)
      let itemData = {}
      for (let n = 0; n < data.docs.length; n++) {
        let doc = data.docs[n]
        imgData = []
        data2 = await listAll(ref(storage, `allClothes/${doc.id}`))
        for (let i = 0; i < data2.items.length; i++){
          let item = await getDownloadURL(data2.items[i])
          imgData.push({url: item, name: data2.items[i].name})
        }
          itemData = {
              ...doc.data(),
              id: doc.id,
              img: imgData
          }
          list.push(itemData)
      }
      // console.log(6,list)
  } catch (err){
      console.error(err)
  }
  return list
}

export const uploadClothesItem = async (id) => {
  let list
  const q = query(doc(db, `allClothes`, `${id}`))
  let imgData = []
  let data2
  let data3
  let itemData = {}
  try {
      let data = await getDoc(q)
      list = data.data()
      data2 = await listAll(ref(storage, `allClothes/${id}`))
      data3 = await listAll(ref(storage, `allClothes/${id}/extras`))
      for (let i = 0; i < data2.items.length; i++){
        let item = await getDownloadURL(data2.items[i])
        imgData.push({url: item, name: data2.items[i].name})
      }
      itemData = {
          ...list,
          id:id,
          mainImg: imgData,
      }
      imgData = []
      for (let i = 0; i < data3.items.length; i++){
        let item = await getDownloadURL(data3.items[i])
        imgData.push({url: item, name: data3.items[i].name})
      }
      itemData = {
          ...itemData,
          extraImg: imgData,
      }
  } catch (error) {
    console.error(error)
  }
  // console.log(itemData)
  return itemData
}

function randomComparator() {
  return Math.random() - 0.5;
}

export const uploadSimialrClothes = async (type) => {
  let list = []
  const q = query(collection(db, `allClothes`), where("type", "array-contains", type))
  const q1 = query(collection(db, `allClothes`))
  const imageRef = ref(storage, "allClothes")
  let imgData = []
  let idArray = []
  let data2
  let data12
  try{
      let data = await getDocs(q)
      let data1 = await getDocs(q1)
      // console.log(7,data1)
      let itemData = {}
      if (data.empty){

      }else {
        const randomizedArray = data.docs.slice().sort(randomComparator);
        const randomizedArray1 = data1.docs.slice().sort(randomComparator);
        for (let n = 0; n < 3; n++) {
          itemData = {}
          let doc = randomizedArray[n]
          let doc1 = randomizedArray1[n]
          // console.log(101, doc1)
          imgData = []
          data2 = await listAll(ref(storage, `allClothes/${doc?.id}`))
          for (let i = 0; i < data2.items.length; i++){
            let item = await getDownloadURL(data2.items[i])
            imgData.push({url: item, name: data2.items[i].name})
          }
          itemData = {
              ...doc?.data(),
              id: doc?.id,
              img: imgData
          }
          if (itemData.id != undefined && !idArray.includes(itemData.id)){
            list.push(itemData)
            idArray.push(itemData.id)
          }
          imgData = []
          data12 = await listAll(ref(storage, `allClothes/${doc1.id}/extras`))
          for (let i = 0; i < data12.items.length; i++){
            let item = await getDownloadURL(data12.items[i])
            imgData.push({url: item, name: data12.items[i].name})
          }
          itemData = {
            ...doc1?.data(),
            id: doc1?.id,
            img: imgData
        }
        if (itemData.id != undefined && !idArray.includes(itemData.id)){
          list.push(itemData)
          idArray.push(itemData.id)
        }
        }
        console.log(67, idArray)
      }
  } catch (err){
      console.error(err)
  }
  console.log(8, list)
  return list
}

export const uploadShippingRates = async () => {
  let data
  let list = []
  try {
    data = await getDocs(collection(db, "shipping"))
    for (let i = 0; i < data.size; i++){
      let doc = data.docs[i].data()
      list.push({
        ...doc,
        id: data.docs[i].id
      })
    }
  } catch (error) {
    console.error(error)
  }
  return list
}

export const deleteFolderFiles = async (id) => {
  const imageRef = ref(storage, `allClothes/${id}`)
  const extraRef = ref(storage, `allClothes/${id}/extras`)
  try {
    let data = await listAll(imageRef)
    for (let i = 0; i < data.items.length; i++){
      let item = data.items[i]
      const deleteRef = ref(storage, `allClothes/${id}/${item.name}`)
      await deleteObject(deleteRef)
    }
    let data1 = await listAll(extraRef)
    for (let i = 0; i < data1.items.length; i++){
      let item = data1.items[i]
      const deleteRef1 = ref(storage, `allClothes/${id}/extras/${item.name}`)
      await deleteObject(deleteRef1)
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateStockCount = async (arr) => {
  try {
    for (let i = 0; i < arr.length; i++){
      let item = arr[i]
      let data = await uploadClothesItem(item.id)
      console.log(data)
      let clothingDocRef = doc(db, "allClothes", `${item.id}`)
      if (item.size == "xs"){
        await updateDoc(clothingDocRef, {
          "sizeXs.sizeStock": data.sizeXs.sizeStock - item.quantity,
      })
      } else if (item.size == "s"){
        await updateDoc(clothingDocRef, {
          "sizeS.sizeStock": data.sizeS.sizeStock - item.quantity,
      })
      } else if (item.size == "m"){
        await updateDoc(clothingDocRef, {
          "sizeM.sizeStock": data.sizeM.sizeStock - item.quantity,
      })
      } else if (item.size == "l"){
        await updateDoc(clothingDocRef, {
          "sizeL.sizeStock": data.sizeL.sizeStock - item.quantity,
      })
      } else if (item.size == "xl"){
        await updateDoc(clothingDocRef, {
          "sizeXl.sizeStock": data.sizeXl.sizeStock - item.quantity,
      }) 
      } else if (item.size == "os"){
        await updateDoc(clothingDocRef, {
          "sizeOs.sizeStock": data.sizeOs.sizeStock - item.quantity,
      })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const fetchEmails = async () => {
  try {
      let data = await getDoc(doc(db, "emails", "emailList"))
      data = data.data()
      return data
  } catch (error) {
      console.error(error)
      return ["ERROR"]
  }
}