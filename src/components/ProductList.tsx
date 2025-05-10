import React from 'react';
import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonList,
} from '@ionic/react';
import { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete, onView }) => {
  if (products.length === 0) {
    return (
      <IonCard>
        <IonCardContent>
          <p className="text-center">No hay productos disponibles</p>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonList>
      {products.map((product) => (
        <IonCard key={product.product_id} className="mb-4">
          <IonCardHeader>
            <IonCardTitle>{product.product_name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="mb-2">
              <p><strong>Precio:</strong> ${product.product_price.toFixed(2)}</p>
              <p><strong>Estado:</strong> {product.product_state}</p>
            </div>
            <div className="flex justify-between mt-4">
              <IonButton
                size="small"
                color="secondary"
                onClick={() => onView(product)}
              >
                Ver
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={() => onEdit(product)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => onDelete(product)}
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

export default ProductList;
