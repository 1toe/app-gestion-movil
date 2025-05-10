import React from 'react';
import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonList,
  IonBadge,
  IonIcon
} from '@ionic/react';
import { mail } from 'ionicons/icons';
import { Provider } from '@/types';

interface ProviderListProps {
  providers: Provider[];
  onEdit: (provider: Provider) => void;
  onDelete: (provider: Provider) => void;
  onView: (provider: Provider) => void;
}

const ProviderList: React.FC<ProviderListProps> = ({ providers, onEdit, onDelete, onView }) => {
  if (providers.length === 0) {
    return (
      <IonCard>
        <IonCardContent>
          <p className="text-center">No hay proveedores disponibles</p>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonList>
      {providers.map((provider) => (
        <IonCard key={provider.provider_id} className="mb-4">
          <IonCardHeader>
            <IonCardTitle>
              {provider.provider_name} {provider.provider_last_name}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="mb-2">
              <p className="flex items-center">
                <IonIcon icon={mail} className="mr-1" /> {provider.provider_mail}
              </p>
              <p className="flex items-center mt-1">
                Estado: 
                <IonBadge 
                  color={provider.provider_state === 'Activo' ? 'success' : 'medium'} 
                  className="ml-2"
                >
                  {provider.provider_state}
                </IonBadge>
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <IonButton
                size="small"
                color="secondary"
                onClick={() => onView(provider)}
              >
                Ver
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={() => onEdit(provider)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => onDelete(provider)}
              >
                Eliminar
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      ))}
    </IonList>
  );
};

export default ProviderList;
