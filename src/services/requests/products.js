import {fetchData} from "@/services/api"

// Funciones específicas (Opcional)
export const getAllCategories = async () => {
  return fetchData("GET", "/categorias/");
};

export const getAllProducts = async ()=>{
  return fetchData("GET","/productos/")
}