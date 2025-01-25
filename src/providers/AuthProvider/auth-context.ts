import { createContext, useContext } from "react";
import { User } from "../../types/commonType";

interface AuthContextType {
  currentUser: User | undefined;
  users: User[];
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  getUserById: (id: number) => User | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
