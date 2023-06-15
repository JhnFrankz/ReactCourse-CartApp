import { useEffect, useReducer } from "react";
import { itemsReducer } from "../reducer/itemsReducer";
import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "../reducer/itemsActions";

// si no existe el item 'cart' en el sessionStorage, se asigna un array vacio
const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

// hook para manejar el estado del carrito
export const useItemsCart = () => {

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

    return {
        cartItems,
        handlerAddProductCart,
        handlerDeleteProductCart,
    };
};