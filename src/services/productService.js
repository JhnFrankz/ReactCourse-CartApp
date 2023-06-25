
export const getProducts = async () => {

    // await espera a que se resuelva la promesa y luego devuelve el response y no la promesa
    // las promesas tienen un tiempo de vida, si no se resuelven en ese tiempo, se rechazan
    const response = await fetch('http://localhost:8080/products');
    const products = await response.json();
    return products;
};

export const calculateTotal = (items) => {
    return items.reduce(
        (accumulator, item) => accumulator + (item.quantity * item.product.price), 0)
};