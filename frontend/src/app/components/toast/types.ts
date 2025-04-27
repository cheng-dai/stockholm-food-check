export interface ToastProps {
  id: number;
  message: string;
  duration?: number;
  onClose: () => void;
}

export interface Toast {
  id: number;
  message: string;
  duration?: number;
}
