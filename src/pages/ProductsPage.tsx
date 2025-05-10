import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLoading,
  IonAlert,
  IonImg,
  IonToast,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonBadge
} from '@ionic/react';
import { add, refreshOutline } from 'ionicons/icons';
import { Product } from '@/types';
import { productsApi } from '@/services/api';
import ProductModalForm from '@/components/ProductModalForm';
import ProductList from '@/components/ProductList';
import ProductViewModal from '@/components/ProductViewModal';
import { handleApiError } from '@/lib/error-handler';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  // Cargar productos cuando el componente se monta
  useEffect(() => {
    loadProducts();
  }, []);
  
  // Función para cargar productos desde la API
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await productsApi.getAll();
      console.log('Products loaded:', data);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('No se pudieron cargar los productos. Por favor, intenta nuevamente.');
      setShowToast(true);
      setToastMessage('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };
  
  // Manejar el refresh de la página
  const handleRefresh = (event: CustomEvent) => {
    loadProducts().then(() => {
      event.detail.complete();
    });
  };
  
  // Abrir modal para añadir nuevo producto
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEdit(false);
    setShowModal(true);
  };
  
  // Abrir modal para editar producto
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEdit(true);
    setShowModal(true);
  };
  
  // Manejar la visualización detallada del producto
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };
  
  // Confirmar eliminación de producto
  const handleDeleteConfirm = (product: Product) => {
    setSelectedProduct(product);
    setShowAlert(true);
  };
  
  // Eliminar producto
  const deleteProduct = async () => {
    if (!selectedProduct) return;
    
    setLoading(true);
    try {
      await productsApi.delete(selectedProduct.product_id);
      setProducts(products.filter(p => p.product_id !== selectedProduct.product_id));
      setToastMessage('Producto eliminado correctamente');
      setShowToast(true);
    } catch (err) {
      console.error('Error deleting product:', err);
      setToastMessage('Error al eliminar el producto');
      setShowToast(true);
    } finally {
      setLoading(false);
      setShowAlert(false);
    }
  };
  
  // Guardar producto (nuevo o editado)
  const handleSaveProduct = (product: Product) => {
    if (isEdit) {
      // Actualizar producto existente en la lista
      setProducts(products.map(p => p.product_id === product.product_id ? product : p));
    } else {
      // Añadir nuevo producto a la lista
      setProducts([...products, product]);
    }
    
    setToastMessage(isEdit ? 'Producto actualizado correctamente' : 'Producto añadido correctamente');
    setShowToast(true);
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
          <IonButton slot="end" onClick={loadProducts}>
            <IonIcon icon={refreshOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        {/* Mostrar los productos si existen */}
        {!loading && products.length > 0 && (
          <IonList>
            {products.map((product) => (
              <IonItem key={product.product_id} detail onClick={() => handleViewProduct(product)}>
                <IonThumbnail slot="start">
                  <IonImg src={product.product_image || 'https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg'} alt={product.product_name} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{product.product_name}</h2>
                  <p>Precio: ${product.product_price.toFixed(2)}</p>
                  <p>
                    Estado: 
                    <IonBadge color={product.product_state === 'Activo' ? 'success' : 'medium'} style={{ marginLeft: '8px' }}>
                      {product.product_state || 'Activo'}
                    </IonBadge>
                  </p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
        
        {/* Mensaje cuando no hay productos */}
        {!loading && products.length === 0 && (
          <div className="ion-text-center ion-padding">
            <h3>No hay productos disponibles</h3>
            <p>Haz clic en el botón + para añadir un nuevo producto</p>
          </div>
        )}
        
        {/* Botón para añadir nuevo producto */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleAddProduct}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        
        {/* Loading indicator */}
        <IonLoading isOpen={loading} message="Cargando..." />
        
        {/* Modal para añadir/editar producto */}
        <ProductModalForm 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
          isEdit={isEdit}
        />
        
        {/* Modal para ver detalles del producto */}
        <ProductViewModal
          isOpen={showViewModal}
          product={selectedProduct}
          onClose={() => setShowViewModal(false)}
        />
        
        {/* Alerta de confirmación para eliminar */}
        <IonAlert
          isOpen={showAlert}
          header="Confirmar eliminación"
          message="¿Estás seguro de que deseas eliminar este producto?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowAlert(false)
            },
            {
              text: 'Eliminar',
              handler: deleteProduct
            }
          ]}
        />
        
        {/* Toast para mensajes de feedback */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
