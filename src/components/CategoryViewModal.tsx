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
  IonBadge
} from '@ionic/react';
import { Category } from '@/types';

interface CategoryViewModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
}

const CategoryViewModal: React.FC<CategoryViewModalProps> = ({ isOpen, category, onClose }) => {
  if (!category) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de la Categoría</IonTitle>
          <IonButton slot="end" onClick={onClose}>Cerrar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center">          
          <IonItem lines="none" className="mb-4">
            <IonLabel>
              <h2 className="text-xl font-bold">{category.category_name}</h2>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h3 className="font-medium">Estado:</h3>
            </IonLabel>
            <IonBadge 
              color={category.category_state === 'Activa' ? 'success' : 'medium'} 
              slot="end"
            >
              {category.category_state}
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

export default CategoryViewModal;
