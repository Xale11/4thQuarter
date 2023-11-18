import React, { useState, useRef, useEffect } from 'react'
import { addDoc, getDocs, getDoc, collection, serverTimestamp, setDoc, doc, deleteDoc, query, where, onSnapshot, orderBy, updateDoc, or, limit } from 'firebase/firestore'
import {ref, uploadBytes, listAll, getDownloadURL, getMetadata, updateMetadata, deleteObject, list} from "firebase/storage"
import { storage, db, listAllItems, deleteFolderFiles } from '../firebase/firebase'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {v4} from "uuid"
import "./AllClothes.css"
import { useStateContext } from '../context/context'
import Auth from './Auth'

const AllCothes = () => {

    const navigate = useNavigate()

    const {user, setUser} = useStateContext()

    const allClothesRef = collection(db, "allClothes")

    const [isDelete, setIsDelete] = useState(false)
    const [isPromo, setIsPromo] = useState(false)
    const [addNew, setAddNew] = useState(false)
    const [colors, setColors] = useState(false)
    const [xs, setXs] = useState(false)
    const [s, setS] = useState(false)
    const [m, setM] = useState(false)
    const [l, setL] = useState(false)
    const [xl, setXl] = useState(false)
    const [os, setOs] = useState(false)
    const [imageDets, setImageDets] = useState()
    const [extraImageDets, setExtraImageDets] = useState()
    const [updatedXs, setUpdatedXs] = useState(false)
    const [updatedS, setUpdatedS] = useState(false)
    const [updatedM, setUpdatedM] = useState(false)
    const [updatedL, setUpdatedL] = useState(false)
    const [updatedXl, setUpdatedXl] = useState(false)
    const [updatedOs, setUpdatedOs] = useState(false)
    const [test, setTest] = useState(false)
    const [size, setSize] = useState(0)
    const [updatedSize, setUpdatedSize] = useState(0)
    const [colourList, setColourList] = useState([])
    const [colourDets, setColourDets] = useState({})
    const [sizeDets, setSizeDets] = useState({})
    const [itemType, setItemType] = useState([])
    const [updateType, setUpdateType] = useState([])
    const [sizeList, setSizeList] = useState([])
    const [imageUpload, setImageUpload] = useState()
    const [extraUpload, setExtraUpload] = useState()
    const [updatedImageUpload, setUpdatedImageUpload] = useState()
    const [updatedExtraUpload, setUpdatedExtraUpload] = useState()
    const [colourUpload, setColourUpload] = useState()
    const [itemList, setItemList] = useState([])
    const [imageList, setImageList] = useState({})
    const [extraImageList, setExtraImageList] = useState({})
    const [image2List, setImage2List] = useState({fill: true})
    const [colList, setColList] = useState([])
    const [tempImg, setTempImg] = useState()
    const [imgSet, setImgSet] = useState([])
    const [data, setData] = useState()
    const [reveal, setReveal] = useState()
    const [colourItems, setColourItems] = useState()
    const [updateColour, setUpdateColour] = useState("")
    const [reset, setReset] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const clothesName = useRef()
    const clothesPrice = useRef()
    const clothesDefaultImgs = useRef()
    const clothesExtraImgs = useRef()
    const clothesType = useRef()
    const clothesDesc = useRef()
    const clothesPromo = useRef()
    const colourName = useRef()
    const colourPriceAdd = useRef()
    const colourMainImgs = useRef()
    const colourExtraImgs = useRef()
    const outStock = useRef()
    const notList = useRef()
    const colourXs = useRef()
    const colourS = useRef()
    const colourM = useRef()
    const colourL = useRef()
    const colourXl = useRef()
    const colourOs = useRef()
    const colourUpdatedName = useRef()
    const colourUpdatedPriceAdd = useRef()
    const colourUpdatedMainImgs = useRef()
    const colourUpdatedExtraImgs = useRef()
    const colourUpdatedXs = useRef()
    const colourUpdatedS = useRef()
    const colourUpdatedM = useRef()
    const colourUpdatedL = useRef()
    const colourUpdatedXl = useRef()
    const colourUpdatedOs = useRef()
    const xsPrice = useRef()
    const xsStock = useRef()
    const sPrice = useRef()
    const sStock = useRef()
    const mPrice = useRef()
    const mStock = useRef()
    const lPrice = useRef()
    const lStock = useRef()
    const xlPrice = useRef()
    const xlStock = useRef()
    const osPrice = useRef()
    const osStock = useRef()
    const xsUpdatedPrice = useRef()
    const xsUpdatedStock = useRef()
    const sUpdatedPrice = useRef()
    const sUpdatedStock = useRef()
    const mUpdatedPrice = useRef()
    const mUpdatedStock = useRef()
    const lUpdatedPrice = useRef()
    const lUpdatedStock = useRef()
    const xlUpdatedPrice = useRef()
    const xlUpdatedStock = useRef()
    const osUpdatedPrice = useRef()
    const osUpdatedStock = useRef()
    const imgData = useRef([])
    const finalImg = useRef()
    

    const deleteColour = (colour, i) => {
        let arr =[...colourItems]
        if (Object.keys(arr[i]).length == 1){
            alert("You cannot delete the only colour of an item. There must be at least one")
        }else {
            delete arr[i][colour.colourName]
            setColourItems([...arr])
        }
        
    }
    
    const addItemType = (type) => {
        let arr = [...itemType]
        if (itemType.includes(type)){
            let index = arr.indexOf(type)
            arr.splice(index, 1)
            console.log(45, arr)
            setItemType([...arr])
        }else{
            arr.push(type)
            setItemType([...arr])
        }
    }

    const updateItemType = (arr, type) => {
        if (arr.includes(type)){
            let index = arr.indexOf(type)
            arr.splice(index, 1)
            console.log(45, arr)
            setUpdateType([...arr])
        }else{
            arr.push(type)
            setUpdateType([...arr])
        }
        console.log(arr)
    }

    const addSizeType = (type) => {
        let arr = [...sizeList]
        if (sizeList.includes(type)){
            let index = arr.indexOf(type)
            arr.splice(index, 1)
            console.log(45, arr)
            setSizeList([...arr])
        }else{
            arr.push(type)
            setSizeList([...arr])
        }
    }

    const setRed = (e) => {
        console.log(e.currentTarget.className)
        if (e.currentTarget.className.toLowerCase().includes("bgred")){
            e.currentTarget.className = e.currentTarget.className.replace("bgRed", "")
        }else{
            e.currentTarget.className += " bgRed"
        }
        console.log(e.currentTarget.className)
    }
    

    const sizePicked = (e) => {
        if (e.target.checked){
            setSize((size) => (size + 1))
        }else{
            setSize((size) => (size - 1))
        }
    }

    const sizeUpdatedPicked = (e) => {
        if (e.target.checked){
            setUpdatedSize((size) => (size + 1))
        }else{
            setUpdatedSize((size) => (size - 1))
        }
    }

    const checkEditColour = (colour) => {
        if (!colour.colourXs.picked & !colour.colourS.picked & !colour.colourM.picked & !colour.colourL.picked & !colour.colourXl.picked & !colour.colourOs.picked){
            alert("You need to pick at least one size.")
            setShowEdit(true)
        }
        else{
            setShowEdit(false)
        }
    }

    const checkColour = () => {
        if (size == 0){
            alert("Please select a size")
        }else if (!/[a-zA-Z]/g.test(colourName.current?.value)){
            alert("Please enter the colour name")
        }else{
            setXs(false)
            setS(false)
            setM(false)
            setL(false)
            setXl(false)
            setOs(false)
            
            setColourDets({
                colourName: colourName.current?.value,
                colourPrice: colourPriceAdd.current?.value == "" ? 0 : colourPriceAdd.current?.value * 1,
                colourMainImgs: colourMainImgs.current?.files,
                colourExtraImgs: colourExtraImgs.current?.files,
                colourXs: {
                    picked: colourXs.current?.checked,
                    sizePrice: xsPrice.current !== undefined ? xsPrice.current?.value !== "" ? xsPrice.current?.value * 1 : 0  : 0,
                    sizeStock: xsStock.current !== undefined ? xsStock.current?.value !== "" ? xsStock.current?.value * 1 : 0  : 0
                },
                colourS: {
                    picked: colourS.current?.checked,
                    sizePrice: sPrice.current !== undefined ? sPrice.current?.value !== "" ? sPrice.current?.value * 1 : 0 : 0,
                    sizeStock: sStock.current !== undefined ? sStock.current?.value !== "" ? sStock.current?.value * 1 : 0 : 0
                },
                colourM: {
                    picked: colourM.current?.checked,
                    sizePrice: mPrice.current !== undefined ? mPrice.current?.value !== "" ? mPrice.current?.value * 1 : 0 : 0,
                    sizeStock: mStock.current !== undefined ? mStock.current?.value !== "" ? mStock.current?.value * 1 : 0 : 0
                },
                colourL: {
                    picked: colourL.current?.checked,
                    sizePrice: lPrice.current !== undefined ? lPrice.current?.value !== "" ? lPrice.current?.value * 1 : 0 : 0,
                    sizeStock: lStock.current !== undefined ? lStock.current?.value !== "" ? lStock.current?.value * 1 : 0 : 0
                },
                colourXl: {
                    picked: colourXl.current?.checked,
                    sizePrice: xlPrice.current !== undefined ? xlPrice.current?.value !== "" ? xlPrice.current?.value * 1 : 0 : 0,
                    sizeStock: xlStock.current !== undefined ? xlStock.current?.value !== "" ? xlStock.current?.value * 1 : 0 : 0
                },
                colourOs: {
                    picked: colourOs.current?.checked,
                    sizePrice: osPrice.current !== undefined ? osPrice.current?.value !== "" ? osPrice.current?.value * 1 : 0 : 0,
                    sizeStock: osStock.current !== undefined ? osStock.current?.value !== "" ? osStock.current?.value * 1 : 0 : 0
                },


            })
            console.log(3,colourDets)
            setColors(!colors)
        }
    }

    const checkUpdatedColour = (i) => {
        let obj = {}
        if (updatedSize == 0){
            alert("Please select a size")
        }else if (!/[a-zA-Z]/g.test(colourUpdatedName.current?.value)){
            alert("Please enter the colour name")
        }else{
            setUpdatedXs(false)
            setUpdatedS(false)
            setUpdatedM(false)
            setUpdatedL(false)
            setUpdatedXl(false)
            setUpdatedOs(false)
            
            let obj = {
                colourName: colourUpdatedName.current?.value,
                colourPrice: colourUpdatedPriceAdd.current?.value == "" ? 0 : colourUpdatedPriceAdd.current?.value * 1,
                colourMainImgs: colourUpdatedMainImgs.current?.files,
                colourExtraImgs: colourUpdatedExtraImgs.current?.files,
                colourXs: {
                    picked: colourUpdatedXs.current?.checked,
                    sizePrice: xsUpdatedPrice.current !== undefined ? xsUpdatedPrice.current?.value !== "" ? xsUpdatedPrice.current?.value * 1 : 0  : 0,
                    sizeStock: xsUpdatedStock.current !== undefined ? xsUpdatedStock.current?.value !== "" ? xsUpdatedStock.current?.value * 1 : 0  : 0
                },
                colourS: {
                    picked: colourUpdatedS.current?.checked,
                    sizePrice: sUpdatedPrice.current !== undefined ? sUpdatedPrice.current?.value !== "" ? sUpdatedPrice.current?.value * 1 : 0 : 0,
                    sizeStock: sUpdatedStock.current !== undefined ? sUpdatedStock.current?.value !== "" ? sUpdatedStock.current?.value * 1 : 0 : 0
                },
                colourM: {
                    picked: colourUpdatedM.current?.checked,
                    sizePrice: mUpdatedPrice.current !== undefined ? mUpdatedPrice.current?.value !== "" ? mUpdatedPrice.current?.value * 1 : 0 : 0,
                    sizeStock: mUpdatedStock.current !== undefined ? mUpdatedStock.current?.value !== "" ? mUpdatedStock.current?.value * 1 : 0 : 0
                },
                colourL: {
                    picked: colourUpdatedL.current?.checked,
                    sizePrice: lUpdatedPrice.current !== undefined ? lUpdatedPrice.current?.value !== "" ? lUpdatedPrice.current?.value * 1 : 0 : 0,
                    sizeStock: lUpdatedStock.current !== undefined ? lUpdatedStock.current?.value !== "" ? lUpdatedStock.current?.value * 1 : 0 : 0
                },
                colourXl: {
                    picked: colourUpdatedXl.current?.checked,
                    sizePrice: xlUpdatedPrice.current !== undefined ? xlUpdatedPrice.current?.value !== "" ? xlUpdatedPrice.current?.value * 1 : 0 : 0,
                    sizeStock: xlUpdatedStock.current !== undefined ? xlUpdatedStock.current?.value !== "" ? xlUpdatedStock.current?.value * 1 : 0 : 0
                },
                colourOs: {
                    picked: colourUpdatedOs.current?.checked,
                    sizePrice: osUpdatedPrice.current !== undefined ? osUpdatedPrice.current?.value !== "" ? osUpdatedPrice.current?.value * 1 : 0 : 0,
                    sizeStock: osUpdatedStock.current !== undefined ? osUpdatedStock.current?.value !== "" ? osUpdatedStock.current?.value * 1 : 0 : 0
                },


            }
            setColourItems(prevState => prevState.map((col, n) => n == i ? {...col, [obj.colourName]: {...obj}} : {...col}))
            setAddNew(!addNew)
        }
    }

    const closeColourEdit = (i, colour) => {
        if (colourItems[i][colour].colourName == ""){
            alert("You need to pick name for the colour")
        } else if(!colourItems[i][colour].sizeXs.picked & !colourItems[i][colour].sizeS.picked & !colourItems[i][colour].sizeM.picked & !colourItems[i][colour].sizeL.picked & !colourItems[i][colour].sizeXl.picked & !colourItems[i][colour].sizeOs.picked){
            alert("You need to pick at least one size")
        } else{
            setUpdateColour("")
        }
    }


    const deleteClothesItem = async (id) => {
        try {
            await deleteDoc(doc(db, `allClothes`, `${id}`));
            fetchAllItems();
            deleteFolderFiles(`${id}`)
        
        } catch (error) {
            console.error(error)
            alert("There was an error please try again!")
        }
    }

    const listItems = async () => {
        let list = []
        try{
            const q = query(collection(db, `allClothes`))
            const data = await getDocs(q)
            let itemData = {}
            data.forEach(async (doc) => {
                itemData = {
                    ...doc.data(),
                    id: doc.id
                }
                list.push(itemData)
            })
            setItemList([...list])
            console.log(6,list)
        } catch (err){
            console.error(err)
        }
        try{
            let tempColour = []
            list.forEach(async (doc) => {
                let q = query(collection(db, `allClothes/${doc.id}/colours`))
                let data = await getDocs(q)
                let colourSet = []
                data.forEach((colour) => {
                    let colourname = colour.data().colourName
                    colourSet.push({
                        [colourname]: colour.data(),
                    })
                })
                tempColour.push(colourSet)
                // console.log(550, tempColour)
                setColList([...tempColour])
            })
        } catch (err){
            console.error(err)
        }
        let arrSet = {}
        let arrSet2 = []
        let tempArr = []
        itemList.forEach(async (item, index) => {
            try{
                console.log(item.id)
                let imageRef = ref(storage, `allClothes/${item.id}`)
                let data = await listAll(imageRef)
                console.log(data)
                setImgSet([])
                data.items.forEach(async (img, i) => {
                    console.log(data.items.length)
                    img = await getDownloadURL(img)
                    console.log(i, img)
                    if (data.items.length > 1){
                        if (i == data.items.length - 1){
                            tempArr.push(img)
                            arrSet2 = {[item.id]: [...tempArr]}
                            setImageList({...imageList, ...arrSet2})
                        }else if (i == 0) {
                            tempArr = [img]
                            arrSet2 = {[item.id]: [...tempArr]}
                        }else {
                            tempArr.push(img)
                            arrSet2 = {[item.id]: [...tempArr]}
                        }
                    }else {
                        arrSet = {...arrSet, [item.id]: [img]}
                        setImageList({...imageList, ...arrSet})
                    }
                    console.log(arrSet) 
                })
            } catch (err){
                console.error(err)
            }
            
        })
        
    }

    const deleteDefualtImg = (id, index) => {
        if (imageList[id].length == 1){
            alert("You cannot delete the only image of the item")
        } else{
            let arr = [...imageList[id]]
            arr.splice(index, 1)
            console.log(52, arr)
            setImageList(prevState => ({...prevState, [id]: [...arr]}))
        }
        
    }

    const deleteExtraImg = (id, index) => {
        let arr = [...extraImageList[id]]
        arr.splice(index, 1)
        console.log(52, arr)
        setExtraImageList(prevState => ({...prevState, [id]: [...arr]}))
    }

    const editSizePicked = (e, ind, size) => {
        setColourList(prevState => (prevState.map((col, i) => i == ind ? {...col, [`colour${size}`]: {...col[`colour${size}`], picked: e.target.checked}} : {...col} )))
    }

    const emptyUrl = (ind) => {
        setColourList(prevState => (prevState.map((col, i) => i == ind ? {...col, colourMainImgs: ""} : {...col} )))
    } 

    const listImages = async () => {
        itemList.forEach(async (item) => {
            try{
                console.log(item.id)
                let imageRef = ref(storage, `allClothes/${item.id}`)
                let data = await listAll(imageRef)
                console.log(data)
                setImgSet({})
                data.items.forEach(async (item, i) => {
                    item = await getDownloadURL(item)
                    setImgSet({[i]: item})
                    console.log(item)
                })
                
            } catch (err){
                console.error(err)
            }
            
        })
        console.log(42, imgSet)
    }

    const handleEditSubmit = async (e, index, id) => {
        const clothingDocRef = doc(db, "allClothes", id)
        try{
            e.preventDefault()
            await updateDoc(clothingDocRef, {
                name: itemList[index].name,
                defaultPrice: itemList[index].defaultPrice,
                promo: itemList[index].promo,
                type: itemList[index].type,
                colour: itemList[index].colour,
                desc: {
                    value: itemList[index].desc.value,
                    text: itemList[index].desc.text
                },
                notList: itemList[index].notList,
                outStock: itemList[index].outStock,
                sizeXs: {...itemList[index].sizeXs},
                sizeS: {...itemList[index].sizeS},
                sizeM: {...itemList[index].sizeM},
                sizeL: {...itemList[index].sizeL},
                sizeXl: {...itemList[index].sizeXl},
                sizeOs: {...itemList[index].sizeOs},
            })
            console.log(id)
            console.log(33, updatedImageUpload)
            for (let p = 0; p < imageDets[id].length; p++){
                let item = imageDets[id][p]
                console.log(44,item)
                let occ = 0
                for (let z = 0; z < imageList[id]?.length; z++){
                    if (!imageList[id][z].includes(item)){
                        occ++
                    }
                    if (occ == imageList[id].length){
                        const deleteRef = ref(storage, `allClothes/${id}/${imageDets[id][p]}`)
                        await deleteObject(deleteRef)
                    }
                }
            }
            for(let i = 0; i < updatedImageUpload?.length; i++){                
                const storageRef = ref(storage, `allClothes/${id}/${updatedImageUpload[i].name}`)
                await uploadBytes(storageRef, updatedImageUpload[i])
            }

            for (let p = 0; p < extraImageDets[id].length; p++){
                let item = extraImageDets[id][p]
                console.log(44,item)
                let occ = 0
                for (let z = 0; z < extraImageList[id]?.length; z++){
                    if (!extraImageList[id][z].includes(item)){
                        occ++
                    }
                    if (occ == extraImageList[id].length){
                        const deleteRef = ref(storage, `allClothes/${id}/extras/${extraImageDets[id][p]}`)
                        await deleteObject(deleteRef)
                    }
                }
            }
            for(let i = 0; i < updatedExtraUpload?.length; i++){                
                const storageRef = ref(storage, `allClothes/${id}/extras/${updatedExtraUpload[i].name}`)
                await uploadBytes(storageRef, updatedExtraUpload[i])
            }
            alert("Item updated!")
            window.location.reload()
        } catch (err){
            e.preventDefault()
            console.error(err)
            alert("There was error. Please add try update the item again")
        }
        
    }

    const handleSubmit = async (e) => {
        let itemId
        if(sizeList.length == 0){
            e.preventDefault()
            console.log(33)
            alert("You need to pick at least 1 size.")
        } else{
            try{
                e.preventDefault()
                itemId = await addDoc(allClothesRef, {
                    name: clothesName.current?.value,
                    defaultPrice: clothesPrice.current?.value * 1,
                    promo: clothesPromo.current?.checked,
                    type: itemType,
                    colour: colourName.current?.value,
                    desc: {
                        text: clothesDesc.current?.value.split(/\n\s*\n/),
                        value: clothesDesc.current?.value,
                    },
                    outStock: outStock.current?.checked,
                    notList: notList.current?.checked,
                    sizeXs: {
                        picked: colourXs.current?.checked,
                        sizePrice: xsPrice.current !== undefined ? xsPrice.current?.value !== "" ? xsPrice.current?.value * 1 : 0  : 0,
                        sizeStock: xsStock.current !== undefined ? xsStock.current?.value !== "" ? xsStock.current?.value * 1 : 0  : 0
                    },
                    sizeS: {
                        picked: colourS.current?.checked,
                        sizePrice: sPrice.current !== undefined ? sPrice.current?.value !== "" ? sPrice.current?.value * 1 : 0 : 0,
                        sizeStock: sStock.current !== undefined ? sStock.current?.value !== "" ? sStock.current?.value * 1 : 0 : 0
                    },
                    sizeM: {
                        picked: colourM.current?.checked,
                        sizePrice: mPrice.current !== undefined ? mPrice.current?.value !== "" ? mPrice.current?.value * 1 : 0 : 0,
                        sizeStock: mStock.current !== undefined ? mStock.current?.value !== "" ? mStock.current?.value * 1 : 0 : 0
                    },
                    sizeL: {
                        picked: colourL.current?.checked,
                        sizePrice: lPrice.current !== undefined ? lPrice.current?.value !== "" ? lPrice.current?.value * 1 : 0 : 0,
                        sizeStock: lStock.current !== undefined ? lStock.current?.value !== "" ? lStock.current?.value * 1 : 0 : 0
                    },
                    sizeXl: {
                        picked: colourXl.current?.checked,
                        sizePrice: xlPrice.current !== undefined ? xlPrice.current?.value !== "" ? xlPrice.current?.value * 1 : 0 : 0,
                        sizeStock: xlStock.current !== undefined ? xlStock.current?.value !== "" ? xlStock.current?.value * 1 : 0 : 0
                    },
                    sizeOs: {
                        picked: colourOs.current?.checked,
                        sizePrice: osPrice.current !== undefined ? osPrice.current?.value !== "" ? osPrice.current?.value * 1 : 0 : 0,
                        sizeStock: osStock.current !== undefined ? osStock.current?.value !== "" ? osStock.current?.value * 1 : 0 : 0
                    },
                })
                console.log(itemId.id)
                console.log(33, extraUpload)
                for(let i = 0; i < imageUpload.length; i++){
                    const storageRef = ref(storage, `allClothes/${itemId.id}/${imageUpload[i].name}`)
                    await uploadBytes(storageRef, imageUpload[i])
                }
                for(let i = 0; i < extraUpload?.length; i++){
                    const storageRef = ref(storage, `allClothes/${itemId.id}/extras/${extraUpload[i].name}`)
                    await uploadBytes(storageRef, extraUpload[i])
                }
                alert("Item uploaded")
                window.location.reload()
            } catch (err){
                e.preventDefault()
                console.error(err)
                await deleteDoc(doc(db, "allClothes", itemId.id))
                alert("An error occured. Please try again.")
            }
        }
    }

    const fetchAllItems = async () => {
        let data = await listAllItems()
        return setItemList([...data.items]), setImageList({...data.mainImgs}, setExtraImageList({...data.extraImgs}), setExtraImageDets({...data.extraListDets}), setImageDets({...data.mainImgsDets}))
    }

    useEffect(() => {
        if (Object.keys(colourDets).length !== 0){
            // console.log(colourDets)
            let arr = [...colourList, colourDets]
            setColourList([...arr])
            return 
        }
    }, [colourDets])

    // console.log(66, itemList, colList, imageList)

    useEffect(() => {
        fetchAllItems()
    }, [reset])

    console.log(66, itemList, imageList, imageDets)

  if (!user){
    return (
        <Auth/>
    )
  }else {
    return (
        <div className='allClothes'>
            <div className="allClothesTitle">All Clothes</div>
            <div className="backHome" onClick={() => navigate("/cms")}>Back to Content Manager</div>
            <form className="addClothesDets">
                <div className="newDets">
                    <div>Name:</div>
                    <input type="text" required ref={clothesName}/>
                </div>
                <div className="newDets">
                    <div>Default Price (£):</div>
                    <input type="number" step="0.01" required ref={clothesPrice}/>
                </div>
                <div className="newDets">
                    <div>Main Images (2 Max):</div>
                    <input type="file" multiple ref={clothesDefaultImgs} onChange={(e) => {setImageUpload(e.target.files);}} required/> {/**add required!!!!! */}
                </div>
                <div className="newDets">
                    <div>Extra Images:</div>
                    <input type="file" multiple ref={clothesExtraImgs}  onChange={(e) => {setExtraUpload(e.target.files);}}/> {/**add required!!!!! */}
                </div>
                <div className="newDets">
                    <div>Type:</div>
                    <div className="clothesTypes">
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("jackets")}}>Jackets</div>
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("sweaters")}}>Sweaters</div>
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("tees")}}>Tees</div>
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("shorts")}}>Shorts</div>
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("bottoms")}}>Bottoms</div>
                        <div className="clothesType" onClick={(e) => {setRed(e); addItemType("sets")}}>Sets</div>
                    </div>
                </div>
                <div className="newDets">
                    <div>Promo:</div>
                    <input type='checkbox' className="isPromo" onClick={(e) => {setRed(e); setIsPromo(!isPromo)}} ref={clothesPromo}></input>
                </div>
                <div className="newDets">
                    <div>Colour:</div>
                    <input type="text" required ref={colourName}/>
                </div>
                <div className="newDets">
                    <div>Description:</div>
                    <textarea type="text" required ref={clothesDesc}/>
                </div>
                <div className="newDets">
                    <div>Show as out of stock:</div>
                    <input type='checkbox' ref={outStock}></input>
                </div>
                <div className="newDets">
                    <div>Do not show on clothing list:</div>
                    <input type='checkbox'  ref={notList}></input>
                </div>
                <div className="newDets sizes">
                            <div className="colorDet">Sizes:</div>
                            <div className="sizeType">
                                <div>•XS</div>
                                <input type="checkbox" className="sizePicked" ref={colourXs} onClick={(e) => {addSizeType("xs") ;setRed(e); setXs(!xs); sizePicked(e)}}></input>
                                {xs && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" ref={xsPrice} step="0.01" />
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={xsStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className="sizeType">
                                <div>•S</div>
                                <input type="checkbox" className="sizePicked" ref={colourS} onClick={(e) => {addSizeType("s") ;setRed(e); setS(!s); sizePicked(e)}}></input>
                                {s && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" step="0.01" ref={sPrice}/>
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={sStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className="sizeType">
                                <div>•M</div>
                                <input type="checkbox" className="sizePicked" ref={colourM} onClick={(e) => {addSizeType("m") ;setRed(e); setM(!m); sizePicked(e)}}></input>
                                {m && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" step="0.01" ref={mPrice}/>
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={mStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className="sizeType">
                                <div>•L</div>
                                <input type="checkbox" className="sizePicked" ref={colourL} onClick={(e) => {addSizeType("l") ;setRed(e); setL(!l); sizePicked(e)}}></input>
                                {l && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" step="0.01" ref={lPrice}/>
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={lStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className="sizeType">
                                <div>•XL</div>
                                <input type="checkbox" className="sizePicked" ref={colourXl} onClick={(e) => {addSizeType("xl") ;setRed(e); setXl(!xl); sizePicked(e)}}></input>
                                {xl && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" step="0.01" ref={xlPrice}/>
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={xlStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className="sizeType">
                                <div>•OS (0ne Size)</div>
                                <input type="checkbox" className="sizePicked" ref={colourOs} onClick={(e) => {addSizeType("os") ;setRed(e); setOs(!os); sizePicked(e)}}></input>
                                {os && <div className='sizeDets'>
                                    <div className="sizeDet">
                                        <div>Price Add On:</div>
                                        <input type="number" step="0.01" ref={osPrice}/>
                                    </div>
                                    <div className="sizeDet">
                                        <div>Stock Count:</div>
                                        <input type="number" ref={osStock}/>
                                    </div>
                                </div>}
                            </div>
                            <div className='stockInfo'>If you don't know the stock count, just put a high amount and edit it later. There is also a feature to set an item to out of stock after.</div>
                        </div>
                <button className="addNewItem" onClick={async (e) => await handleSubmit(e)}>Add New Item</button>
            </form>
            
            <div className="clothingListNav">
                <div className="clothingListTitle">Clothing List</div>
                {/* <div className="searchbar">
                    <input type="text" />
                </div> */}
            </div>
            <div className="clothingList">
                {itemList.map((item, i) => {
                    let id = item.id
                    let newTypes = item.type
                    // console.log(101, item)
                    return (
                        <div className='clothingItem' >
                            <img src={imageList[id][0]} alt="" />
                            <div>{item.name}</div>
                            <div>{item.colour}</div>
                            <div>£{item.defaultPrice}</div>
                            <div>Product ID: {item.id}</div>
                            {reveal !== item.id ? <div className="closeExtra" style={{marginBottom: "1em"}} onClick={() => {return setReveal(item.id)}}>Show More</div> : <div></div>}
                            {reveal == item.id ? <form className='itemEdit'>
                                <div className="closeExtra" onClick={() => setReveal("")}>Collapse</div>
                                <div className="updateDets">
                                    <div>Name:</div>
                                    <input type="text" required value={item.name} onChange={(e) => setItemList((prevState) => prevState.map((clothes, index) => (index == i ? {...prevState[index], name: e.target.value} : {...prevState[index]})))}/>
                                </div>
                                <div className="updateDets">
                                    <div>Default Price (£):</div>
                                    <input type="number" required step="0.01" value={item.defaultPrice} onChange={(e) => setItemList((prevState) => prevState.map((clothes, index) => (index == i ? {...prevState[index], defaultPrice: e.target.value} : {...prevState[index]})))}/>
                                </div>
                                <div className="updateDets">
                                    <div>Default Main Images (2 Max):</div>
                                    <input type="file" multiple onChange={(e) => {setUpdatedImageUpload(e.target.files);}}/>
                                </div>
                                <div className="updateImageList">
                                    {imageList[item.id].length == 0 ? <div>You need to at least 1 image!</div> : <div></div>}
                                    {imageList[item.id].map((img, p) => (
                                    <div className='listContainer'> 
                                        <div>Image {p + 1}</div>
                                        <a href={img} className='editImg' target='_blank'>View</a>
                                        <div className='editImg' onClick={() => {deleteDefualtImg(item.id, p)}}>Delete</div>
                                    </div>
                                    
                                    ))}
                                </div>
                                <div className="updateDets">
                                    <div>Extra Images:</div>
                                    <input type="file" multiple onChange={(e) => {setUpdatedExtraUpload(e.target.files);}}/>
                                </div>
                                <div className="updateImageList">
                                {extraImageList[item.id].length == 0 ? <div>There are no current images</div> : <div></div>}
                                    {extraImageList[item.id].map((img, p) => (
                                    <div className='listContainer'> 
                                        <div>Image {p + 1}</div>
                                        <a href={img} className='editImg' target='_blank'>View</a>
                                        <div className='editImg' onClick={() => {deleteExtraImg(item.id, p)}}>Delete</div>
                                    </div>
                                    
                                    ))}
                                </div>
                                <div className="updateDets">
                                <div>Type:</div>
                                    <div className="clothesTypes">
                                        <div className={`clothesType ${newTypes.includes("jackets") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "jackets")}}>Jackets</div>
                                        <div className={`clothesType ${newTypes.includes("sweaters") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "sweaters")}}>Sweaters</div>
                                        <div className={`clothesType ${newTypes.includes("tees") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "tees")}}>Tees</div>
                                        <div className={`clothesType ${newTypes.includes("shorts") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "shorts")}}>Shorts</div>
                                        <div className={`clothesType ${newTypes.includes("bottoms") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "bottoms")}}>Bottoms</div>
                                        <div className={`clothesType ${newTypes.includes("sets") ? "bgRed" : ""}`} onClick={(e) => {setRed(e); updateItemType(newTypes, "sets")}}>Sets</div>
                                    </div>
                                </div>
                                <div className="updateDets">
                                    <div>Promo:</div>
                                    <input className="updateDetsInput isPromo" type='checkbox' checked={item.promo ? "checked" : ""} onClick={(e) => {setRed(e); setIsPromo(!isPromo)}} onChange={(e) => setItemList((prevState) => prevState.map((clothes, index) => (index == i ? {...prevState[index], promo: e.target.checked} : {...prevState[index]})))}></input>
                                </div>
                                <div className="updateDets">
                                    <div>Colour:</div>
                                    <input className="updateDetsInput" type="text" required value={item.colour} onChange={(e) => setItemList((prevState) => prevState.map((clothes, index) => (index == i ? {...prevState[index], colour: e.target.value} : {...prevState[index]})))}/>
                                </div>
                                <div className="updateDets">
                                    <div>Description:</div>
                                    <textarea rows={10} type="text" required value={item.desc?.value} onChange={(e) => setItemList((prevState) => prevState.map((clothes, index) => (index == i ? {...prevState[index], desc: {value: e.target.value, text: e.target.value.split(/\n\s*\n/)}} : {...prevState[index]})))}/>
                                </div>
                                <div className="updateDets">
                                    <div>Show as out of stock:</div>
                                    <input className="updateDetsInput" type='checkbox'></input>
                                </div>
                                <div className="updateDets">
                                    <div>Do not show on clothing list:</div>
                                    <input className="updateDetsInput" type='checkbox' ></input>
                                </div>
                                <div className="updateDets updatedSizes">
                                    <div className="colorDet">Sizes:</div>
                                    <div className="sizeType">
                                        <div>•XS</div>
                                        <input type="checkbox" checked={item.sizeXs.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXs: {...state.sizeXs, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedXs(!updatedXs); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeXs.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={xsUpdatedPrice} step="0.01" value={item.sizeXs.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXs: {...state.sizeXs, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={xsUpdatedStock} value={item.sizeXs.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXs: {...state.sizeXs, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="sizeType">
                                        <div>•S</div>
                                        <input type="checkbox" checked={item.sizeS.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeS: {...state.sizeS, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedS(!updatedS); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeS.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={sUpdatedPrice} step="0.01" value={item.sizeS.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeS: {...state.sizeS, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={sUpdatedStock} value={item.sizeS.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeS: {...state.sizeS, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="sizeType">
                                        <div>•M</div>
                                        <input type="checkbox" checked={item.sizeM.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeM: {...state.sizeM, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedM(!updatedM); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeM.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={mUpdatedPrice} step="0.01" value={item.sizeM.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeM: {...state.sizeM, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={mUpdatedStock} value={item.sizeM.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeM: {...state.sizeM, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="sizeType">
                                        <div>•L</div>
                                        <input type="checkbox" checked={item.sizeL.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeL: {...state.sizeL, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedL(!updatedL); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeL.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={lUpdatedPrice} step="0.01" value={item.sizeL.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeL: {...state.sizeL, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={lUpdatedStock} value={item.sizeL.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeL: {...state.sizeL, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="sizeType">
                                        <div>•XL</div>
                                        <input type="checkbox" checked={item.sizeXl.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXl: {...state.sizeXl, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedXl(!updatedXl); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeXl.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={xlUpdatedPrice} step="0.01" value={item.sizeXl.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXl: {...state.sizeXl, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={xlUpdatedStock} value={item.sizeXl.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeXl: {...state.sizeXl, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="sizeType">
                                        <div>•OS (One Size)</div>
                                        <input type="checkbox" checked={item.sizeOs.picked ? "checked" : ""} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeOs: {...state.sizeOs, picked: e.target.checked}} : {...state})))} onClick={(e) => {setUpdatedOs(!updatedOs); sizeUpdatedPicked(e)}} name="" id="" />
                                        {item.sizeOs.picked && <div className="updatedColourDets">
                                            <div className="sizeDet">
                                                <div>Price Add On:</div>
                                                <input type="number" ref={osUpdatedPrice} step="0.01" value={item.sizeOs.sizePrice} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeOs: {...state.sizeOs, sizePrice: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                            <div className="sizeDet">
                                                <div>Stock Count:</div>
                                                <input type="number" ref={osUpdatedStock} value={item.sizeOs.sizeStock} onChange={(e) => setItemList(prevState => (prevState.map((state, x) => x == i ? {...state, sizeOs: {...state.sizeOs, sizeStock: e.target.value * 1}} : {...state})))}/>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                                <div className="resetDets" onClick={() => setReset(!reset)} style={{backgroundColor: "darkgreen"}}>Reset To Original</div>
                                <div className="resetDets">{!isDelete ? <div className='delBtn' onClick={(e) => {e.preventDefault(); setIsDelete(!isDelete)}}>Delete</div> : <div className='delBtn' onClick={(e) => {e.preventDefault(); setIsDelete(!isDelete)}}>Close Delete</div>}{isDelete && <div className='deleteConfirm' onClick={() => {deleteClothesItem(item.id)}}>Confirm Delete</div>}</div>
                                <div className="updateDets">
                                    <button className="addNewColour" onClick={(e) => {handleEditSubmit(e, i, id)}} style={{backgroundColor: "green"}}>Update Item</button>
                                </div>
                                
                            </form> : ""}
                        </div>
                    )
                })}
            </div>
        </div>
      )
  }
}

export default AllCothes