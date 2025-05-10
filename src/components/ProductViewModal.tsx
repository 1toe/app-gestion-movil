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
  IonImg
} from '@ionic/react';
import { Product } from '@/types';

interface ProductViewModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductViewModal: React.FC<ProductViewModalProps> = ({ isOpen, product, onClose }) => {
  if (!product) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle del Producto</IonTitle>
          <IonButton slot="end" onClick={onClose}>Cerrar</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center">
          <IonImg
            src={product.product_image || 'https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg'}
            alt={product.product_name}
            className="h-48 object-contain w-full mb-4"
          />
          
          <IonItem lines="none">
            <IonLabel>
              <h2 className="text-xl font-bold">{product.product_name}</h2>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h3 className="font-medium">Precio:</h3>
              <p className="text-lg">${product.product_price.toFixed(2)}</p>
            </IonLabel>
          </IonItem>
          
          <IonItem>
            <IonLabel>
              <h3 className="font-medium">Estado:</h3>
              <p className={product.product_state === 'Activo' ? 'text-green-600' : 'text-red-600'}>
                {product.product_state}
              </p>
            </IonLabel>
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

export default ProductViewModal;
