import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "./itemsActions";

// todo lo que es estado de la aplicación se maneja en el reducer
export const itemsReducer = (state = [], action) => {
    switch (action.type) {
        case AddProductCart:
            return [
                ...state,
                {
                    // payload es el producto que se agrega al carrito
                    product: action.payload,
                    quantity: 1,
                    // el total no es necesario, ya que se maneja en el componente CartView.jsx
                }
            ];
        case UpdateQuantityProductCart:
            return state.map(i => {
                if (i.product.id === action.payload.id) {
                    // si se encuentra el producto, se actualiza la cantidad
                    // se retorna un nuevo objeto y no se modifica el original
                    return {
                        ...i,
                        quantity: i.quantity + 1,
                    };
                    // i.quantity = i.quantity + 1
                }

                return i;
            });
        case DeleteProductCart:
            // devuelve una nueva instancia del array, sin el producto que se quiere eliminar
            return state.filter(i => i.product.id !== action.payload);
        default:
            return state;
    }
};