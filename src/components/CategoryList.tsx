import React from 'react';
import { 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonList,
  IonBadge
} from '@ionic/react';
import { Category } from '@/types';

interface CategoryListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onEdit, onDelete, onView }) => {
  if (categories.length === 0) {
    return (
      <IonCard>
        <IonCardContent>
          <p className="text-center">No hay categorías disponibles</p>
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonList>
      {categories.map((category) => (
        <IonCard key={category.category_id} className="mb-4">
          <IonCardHeader>
            <IonCardTitle className="flex items-center">
              {category.category_name}
              <IonBadge 
                color={category.category_state === 'Activa' ? 'success' : 'medium'} 
                className="ml-2"
              >
                {category.category_state}
              </IonBadge>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="flex justify-between mt-4">
              <IonButton
                size="small"
                color="secondary"
                onClick={() => onView(category)}
              >
                Ver
              </IonButton>
              <IonButton
                size="small"
                color="primary"
                onClick={() => onEdit(category)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => onDelete(category)}
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

export default CategoryList;
