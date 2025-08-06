'use client';

import { Category } from "@/types/definitions";
import Axios from "@/utils/api/axios";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";


export default function Page() {
    const [activeTab, setActiveTab] = useState<"large" | "single">("large");

    const [file, setFile] = useState<File | null>(null);

    const [message, setMessage] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);

    const [form, setForm] = useState({
        name : '',
        price : '',
        image : file,
        image_url: '',
        description : '',
        category : '',
    });

    useEffect(()=>{
        Axios.get('categories/')
        .then((res)=>setCategories(res.data))
        .catch((err)=>console.error('Failed to load categories due to: ',err))
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            setForm({...form,[e.target.name]:e.target.value});
        };

            
        
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const uploadedFile = e.target.files?.[0] || null;
            setFile(uploadedFile);
             };             

    
    const handleSubmit = async() => {
        if (activeTab === "large") {
            if (!file) {
                setMessage('Please select a JSON file.');
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            try {
                await Axios.post('products/', formData, {
                headers: { "Content-Type": "multipart/form-data" }
                });
                alert('Inventory updated!');
                setFile(null);
            } catch (err) {
                alert('Failed to update inventory due to: ' + err);
            }
        return;
        }
        if (activeTab === "single") {
          try {
                await Axios.post('products/', form);
                alert('Product created!');
                setForm({
                    name: '',
                    price: '',
                    image: null,
                    image_url: '',
                    description: '',
                    category: '',
                });
            } catch (err) {
                alert('Failed to create product due to: ' + err);
            }
}
        };

        return (
        <div>
            <div className="flex gap-[20px] justify-self-start items-center mb-4"><InboxIcon className="w-13 h-13"/><h1 className="font-bold text-2xl">Inventory</h1></div>
                <div className="flex justify-center mb-8 border-b border-gray-200">
                    <button
                    className={`px-6 py-2 font-semibold focus:outline-none ${
                        activeTab === "large"
                        ? "border-b-2 border-stone-600 text-stone-900"
                            : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("large")}
                    type="button"
                    >
                        Large Inventory
                    </button>
                    <button
                    className={`px-6 py-2 font-semibold focus:outline-none ${
                        activeTab === "single"
                        ? "border-b-2 border-stone-600 text-stone-900"
                        : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("single")}
                    type="button"
                    >
                        Single Inventory
                    </button>
            </div>
            {activeTab === 'single'?
            (
            <>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="mb-2 w-full p-2 border" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="mb-2 w-full p-2 border" />
            <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="image url" className="mb-2 w-full p-2 border" />
            <input type="file" accept=".png" onChange={handleFileChange} placeholder="image" className="mb-2 w-half p-2 border" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="mb-2 w-full p-2 border" />
            <select name="category" value={form.category} onChange={handleChange} className="mb-4 w-full p-2 border">
                <option value="">--Select Category--</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <div className="mb-4">
			{`${message}`}
            </div>
            <button onClick={handleSubmit} className="bg-stone-600 text-white px-4 py-2 rounded">
                Create Product
            </button>
            </>) : (
                <div className="flex flex-col items-center">
                <input className="border rounded w-1/4 m-4 p-4" type="file" accept=".json" onChange={handleFileChange} />
				<button onClick={handleSubmit} className="bg-stone-600 w-1/4 m-4 text-white px-4 py-2 rounded">
                Create Products
				</button>
                </div>
            )
            }
        </div>
        );
}