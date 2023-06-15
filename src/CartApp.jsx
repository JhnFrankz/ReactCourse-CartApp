import { Navigate, Route, Routes } from "react-router-dom";
import { CartView } from "./components/CartView";
import { CatalogView } from "./components/CatalogView";
import { useItemsCart } from "./hooks/useItemsCart";
import { Navbar } from "./components/Navbar";

export const CartApp = () => {

    const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();

    return (
        <>
            <Navbar />

            <div className="container my-4">

                <h3>Cart App</h3>
                <Routes>
                    <Route
                        path="catalog"
                        element={<CatalogView handler={handlerAddProductCart} />}
                    />
                    <Route
                        path="cart"
                        element={(
                            // los parentesis del elemento son para indicar que se va a ejecutar una expresión de JS y no un componente
                            //si la condición es falsa, se muestra el componente CartView
                            // ? verifica si una variable es diferente de null o undefined
                            cartItems?.length <= 0 ?
                                <div className="alert alert-warning">No hay productos en el carrito de compras</div>
                                :
                                (
                                    <div className="my-4 w-50">
                                        <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                                    </div>
                                )
                        )}
                    />
                    <Route path="/" element={<Navigate to={'/catalog'} />} />
                </Routes>

            </div>
        </>
    );
};