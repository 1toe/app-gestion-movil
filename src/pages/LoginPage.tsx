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
import { useNavigate, useLocation, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithUsername, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/tabs';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor ingrese su nombre de usuario y contraseña');
      return;
    }

    try {
      await loginWithUsername(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <IonCard className="w-full max-w-md">
            <IonCardHeader>
              <IonCardTitle className="text-center">Iniciar Sesión</IonCardTitle>
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
                    onIonChange={(e) => setUsername(e.detail.value || '')}
                    placeholder="Ingrese su nombre de usuario (sin @)"
                  />
                </IonItem>

                <div className="text-xs text-gray-500 mt-1 ml-2">
                  El usuario debe ser la parte antes del @ de su correo.
                </div>

                <IonItem className="mt-4">
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value || '')}
                    placeholder="Ingrese su contraseña"
                  />
                </IonItem>

                <div className="mt-6">
                  <IonButton expand="block" type="submit" disabled={loading}>
                    Iniciar Sesión
                  </IonButton>
                </div>

                <div className="text-center mt-4">
                  <p>
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-primary">
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              </form>
            </IonCardContent>
          </IonCard>

          <IonLoading isOpen={loading} message="Iniciando sesión..." />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
