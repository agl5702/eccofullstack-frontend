import { useState, useEffect, useRef } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  
  const refreshInterval = useRef(null); 

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token); 

      setToken(data.access_token);
      startTokenRefresh(); 

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) throw new Error("No hay refresh token disponible");

      const response = await fetch("http://127.0.0.1:8000/auth/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refresh_token }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Error al refrescar el token");
      }

      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token);
    } catch (err) {
      console.error("No se pudo refrescar el token:", err.message);
      
      // En lugar de cerrar sesión de inmediato, puedes intentar otra estrategia:
      setTimeout(() => {
        logout();
      }, 5000); // Esperar 5 segundos antes de cerrar sesión
    }
  };

  const startTokenRefresh = () => {
    if (refreshInterval.current) clearInterval(refreshInterval.current);

    refreshInterval.current = setInterval(() => {
      refreshToken();
    }, 59 * 60 * 1000); // Cada 59 minutos
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    if (refreshInterval.current) {
      clearInterval(refreshInterval.current);
    }
  };

  useEffect(() => {
    if (token) {
      startTokenRefresh();
    }
    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
      }
    };
  }, [token]);

  return { login, logout, token, loading, error };
};
