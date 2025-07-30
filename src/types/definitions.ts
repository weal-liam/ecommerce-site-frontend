export interface Product {
    id : number,
    name : string,
    description : string,
    price : number,
    image : any,
    display_image : string;
	get_image : any;
    is_available : boolean,
    category : number,
    created_at : Date,
}

export interface Order {
    id : number,
    customer_name : string,
    customer_email : string,
    customer_phone : number,
    items : OrderItem[],
    shipping_address : number,
    created_at : Date,
    total_price : number,
}

export interface OrderItem {
    order : Order,
    product : Product,
    quantity : number,
    price_at_order : number,
}

export interface Cart {
    id : number;
    user : any,
    session_key : string,
    items : CartItem[],
    created_at : Date,
}

export interface CartItem {
    id : number,
    product_id : number,
    product : Product,
    quantity : number,
}

export interface CartContextType {
    cart : CartItem [];
	orderId : number;
	revealOrderId : (id : number)=> void;
    addToCart : (product : Product) => void;
    removeFromCart : (id : number) => void;
    clearCart: () => void;
}

export interface UserContextType {
    user : any;
    notifications : any [];
    login : (user : any) => void;
	logout : () => void;
    addNotifications : (notification : string) => void;
    removeNotification : (notification : string) => void;
    clearNotifications : () => void;
}

export interface Category {
    id : number,
    name : string,
}

export interface User {
    fullname : string,
    username : string,
    email : string,
    password : string,
}