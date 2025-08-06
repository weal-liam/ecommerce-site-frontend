'use client';

import { useEffect, useState } from 'react';
import Axios from '@/utils/api/axios';
import  Link  from 'next/link';
import { usePathname } from "next/navigation";
import { Category, Product } from '@/types/definitions';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Search from './search';
import Image from "next/image";

export default function ProductsSheet() {
  const pathname = usePathname();
  const [product, setProduct] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Axios.get<Product[]>(`products/?search=${(product===undefined)?'':product}&category=${(category==='All')?'':category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [product, category]);

  useEffect(()=>{
        Axios.get('categories/')
        .then((res)=>setCategories(res.data))
        .catch((err)=>console.error('Failed to load categories due to: ',err))
    },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name !== 'category'){ setProduct(e.target.value);} else { setCategory(e.target.value); }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <ShoppingBagIcon className="w-8 m-4" />
          <h1 className="text-2xl font-bold mr-8">Product Catalog</h1>
        </div>
        {pathname.startsWith('/dashboard') && (
          <Link
            href={`${pathname}/createproducts`}
            className="text-xl text-red-500"
          >
            Create Products
          </Link>
        )}
      </div>
      <div className='flex flex-row items-center gap-5 mb-4'>
          <Search placeholder='Product' onChange={handleChange} />
          <select name="category" value={category} onChange={handleChange} className=" w-1/2 p-2 border rounded border border-gray-200 outline-2 text-center">
                <option value="">--Select Category--</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
          </select>
        </div>
	  <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link href={`${window.location.href}/product/${product.id}`} key={product.id} style={{textDecoration:'none', color:'black'}}>
          <div key={product.id} className='product-card h-full sm:w-auto border border-gray-300 rounded-lg p-2.5 shadow-md transition duration-300 ease-in-out hover:-translate-y-2.5 hover:z-10 md:flex flex-col justify-items-center items-center md:w-[220px]'>
            {product.display_image && (
              <Image
                src={product.display_image}
                alt={product.name}
                width={220}
                height={220}
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/maverick_cart.png'; 
                }}
              />
            )}
            <h3>
                {product.name}
            </h3>
            <strong>${product.price}</strong>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}