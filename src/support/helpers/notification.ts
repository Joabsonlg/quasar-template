import { Notify } from "quasar";

type positionType = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export const showNotification = (
  type: string,
  message: string,
  position: positionType = "top-right"
) => {
  Notify.create({
    type,
    message,
    actions: [
      {
        icon: "close",
        color: "white",
      },
    ],
    position,
  });
};

export const showNegative = (message: string, position: positionType) =>
  showNotification("negative", message, position);
export const showPositive = (message: string, position: positionType) =>
  showNotification("positive", message, position);
export const showWarning = (message: string, position: positionType) =>
  showNotification("warning", message, position);
export const showInfo = (message: string, position: positionType) =>
  showNotification("info", message, position);
