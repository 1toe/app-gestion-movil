import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from '@/hooks/use-toast';
import { isValidEmailUsername, generateEmailFromUsername } from '@/lib/auth-utils';

interface User {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithUsername: (username: string, password: string) => Promise<void>;
  registerWithUsername: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Inicio de sesión exitoso" });
    } catch (error) {
      console.error("Login error:", error);
      toast({ 
        title: "Error al iniciar sesión", 
        description: "Correo o contraseña incorrectos", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Registro exitoso" });
    } catch (error) {
      console.error("Register error:", error);
      toast({ 
        title: "Error al registrarse", 
        description: "No se pudo completar el registro", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      toast({ title: "Sesión cerrada correctamente" });
    } catch (error) {
      console.error("Logout error:", error);
      toast({ 
        title: "Error al cerrar sesión", 
        variant: "destructive" 
      });
      throw error;
    }
  };

  const loginWithUsername = async (username: string, password: string) => {
    try {
      setLoading(true);
      const email = generateEmailFromUsername(username);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      const userEmail = userCredential.user?.email;
      if (userEmail && !isValidEmailUsername(userEmail, username)) {
        await signOut(auth);
        setCurrentUser(null);
        toast({
          title: "Error de autenticación",
          description: "El nombre de usuario debe ser exactamente lo que está antes del @ en su correo.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales incorrectas o usuario no existe.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerWithUsername = async (username: string, password: string) => {
    try {
      setLoading(true);
      const email = generateEmailFromUsername(username);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      toast({
        title: "Error de registro",
        description: "No se pudo crear la cuenta. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    loginWithUsername,
    registerWithUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
