import { useToast } from "@chakra-ui/react";
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);
    // const toast = useToast();

    const HandleQty = (el, q) => {
        const index = cartItem.indexOf(el);
        const arr = cartItem;
        arr[index].qty += q;

        if (arr[index].qty == 0) {
            arr[index].qty = 1;
        }
        setCartItem([...arr]);
    };

    return (
        <CartContext.Provider value={{ cartItem, setCartItem, HandleQty }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
