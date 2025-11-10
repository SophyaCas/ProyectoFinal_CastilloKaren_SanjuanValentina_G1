import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para login
    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    };

    // Función para registro
    const register = async (email, password, role = 'reportero') => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Guardar información adicional del usuario en Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            role: role,
            createdAt: new Date()
        });

        return userCredential;
    };

    // Función para logout
    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Usuario está logueado
                setCurrentUser(user);

                try {
                    // Obtener el rol del usuario desde Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserRole(userDoc.data().role);
                    }
                } catch (error) {
                    console.error("Error obteniendo rol del usuario:", error);
                    setUserRole(null);
                }
            } else {
                // No hay usuario logueado
                setCurrentUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        login,
        register,
        logout,
        isAuthenticated: !!currentUser,
        isEditor: userRole === 'editor',
        isReporter: userRole === 'reportero'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}