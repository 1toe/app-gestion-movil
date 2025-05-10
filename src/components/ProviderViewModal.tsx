import React from 'react';
import { 
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon
} from '@ionic/react';
import { mail } from 'ionicons/icons';
import { Provider } from '@/types';

interface ProviderViewModalProps {
  isOpen: boolean;
  provider: Provider | null;
  onClose: () => void;
}

const ProviderViewModal: React.FC<ProviderViewModalProps> = ({ isOpen, provider, onClose }) => {
  if (!provider) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del Proveedor</IonTitle>
          <IonButton slot="end" onClick={onClose}>Cerrar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
            <div className="text-3xl font-bold text-center">
              {provider.provider_name.charAt(0)}{provider.provider_last_name.charAt(0)}
            </div>
          </div>
          
          <IonItem lines="none" className="mb-4">
            <IonLabel>
              <h2 className="text-xl font-bold">
                {provider.provider_name} {provider.provider_last_name}
              </h2>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonIcon icon={mail} slot="start" />
            <IonLabel>
              <p>{provider.provider_mail}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h3 className="font-medium">Estado:</h3>
            </IonLabel>
            <IonBadge 
              color={provider.provider_state === 'Activo' ? 'success' : 'medium'} 
              slot="end"
            >
              {provider.provider_state}
            </IonBadge>
          </IonItem>
          
          <div className="w-full mt-6">
            <IonButton expand="block" onClick={onClose}>
              Volver
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ProviderViewModal;
