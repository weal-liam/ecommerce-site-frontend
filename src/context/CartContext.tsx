'use client';

import { Cart, CartContextType, CartItem, Product } from "@/types/definitions";
import Axios from "@/utils/api/axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }:{ children : ReactNode }) => {
    const [cart,setCart] = useState<CartItem[]>([]);
	
	const [orderId, setOrderId] = useState<number>(0);

    useEffect(()=>{
        Axios.get<Cart>('cart/')
        .then((res)=>{
            setCart(res.data.items);
        })
    },[])
	
	const revealOrderId = (id : number) => {
		setOrderId(id);
	}
	
    const addToCart = (product : Product) => {
        Axios.post('cart/',{
            product_id : product.id
        }).then(()=>{
		Axios.get<Cart>('cart/').then((response)=>setCart(response.data.items))});
    }

    const removeFromCart = (id : number) => {
        Axios.delete(`cart/${id}/`)
        setCart((prev)=>prev.filter(item =>item.id !== id))
    }

    const clearCart = () => {
        Axios.delete(`cart/`)
        setCart([]);
    }

    return (<CartContext.Provider value={{cart, orderId, revealOrderId, addToCart, removeFromCart, clearCart}}>
        {children}
    </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error('useCart must be used within CartProvider');
    return context;
}