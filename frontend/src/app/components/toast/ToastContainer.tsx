import { useCallback, useEffect, useState } from "react";
import Toast from "./Toast";
import { Toast as ToastType } from "./types";
export interface ToastContainer extends HTMLDivElement {
  setToasts: React.Dispatch<React.SetStateAction<ToastType[]>>;
}

export default function ToastContainer({
  ref,
}: {
  ref: React.RefObject<ToastContainer | null>;
}) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  useEffect(() => {
    if (ref.current) {
      ref.current.setToasts = setToasts;
    }
  }, [ref, setToasts]);
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  return (
    <div
      className="fixed bottom-0 right-0 m-4 z-50 bg-white rounded-md shadow-md "
      ref={ref}
    >
      {toasts.map((toast) => (
        <Toast
          key={Number(toast.id)}
          {...toast}
          id={toast.id.toString()}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
