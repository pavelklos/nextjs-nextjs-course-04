// rfce
import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  // console.log(notificationCtx);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
