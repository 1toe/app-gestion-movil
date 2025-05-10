import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonLoading
} from '@ionic/react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { registerWithUsername, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Por favor complete todos los campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      await registerWithUsername(username, password);
      navigate('/tabs');
    } catch (err: any) {
      setError(err.message || 'Error al registrarse');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <IonCard className="w-full max-w-md">
            <IonCardHeader>
              <IonCardTitle className="text-center">Registro</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <IonItem>
                  <IonLabel position="floating">Nombre de Usuario</IonLabel>
                  <IonInput 
                    value={username} 
                    onIonChange={e => setUsername(e.detail.value || '')}
                    placeholder="Ingrese su nombre de usuario deseado (sin @)"
                  />
                </IonItem>
                
                <div className="text-xs text-gray-500 mt-1 ml-2">
                  El usuario será la parte antes del @ de su correo. Se creará como {username}@example.com
                </div>
                
                <IonItem className="mt-4">
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput 
                    type="password" 
                    value={password} 
                    onIonChange={e => setPassword(e.detail.value || '')}
                    placeholder="Ingrese su contraseña"
                  />
                </IonItem>
                
                <IonItem className="mt-4">
                  <IonLabel position="floating">Confirmar Contraseña</IonLabel>
                  <IonInput 
                    type="password" 
                    value={confirmPassword} 
                    onIonChange={e => setConfirmPassword(e.detail.value || '')}
                    placeholder="Confirme su contraseña"
                  />
                </IonItem>
                
                <div className="mt-6">
                  <IonButton expand="block" type="submit" disabled={loading}>
                    Registrarse
                  </IonButton>
                </div>
                
                <div className="text-center mt-4">
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-primary">
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </form>
            </IonCardContent>
          </IonCard>
          
          <IonLoading isOpen={loading} message="Creando cuenta..." />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
