'use client';

import { useCart } from "@/context/CartContext";
import Axios from "@/utils/api/axios";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { getUser } from "@/context/UserContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Page() {
    const {cart, revealOrderId, clearCart} = useCart();
    const { addNotifications } = getUser();

    const [form , setForm] = useState({
        customer_name : '',
        customer_email : '',
        customer_phone : '',
        shipping_address : ''
    });

    const total = cart.reduce((sum,item)=> sum + Number(item.product.price)*item.quantity,0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit = async() => {
        try{
            const res = await Axios.post('/orders/checkout',{...form,total:total});
            clearCart();
            const { order, id } = res.data;
			revealOrderId(order.id);
            const stripe = await stripePromise
            stripe?.redirectToCheckout({sessionId : id})
        }catch(err){
            console.error('Checkout error: ',err);
            addNotifications('Failed to submit order');
        }
    };
    return (
        <div>
            <div className="flex items-center gap-2 mb-6">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
                <h1 className="text-2xl font-bold">Checkout</h1>
            </div>
            <label htmlFor="customer_name" className="block mb-1 font-medium">Full Name</label>
            <input
                id="customer_name"
                name="customer_name"
                onChange={handleChange}
                placeholder="Your Full Name"
                className="mb-2 w-full p-2 border"
            />
            <label htmlFor="customer_email" className="block mb-1 font-medium">Email</label>
            <input
                id="customer_email"
                name="customer_email"
                onChange={handleChange}
                placeholder="Your Email"
                className="mb-2 w-full p-2 border"
            />
            <label htmlFor="customer_phone" className="block mb-1 font-medium">Phone Number</label>
            <input
                id="customer_phone"
                name="customer_phone"
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="mb-4 w-full p-2 border"
            />
            <label htmlFor="shipping_address" className="block mb-1 font-medium">Shipping Address</label>
            <input
                id="shipping_address"
                name="shipping_address"
                onChange={handleChange}
                placeholder="Shipping Address"
                className="mb-4 w-full p-2 border"
            />
            <div className="mb-4">
                <h2 className="font-semibold mb-2">Order Summary</h2>
                {cart.map(item =>(
                    <div key={item.id}>
                        {item.product.name} x {item.quantity} = ${Number(item.product.price)*item.quantity}
                    </div>
                ))}
                <p className="mt-2 font-bold">Total: ${total}</p>
            </div>
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                Place Order
            </button>
        </div>
    );
}