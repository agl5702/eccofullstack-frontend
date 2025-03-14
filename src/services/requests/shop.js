import {fetchData} from "@/services/api"

// Funciones específicas (Opcional)
export const getAllShopItems = async (token)=>{
    return fetchData("GET","/cart/",null,token)
}

// Funciones específicas (Opcional)
export const addShopItems = async (shopData,token) => {
  return fetchData("POST", "/cart/add_item/",shopData,token);
};

export const updateShopItems = async (token, id) => {
  return fetchData(`PUT`, `cart/item/${id}/update_quantity/`, null, token);
};


export const deleteShopItems = async (token, id) => {
  return fetchData(`DELETE`, `cart/item/${id}/remove_item/`, null, token);
};

export const clearShopCart = async (token) => {
  return fetchData("DELETE", "/cart/clear/", null, token);
};
