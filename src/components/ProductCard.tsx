'use client';

import { useEffect, useState } from "react";
import  Axios  from '@/utils/api/axios'
import { useParams, usePathname } from "next/navigation";
import { Product } from "@/types/definitions";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function ProductCard() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product>(Object);
    const {addToCart} = useCart();
    const pathname = usePathname();

    useEffect(() => {
        Axios.get<Product>(`products/${id}/`)
        .then((response)=>{
            setProduct(response.data)
        })
        .catch((error)=>{
            console.error("Error fetching product:", error);
        })
    },[id])

    return (
        <>  
		<div className="flex flex-col items-center">
            <h1 style={{textTransform:'capitalize'}} className="text-xl">{product.name}</h1>
            {product.display_image && (
              <div className="relative w-full max-w-xs h-[400px]">
                <Image
                  src={product.display_image}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-contain rounded"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/maverick_cart.png"; }}
                />
              </div>
            )}
            <strong>${product.price}</strong>
            <p>{product.description}</p>
            {pathname.startsWith('/mart') &&
            <button onClick={()=>{addToCart(product)}} className="bg-stone-600 text-white px-4 py-2 rounded m-4">
                Add to Cart
            </button>
            }
		</div>
        </>
    );
}