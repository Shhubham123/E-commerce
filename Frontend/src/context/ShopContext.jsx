import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
export const shopDataContext = createContext()
import axios from 'axios'
import { userDataContext } from './UserContext'
function ShopContext({children}) {
    let [product,setProduct] = useState(null)
    let [search,setSearch] =useState('')
    let [showSearch,setShowSearch] = useState(false)
    let {serverUrl} = useContext(authDataContext) 
    let {userData} = useContext(userDataContext) 
    let currency = '₹'
    let delivery_fee=40
    let [cartItem,setCartItem] = useState([])

    const getProducts = async()=>{
        try {
            let result = await axios.get(serverUrl+"/api/product/list",{withCredentials:true})
            console.log(result.data);
            setProduct(result.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const addToCart = async(itemId,size)=>{
            let cartData= structuredClone(cartItem)
            if(cartData[itemId]){
                if(cartData[itemId][size]){
                    cartData[itemId][size]+=1
                }
                else{
                    cartData[itemId][size]=1
                }
            }
            else{
                cartData[itemId]={}
                cartData[itemId][size]=1

            }
            setCartItem(cartData)
            console.log(cartData);

            if(userData){
                try {
                   let result = await axios.post(serverUrl+"/api/cart/add",{itemId,size},{withCredentials:true})
                    
                } catch (error) {
                    console.log(error);
                    
                }
            }
            
    }
     const getUserCart = async()=>{
        try {
            const result = await axios.post(serverUrl+"/api/cart/get",{},{withCredentials:true})
            setCartItem(result.data)
        } 
        catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const updateQuantity = async(itemId,size,quantity)=>{
            let cartData= structuredClone(cartItem)
            cartData[itemId][size]=quantity
            setCartItem(cartData)

            if(userData){
                try {
                    await axios.post(serverUrl +"/api/cart/update",{itemId,size,quantity},{withCredentials:true})
                } catch (error) {
                    console.log(error);
                    // toast.error(error.message)
                }
            }       
    }
    const getCardCount= ()=>{
        let totalCount= 0
        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item]>0){
                        totalCount+=cartItem[items][item]
                    }
                } catch (error) {
                    console.log(error);
                    
                }
                
            }
        
        }
        return totalCount
    }
    
    // const getCartAmount = ()=>{
    //         let totalAmount =0
    //         for(const items in cartItem){
    //             let iteminfo = product.find((product)=>product._id===items)
    //             for(const item in cartItem[items] > 0 ){
    //                 try {
    //                     if(cartItem[items][item]>0){
    //                         totalAmount += iteminfo.price* cartItem[items][item]
    //                     }
    //                 } catch (error) {
    //                     console.log(error);
                        
    //                 }

                
    //         }
    //         console.log(totalAmount);
    //     }
    //     return totalAmount 
    // }
    const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
        let itemInfo = product?.find((p) => p._id === itemId);
        if (!itemInfo) continue; // if product data not loaded yet

        for (const size in cartItem[itemId]) {
            try {
                let quantity = cartItem[itemId][size];
                if (quantity > 0) {
                    totalAmount += itemInfo.price * quantity;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return totalAmount;
};

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
        getUserCart()
    },[])



    let value={
        product,currency,delivery_fee,getProducts,
        search,setSearch,setShowSearch,showSearch,
        cartItem,addToCart,getCardCount,setCartItem,updateQuantity,getCartAmount
    }
  return (
    <div>
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext
