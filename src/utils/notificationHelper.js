import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const setLocaleNotification = (title, body, trigger) =>
  Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: new Date(trigger),
  });
