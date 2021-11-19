// import React, { Context } from 'react';
// import { HMNotification, IHMNotification, EHMNotificationType } from '../components';
// import { IAnyProps } from '../utilities';

// const defaultNotificationContext: IHMNotification = {
//     show: false,
//     type: 'Error',
//     message: 'Something went wrong'
// }

// type ISetHMNotification = (notification: IHMNotification) => void;
// const NotificationContext: Context<{notificationContext: IHMNotification, setNotificationContext: ISetHMNotification}> = React.createContext({notificationContext: defaultNotificationContext, setNotificationContext: (notification: IHMNotification) => {}});

// const NotificationProvider = (props: IAnyProps): JSX.Element => {
//   const [notification, setNotification] = React.useState(defaultNotificationContext);
//   React.useEffect((): void => {
//   }, []);

//   return (
//     <NotificationContext.Provider value={{
//         notificationContext: notification, 
//         setNotificationContext: (_notification: IHMNotification): void => {
//           console.log('n ', _notification)
//           setNotification(_notification); 
//         }
//     }}>
//         {props.children}
//         <HMNotification {...notification} />
//     </NotificationContext.Provider>
//   );
// }

export { };
