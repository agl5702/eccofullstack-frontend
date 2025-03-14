import { useEffect, useState } from "react";
import { Box, Text, Table, Button, Image, NumberInput } from "@chakra-ui/react";
import { RiShoppingBag4Line } from "react-icons/ri";
import { getAllShopItems,clearShopCart } from "@/services/requests/shop";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteShopItems } from "@/services/requests/shop";
import { loadScript } from "@paypal/paypal-js";
import { apiCreateOrderPaypal, apiOnApprovePaypal } from "../services/apiPaypal";

function Cart() {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("access_token");
      const data = await getAllShopItems(token);
      setCart(data.items);
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, value) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, amount: value || 1 } : item
    );
    setCart(newCart);
  };

  const handleDeleteItem = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await deleteShopItems(token, id);
      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Calcular el total sumando los subtotales de cada producto
  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.amount,
    0
  );

  // Función para crear la orden de compra en PayPal
  const enviarOrden = async () => {
    const productosConPrecio = cart.map((item) => ({
      name: item.product.name,
      quantity: item.amount,
      unit_amount: {
        currency_code: "USD",
        value: parseFloat(item.product.price).toFixed(2),
      },
    }));

    try {
      const response = await apiCreateOrderPaypal(productosConPrecio);
      if (response?.id) {
        setOrderId(response.id);
        initializePaypal(response.id);
      } else if (response.links) {
        const approveLink = response.links.find((link) => link.rel === "approve");
        if (approveLink) {
          window.location.href = approveLink.href;
        }
      }
    } catch (error) {
      console.error("❌ Error creando la orden:", error);
    }
  };

  // Función para inicializar PayPal en el carrito
  const initializePaypal = async (orderId) => {
    try {
      const paypal = await loadScript({ clientId: "test" });

      if (!paypal) {
        console.error("❌ PayPal SDK no se cargó correctamente.");
        return;
      }

      const paypalContainer = document.getElementById("btns-paypal");
      if (!paypalContainer) {
        console.error("❌ Contenedor de PayPal no encontrado.");
        return;
      }

      paypalContainer.innerHTML = "";

      await paypal.Buttons({
        createOrder: () => orderId,

        async onApprove(data) {
            try {
              const details = await apiOnApprovePaypal(data.orderID);
              console.log("✅ Pago capturado exitosamente:", details);
          
              // Limpiar el carrito después del pago exitoso
              const token = localStorage.getItem("access_token");
              await clearShopCart(token);
              setCart([]); // Vaciar el estado del carrito
            } catch (error) {
              console.error("❌ Error al capturar el pago:", error);
            }
          },

        onError(err) {
          console.error("❌ Error en PayPal:", err);
        }
      }).render("#btns-paypal");
    } catch (error) {
      console.error("❌ Error al cargar el SDK de PayPal:", error);
    }
  };

  return (
    <Box p="50px 100px">
      <Text fontSize="52px" fontWeight="bold" color="gray.700">
        Your Cart
      </Text>
      <Text color="gray.700">Carefully check the information before checkout</Text>

      <Box>
        <Table.Root>
          <Table.Header h="50px">
            <Table.Row fontSize="18px" bg="gray.200">
              <Table.ColumnHeader border="none" borderRadius="20px 0px 0px 20px" color="black">
                Product
              </Table.ColumnHeader>
              <Table.ColumnHeader border="none" color="black"></Table.ColumnHeader>
              <Table.ColumnHeader border="none" color="black">
                Unit Price
              </Table.ColumnHeader>
              <Table.ColumnHeader border="none" color="black">
                Quantity
              </Table.ColumnHeader>
              <Table.ColumnHeader border="none" color="black">
                Subtotal
              </Table.ColumnHeader>
              <Table.ColumnHeader border="none" borderRadius="0px 20px 20px 0px" color="black">
                Remove
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cart.map((item) => (
              <Table.Row key={item.id} bg="white">
                <Table.Cell border="none" color="black">
                  <Image w="100px" src={item.product.image} alt={item.product.name} />
                </Table.Cell>
                <Table.Cell border="none" color="black">{item.product.name}</Table.Cell>
                <Table.Cell fontSize="22px" fontWeight="bold" border="none" color="green.600">
                  ${item.product.price}
                </Table.Cell>
                <Table.Cell border="none" color="black">
                  <NumberInput.Root w="100px" value={item.amount} min={1}>
                    <NumberInput.Control>
                      <NumberInput.IncrementTrigger
                        onClick={() => handleQuantityChange(item.id, item.amount + 1)}
                      />
                      <NumberInput.DecrementTrigger
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.amount - 1))}
                      />
                    </NumberInput.Control>
                    <NumberInput.Scrubber />
                    <NumberInput.Input
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    />
                  </NumberInput.Root>
                </Table.Cell>
                <Table.Cell fontSize="22px" fontWeight="bold" border="none" color="gray.400">
                  ${(parseFloat(item.product.price) * item.amount).toFixed(2)}
                </Table.Cell>
                <Table.Cell border="none" color="black">
                  <Button _hover={{ color: "red" }} onClick={() => handleDeleteItem(item.id)}>
                    <Box fontSize="54px">
                      <RiDeleteBinLine />
                    </Box>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* Total de la compra */}
      <Box display="flex" justifyContent="end" mt="20px">
        <Text fontSize="24px" fontWeight="bold" color="gray.700">
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </Box>

      {/* Botón para pagar con PayPal */}
      <Box display="flex" justifyContent="end" mt="20px">
        <Box display="flex" flexDirection="column">

        <Button color="white" bg="green.600" _hover={{ bg: "orange" }} onClick={enviarOrden}>
        <RiShoppingBag4Line />

          Pagar con PayPal
        </Button>

          {/* Contenedor para los botones de PayPal */}
          <Box id="btns-paypal" mt="20px"></Box>
        </Box>
        
        
      </Box>

   
    </Box>
  );
}

export default Cart;
