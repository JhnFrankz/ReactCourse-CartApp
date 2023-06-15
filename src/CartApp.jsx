import { useEffect, useReducer } from "react";
import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";
import { itemsReducer } from "./reducer/itemsReducer";
import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "./reducer/itemsActions";

// si no existe el item 'cart' en el sessionStorage, se asigna un array vacio
const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const CartApp = () => {

    const [cartItems, dispatch] = useReducer(itemsReducer, initialCartItems);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]); // se ejecuta cuando cambia el estado de items

    // funcion para agregar un producto al carrito
    const handlerAddProductCart = (product) => {

        const hasItem = cartItems.find(i => i.product.id === product.id);

        if (hasItem) {

            dispatch(
                {
                    type: UpdateQuantityProductCart,
                    payload: product,
                }
            );
        } else {
            dispatch(
                {
                    type: AddProductCart,
                    payload: product,
                }
            );
        }
    };

    // funcion para eliminar un producto del carrito
    const handlerDeleteProductCart = (id) => {
        dispatch(
            {
                type: DeleteProductCart,
                payload: id,
            }
        );
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