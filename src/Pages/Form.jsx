import { useState } from "react";

export default function Form() {
  const [productos, setProductos] = useState([
    { name: "", unit_amount: { currency_code: "USD", value: "" }, quantity: 1 }
  ]);

  const agregarProducto = () => {
    setProductos([...productos, { name: "", unit_amount: { currency_code: "USD", value: "" }, quantity: 1 }]);
  };

  const manejarCambio = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    if (campo === "name" || campo === "quantity") {
      nuevosProductos[index][campo] = valor;
    } else {
      nuevosProductos[index].unit_amount.value = valor;
    }
    setProductos(nuevosProductos);
  };

  const enviarOrden = async () => {
    const total_price = productos.reduce((total, item) => total + parseFloat(item.unit_amount.value || 0), 0);

    const response = await fetch("http://tuapi.com/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productos, total_price })
    });

    const data = await response.json();
    console.log("Respuesta de la API:", data);
  };

  return (
    <div>
      <h2>Formulario de Compra</h2>
      {productos.map((producto, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={producto.name}
            onChange={(e) => manejarCambio(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={producto.unit_amount.value}
            onChange={(e) => manejarCambio(index, "unit_amount", e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={producto.quantity}
            onChange={(e) => manejarCambio(index, "quantity", parseInt(e.target.value))}
          />
        </div>
      ))}
      <button onClick={agregarProducto}>Agregar Producto</button>
      <button onClick={enviarOrden}>Pagar</button>
    </div>
  );
}
