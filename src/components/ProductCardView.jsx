
export const ProductCardView = ({ handler, id, name, description, price }) => {

    const onAddProduct = (product) => {
        console.log(product);
        // se pasa el producto al componente padre hasta llegar a CartApp.jsx
        // donde ejecuta la función handlerAddProductCart y se agrega el producto
        handler(product);
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">$ {price}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => onAddProduct({ id, name, description, price })}>Agregar</button>
                </div>
            </div>
        </>
    );
};
