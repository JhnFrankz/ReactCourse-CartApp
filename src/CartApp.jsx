import { useState } from "react";
import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";

// si no existe el item 'cart' en el sessionStorage, se asigna un array vacio
const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const CartApp = () => {

    const [cartItems, setCartItems] = useState(initialCartItems);

    // funcion para agregar un producto al carrito
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

    // funcion para eliminar un producto del carrito
    const handlerDeleteProductCart = (id) => {
        setCartItems([
            ...cartItems.filter(i => i.product.id !== id),
        ])
    };


    return (
        <>
            <div className="container my-4">

                <h3>Cart App</h3>
                <CatalogView handler={handlerAddProductCart} />

                { //si la condición es falsa, se muestra el componente CartView
                    // ? verifica si una variable es diferente de null o undefined
                    cartItems?.length <= 0 || (
                        <div className="my-4 w-50">
                            <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                        </div>
                    )
                }
            </div>
        </>
    );
};