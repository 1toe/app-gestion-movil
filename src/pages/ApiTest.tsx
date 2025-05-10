import React, { useEffect, useState } from 'react';
import { productsApi, categoriesApi, providersApi } from '../services/api';

const ApiTest: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Intentar obtener productos
        const productsData = await productsApi.getAll();
        setProducts(productsData || []);

        // Intentar obtener categorías
        const categoriesData = await categoriesApi.getAll();
        setCategories(categoriesData || []);

        // Intentar obtener proveedores
        const providersData = await providersApi.getAll();
        setProviders(providersData || []);

        setLoading(false);
      } catch (err: any) {
        setError(`Error al conectar con la API: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para probar agregar un producto
  const testAddProduct = async () => {
    try {
      const newProduct = {
        product_name: "Producto de prueba",
        product_price: 100,
        product_image: "https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg"
      };
      
      const result = await productsApi.add(newProduct);
      alert(`Producto agregado con éxito: ${JSON.stringify(result)}`);
      
      // Actualizar la lista de productos
      const productsData = await productsApi.getAll();
      setProducts(productsData || []);
    } catch (err: any) {
      alert(`Error al agregar producto: ${err.message}`);
    }
  };

  // Función para probar agregar una categoría
  const testAddCategory = async () => {
    try {
      const newCategory = {
        category_name: "Categoría de prueba"
      };
      
      const result = await categoriesApi.add(newCategory);
      alert(`Categoría agregada con éxito: ${JSON.stringify(result)}`);
      
      // Actualizar la lista de categorías
      const categoriesData = await categoriesApi.getAll();
      setCategories(categoriesData || []);
    } catch (err: any) {
      alert(`Error al agregar categoría: ${err.message}`);
    }
  };

  // Función para probar agregar un proveedor
  const testAddProvider = async () => {
    try {
      const newProvider = {
        provider_name: "Proveedor",
        provider_last_name: "De Prueba",
        provider_mail: "proveedor@test.com",
        provider_state: "Activo"
      };
      
      const result = await providersApi.add(newProvider);
      alert(`Proveedor agregado con éxito: ${JSON.stringify(result)}`);
      
      // Actualizar la lista de proveedores
      const providersData = await providersApi.getAll();
      setProviders(providersData || []);
    } catch (err: any) {
      alert(`Error al agregar proveedor: ${err.message}`);
    }
  };

  if (loading) return <div>Cargando datos de la API...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Prueba de Conexión a la API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección de Productos */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Productos ({products.length})</h2>
          <button 
            onClick={testAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Probar Agregar Producto
          </button>
          <div className="overflow-auto max-h-60">
            <ul>
              {products.map((product: any, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{product.product_name}</strong> - ${product.product_price}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Sección de Categorías */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Categorías ({categories.length})</h2>
          <button 
            onClick={testAddCategory}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4">
            Probar Agregar Categoría
          </button>
          <div className="overflow-auto max-h-60">
            <ul>
              {categories.map((category: any, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{category.category_name}</strong> - {category.category_state}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Sección de Proveedores */}
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Proveedores ({providers.length})</h2>
          <button 
            onClick={testAddProvider}
            className="bg-purple-500 text-white px-4 py-2 rounded mb-4">
            Probar Agregar Proveedor
          </button>
          <div className="overflow-auto max-h-60">
            <ul>
              {providers.map((provider: any, index) => (
                <li key={index} className="border-b py-2">
                  <strong>{provider.provider_name} {provider.provider_last_name}</strong> - {provider.provider_mail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
