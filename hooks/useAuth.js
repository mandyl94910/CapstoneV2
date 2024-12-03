// hooks/useAuth.js
import { useState, useEffect } from "react";


export const useAuth = () => {

    // helped by chatGPT
    // prompt：The code for reading user information is used in many pages, 
    //         how can it be extracted and then imported for use, 
    //         so I don't have to repeat this part of the code everywhere!

    const [user, setUser] = useState(null);

    // useEffect to load user info from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);

      const updateUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      };
    
      // method to log out
      const onLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
      }

    return{ user, updateUser, onLogout };
}