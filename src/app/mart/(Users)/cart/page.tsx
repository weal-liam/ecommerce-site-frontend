'use client';

import { useCart } from "@/context/CartContext";
import { getUser } from "@/context/UserContext";
import Axios from "@/utils/api/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page() {
    const {cart, orderId, revealOrderId, removeFromCart, clearCart} = useCart();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [confirmed, setConfirmed] = useState(false);

    const { addNotifications } = getUser();

    useEffect(() => {
        if (sessionId) {
                Axios.get(`/payments/confirm?session_id=${sessionId}`).then((response) => {
                if (response.data.status === 'paid') {
                    setConfirmed(true);
					revealOrderId(response.data.order_id);
					console.log(response.data);
                }else {
                    addNotifications('Payment failed or not completed.');
                }
                })
        }
    }, [revealOrderId, addNotifications, sessionId]);
	
	useEffect(() => {
        if (sessionId && confirmed && orderId !== 0) {
				        Axios.put(`/orders/${orderId}`,{status : 'paid'})
					    .then(()=>{
						    addNotifications('Payment successful!');
			            });
                    }
	}, [addNotifications, sessionId, confirmed, orderId]);

    const total = cart.reduce((sum,item)=> sum + Number(item.product.price)*item.quantity,0);

    const checkout = () => {
        window.location.href = `/mart/checkout`
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Your Cart
            </h1>
            {cart.length === 0?(
                <p>
                    {confirmed ? "Thank you for your purchase!" : "Your cart is empty."}
                    <a href="/mart" className="text-blue-500"> Browse products</a>
                </p>
            ):(<>
                {
                    cart.map(item =>(
                        <div key={item.id} className="
                        flex justify-between mb-2 bg-white p-4 rounded shadow"
                            >
                                <div>
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p>Quantity:{item.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-right">${Number(item.product.price)*item.quantity}</p>
                                    <button onClick={()=>removeFromCart(item.id)} className="text-sm text-red-500 mt-1">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    <p className="text-right font-bold mt-4">
                        Total:${total}
                    </p>
                    <div className="flex flex-row align-items-center gap-[10px] p-4">
                    <button onClick={()=>clearCart()} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                        Clear Cart
                    </button>
                    <button onClick={()=>checkout()} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
                        Checkout
                    </button>
                    </div>
                </>
            )}
        </div>
    );
}