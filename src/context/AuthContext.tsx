import axios from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";
import { LOGIN_URL } from "../url";

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: <T = any>(data: T) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const login = async <T = any>(data: T): Promise<void> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(LOGIN_URL, data, { headers });

    // Exemple : si ton API renvoie { token, user }
    setToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
