import { useEffect } from "react";

export default function Toast({
  message,
  duration = 3000,
  onClose,
}: {
  id: string;
  message: string;
  duration?: number;
  onClose: () => void;
}) {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration);
  }, [duration, onClose]);
  return (
    <div className="bg-gray-100 text-gray-800 p-4 rounded-md shadow-md mb-2 mr-2  ">
      {message}
    </div>
  );
}
