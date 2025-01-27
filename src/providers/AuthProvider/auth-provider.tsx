import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { User } from "../../types/commonType";
import { AuthContext } from "./auth-context.ts";
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse] = await Promise.all([
          fetch("http://localhost:8000/users"),
        ]);
        const usersData = await usersResponse.json();
        setCurrentUser(usersData[0]);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users data: ", error);
      }
    };
    fetchData();
  }, []);

  const getUserById = (id: number) => {
    return users.find((objUser) => objUser.id === id);
  };
  const value = useMemo(
    () => ({
      currentUser: currentUser,
      setCurrentUser: setCurrentUser,
      users: users,
      getUserById: getUserById,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, users]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
