import axios from "axios";

const API_URL = "http://127.0.0.1:8000/"; // Cambia esto por la URL de tu API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función genérica para hacer peticiones con o sin token
export const fetchData = async (method, endpoint, data = null, token = null) => {
  try {
    // Definir headers sin modificar los globales
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Agregar token solo si existe
    };

    const response = await api({
      method,
      url: endpoint,
      data: method !== "GET" ? data : null, // Evita enviar `data` en GET
      headers, // Pasa los headers personalizados en cada petición
    });

    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error.response?.data || { message: "Error desconocido", error };
  }
};
