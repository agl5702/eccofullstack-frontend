import { CardShop } from "@/components/layout/Card";
import { Box, Spinner, Text, Card, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllProducts, getAllCategories } from "@/services/requests/products";
import { addShopItems } from "@/services/requests/shop";

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Recuperar datos de búsqueda y categoría del localStorage
    const storedCategory = localStorage.getItem("selectedCategory");
    const storedSearchQuery = localStorage.getItem("searchQuery");

    if (storedCategory) setSelectedCategory(storedCategory);
    if (storedSearchQuery) setSearchQuery(storedSearchQuery);

    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener datos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);

    // 🔹 Limpiar la búsqueda cuando se selecciona una categoría
    setSearchQuery("");
    localStorage.removeItem("searchQuery");
  };

  const handleClearCategory = () => {
    setSelectedCategory(null);
    localStorage.removeItem("selectedCategory");
  };

  const handleAddToCart = async (item) => {
    if (!item || !item.id) {
      console.error("Error: El producto no tiene un id válido", item);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No hay token, no se puede agregar al carrito");
      return;
    }

    const payload = { product_id: item.id, quantity: 1 };
    console.log("Payload enviado:", payload);

    try {
      const response = await addShopItems(payload, token);
      console.log("Producto agregado:", response);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  if (loading) {
    return (
      <Box p="30px" textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Cargando productos...</Text>
      </Box>
    );
  }

  // 🔎 **Filtrar productos**
  const filteredProducts = products.filter((product) => {
    // ✅ Filtrar por categoría seleccionada
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // ✅ Filtrar por búsqueda (nombre, precio o categoría)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.price.toString().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <Box p="30px" display="flex" justifyContent="center">
      {/* Categorías */}
      <Box>
        <Card.Root width="320px" bg="white" color="gray.700" border="1px solid" borderColor="gray.200">
          <Card.Body gap="2" textAlign="center">
            <Card.Title mt="2" fontWeight="bold" fontSize="24px">Categorías</Card.Title>
          </Card.Body>
          <Card.Footer display="flex" flexDirection="column" gap="2">
            {categories.map((category) => (
              <Button
                key={category.id}
                borderColor="gray.200"
                w="100%"
                _hover={{ bg: "green.600", color: "white" }}
                onClick={() => handleCategoryClick(category.name)}
                bg={selectedCategory === category.name ? "green.600" : "white"}
                color={selectedCategory === category.name ? "white" : "black"}
              >
                {category.name}
              </Button>
            ))}
            <Button
              borderColor="gray.200"
              w="100%"
              _hover={{ bg: "green.600", color: "white" }}
              onClick={handleClearCategory}
            >
              Ver Todos
            </Button>
          </Card.Footer>
        </Card.Root>
      </Box>

      {/* Productos */}
      <Box w="100%" display="flex" flexWrap="wrap" p="30px" gap="4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CardShop
              key={product.id}
              id={product.id}
              title={product.name}
              labels={product.label || []}
              calification={product.assessment}
              price={product.price}
              image={
                product.image.startsWith("http")
                  ? product.image
                  : `http://localhost:8000${product.image}`
              }
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <Text>No hay productos disponibles con este filtro.</Text>
        )}
      </Box>
    </Box>
  );
}

export default Shop;
