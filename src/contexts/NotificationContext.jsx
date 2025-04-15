/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    },
    []
  );

  const Notification = ({ id, message, type }) => {
    const getTypeStyles = () => {
      switch (type) {
        case "success":
          return "bg-green-500/10 border-green-500/20 text-green-400";
        case "error":
          return "bg-red-500/10 border-red-500/20 text-red-400";
        case "warning":
          return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400";
        default:
          return "bg-turquoise/10 border-turquoise/20 text-turquoise";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`fixed bottom-4 right-4 p-4 rounded-lg border ${getTypeStyles()} backdrop-blur-sm`}
      >
        {message}
      </motion.div>
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed z-50 bottom-4 right-4">
        <AnimatePresence>
          {notifications.map((notification) => (
            <Notification key={notification.id} {...notification} />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
