import { CardBlog } from "@/components/layout/Card";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/services/requests/blogs";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("access_token"); // Obtiene el token
      if (!token) {
        console.error("No hay token, no se pueden obtener los blogs");
        setLoading(false);
        return;
      }

      try {
        const data = await getAllBlogs(token);
        setBlogs(data);
      } catch (error) {
        console.error("Error al obtener los blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box p="30px" textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Cargando blogs...</Text>
      </Box>
    );
  }

  return (
    <Box p="30px" display="flex" flexWrap="wrap" justifyContent="center">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <CardBlog
            key={blog.id}
            title={blog.title}
            content={blog.content}
            image={blog.image && typeof blog.image === "string" && blog.image.startsWith("http")
              ? blog.image
              : blog.image
              ? `http://localhost:8000${blog.image}`
              : null} // No muestra nada si es null
          />
        ))
      ) : (
        <Text>No hay blogs disponibles.</Text>
      )}
    </Box>
  );
}

export default Blog;
