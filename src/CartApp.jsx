import { useState } from "react";
import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";

const initialCartItems = [
    // {
    //     product: {},
    //     quantity: 0,
    // }
];

export const CartApp = () => {

    const [cartItems, setCartItems] = useState(initialCartItems);

    const handlerAddProductCart = (product) => {

        const hasItem = cartItems.find(i => i.product.id === product.id);
        
        if (hasItem) {
            setCartItems(
                cartItems.map(i => {
                    if (i.product.id === product.id) {
                        i.quantity = i.quantity + 1;
                    }

                    return i;
                })
            );
            // setCartItems([
            //     ...cartItems.filter(i => i.product.id !== product.id),
            //     {
            //         product,
            //         quantity: hasItem.quantity + 1,
            //     }
            // ]);
        } else {
            setCartItems([
                ...cartItems,
                {
                    product,
                    quantity: 1,
                    // el total no es necesario, ya que se maneja en el componente CartView.jsx
                }
            ]);
        }
    };

    return (
        <>
            <div className="container">

                <h3>Cart App</h3>
                <CatalogView handler={handlerAddProductCart} />

                <div className="my-4 w-50">
                    <CartView items={cartItems} />
                </div>
            </div>
        </>
    );
};