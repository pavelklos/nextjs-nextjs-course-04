import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});
// NotificationContext.displayName = "NOTIFICATION-CONTEXT";

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        // setActiveNotification(null);
        hideNotificationHandler();
      }, 3000);
      // cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]); // ON INITIAL RENDER + DEPENDENCY 'activeNotification'

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
    // setActiveNotification({
    //   title: notificationData.title,
    //   message: notificationData.message,
    //   status: notificationData.status,
    // });
  }
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
