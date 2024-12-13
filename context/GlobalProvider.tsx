// context/GlobalProvider.ts
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from 'react-native';

// Define the shape of the user data
interface User {
    id: string;
    name: string;
    email: string;
    favourites: string[];
}

// Define the shape of the context value
interface UserContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create a context with a default value
const UserContext = createContext<UserContextValue | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);

    return (
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextValue => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};