
export const itemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'AddProductCart':
            return [
                ...state,
                {
                    // payload es el producto que se agrega al carrito
                    product: action.payload,
                    quantity: 1,
                    // el total no es necesario, ya que se maneja en el componente CartView.jsx
                }
            ];
        case 'UpdateQuantityProductCart':
            return state.map(i => {
                if (i.product.id === action.payload.id) {
                    i.quantity = i.quantity + 1;
                }

                return i;
            });
        case 'DeleteProductCart':

            return;
        default:
            return state;
    }
};