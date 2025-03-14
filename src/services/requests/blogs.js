import {fetchData} from "@/services/api"

// Funciones específicas (Opcional)
export const getAllBlogs = async (token)=>{
    return fetchData("GET","/blogs/",null,token)
}

// Obtener un blog por ID
export const getDetailBlog = async (id, token) => {
    if (!id) {
        throw new Error("El ID del blog es requerido");
    }
    return fetchData("GET", `/blogs/${id}/`, null, token);
};