import { useCallback } from "react";
import { ToastContainer } from "./ToastContainer";
import { Toast } from "./types";
export const useToast = (
  containerRef: React.RefObject<ToastContainer | null>
) => {
  const showToast = useCallback(
    (message: string, duration: number = 3000) => {
      if (!containerRef?.current) return;
      console.log("showToast", message);
      const newToast: Toast = {
        id: Date.now(),
        message,
        duration,
      };

      containerRef.current.setToasts((prev) => [...prev, newToast]);
    },
    [containerRef]
  );

  return showToast;
};
