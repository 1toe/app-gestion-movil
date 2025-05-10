import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  useIonToast
} from '@ionic/react';
import { add, refreshCircle } from 'ionicons/icons';
import { ProvidersService, Provider } from '../../services/providers.service';

const providersService = new ProvidersService();

const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [presentToast] = useIonToast();

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await providersService.getAll();
      setProviders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading providers:", error);
      setLoading(false);
      presentToast({
        message: 'Error al cargar proveedores. Por favor intente nuevamente.',
        duration: 3000,
        position: 'bottom'
      });
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    try {
      const data = await providersService.getAll();
      setProviders(data);
    } catch (error) {
      console.error("Error refreshing providers:", error);
      presentToast({
        message: 'Error al actualizar proveedores.',
        duration: 3000,
        position: 'bottom'
      });
    } finally {
      event.detail.complete();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Proveedores</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/tabs/providers/new">
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent pullingIcon={refreshCircle}></IonRefresherContent>
        </IonRefresher>

        {loading ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        ) : providers.length > 0 ? (
          <IonList>
            {providers.map(provider => (
              <IonItem key={provider.provider_id} routerLink={`/tabs/providers/edit/${provider.provider_id}`} detail>
                <IonLabel>
                  <h2>{provider.provider_name} {provider.provider_last_name}</h2>
                  <p>Email: {provider.provider_mail}</p>
                  <p>Estado: {provider.provider_state || 'Activo'}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <div className="ion-text-center ion-padding">
            <p>No hay proveedores disponibles</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProvidersPage;
