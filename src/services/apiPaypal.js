
export const apiCreateOrderPaypal = async (productos) => {
    const accessToken = localStorage.getItem("access_token"); 

    // Ajustar estructura para que coincida con la del backend
    const items = productos.map(prod => ({
        product: prod.name,   // Cambiar "name" por "product"
        quantity: prod.quantity
    }));

    const response = await fetch("http://127.0.0.1:8000/orders/create_order/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`  // Asegurar que el token es el correcto
        },
        body: JSON.stringify({ items }),  // Enviar "items" en lugar de "productos"
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
};;

export const apiOnApprovePaypal = async (orderID) => {
    const accessToken = localStorage.getItem("access_token"); 
    const response = await fetch(`http://127.0.0.1:8000/orders/capture_payment/${orderID}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ "orderID": orderID }),
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
};
