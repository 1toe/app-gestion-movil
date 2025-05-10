
import React, { useEffect, useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCol,
  IonIcon,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonLoading
} from '@ionic/react';
import { productsApi, categoriesApi, providersApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { cube, pricetag, people, logOut } from 'ionicons/icons';

const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [providerCount, setProviderCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Cargar datos desde las APIs
      const products = await productsApi.getAll();
      const categories = await categoriesApi.getAll();
      const providers = await providersApi.getAll();

      // Actualizar los contadores
      setProductCount(Array.isArray(products) ? products.length : 0);
      setCategoryCount(Array.isArray(categories) ? categories.length : 0);
      setProviderCount(Array.isArray(providers) ? providers.length : 0);
    } catch (error) {
      console.error('Error al cargar datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadData();
    event.detail.complete();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <IonPage>      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButton fill="clear" slot="end" onClick={handleLogout}>
            <IonIcon slot="icon-only" icon={logOut} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        
        {loading ? (
          <IonLoading isOpen={loading} message="Cargando datos..." />
        ) : (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Bienvenido</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Usuario:</strong> {currentUser?.email}</p>
                <p>Sistema de gestión de inventario</p>
              </IonCardContent>
            </IonCard>

            <IonRow>
              <IonCol size="12" sizeMd="4">
                <IonCard routerLink="/tabs/products" className="ion-activatable ripple-parent">
                  <IonCardHeader>
                    <IonIcon icon={cube} size="large" color="primary" className="mb-2" />
                    <IonCardTitle>Productos</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="text-3xl font-bold text-center">{productCount}</div>
                    <p className="text-center mt-2">Productos registrados</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              
              <IonCol size="12" sizeMd="4">
                <IonCard routerLink="/tabs/categories" className="ion-activatable ripple-parent">
                  <IonCardHeader>
                    <IonIcon icon={pricetag} size="large" color="success" className="mb-2" />
                    <IonCardTitle>Categorías</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="text-3xl font-bold text-center">{categoryCount}</div>
                    <p className="text-center mt-2">Categorías disponibles</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              
              <IonCol size="12" sizeMd="4">
                <IonCard routerLink="/tabs/providers" className="ion-activatable ripple-parent">
                  <IonCardHeader>
                    <IonIcon icon={people} size="large" color="tertiary" className="mb-2" />
                    <IonCardTitle>Proveedores</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="text-3xl font-bold text-center">{providerCount}</div>
                    <p className="text-center mt-2">Proveedores activos</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
