import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    emp_id: null,
    emp_full_name: null,
    role: null,
    emp_personal_email: null,
    emp_phone_no: null,
    emp_addhar_no: null,
    emp_pan_card_no: null,
    emp_department: null,
    emp_designation: null,
    emp_join_date: null,
    emp_status: null,
    role_permission: null,
    emp_email: null,
    emp_password: null,
    total_leave : null
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
