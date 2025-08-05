import { useEffect, useRef } from "react";
import { useToasts } from "~/stores/toast";

import styles from "./Toast.module.scss";

export const Toast = () => {
  const { toasts, removeToast } = useToasts();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current = toasts
      .filter((toast) => !timers.current.includes(toast.id))
      .map((toast) => {
        setTimeout(() => removeToast(toast.id), 2000);
        return toast.id;
      });
  }, [toasts, removeToast]);

  return (
    <section
      className={styles.container}
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions text"
      aria-atomic="false"
      tabIndex={-1}
    >
      {toasts.length > 0 && (
        <ol className={styles.toastList}>
          {toasts.map((toast) => (
            <li key={toast.id} className={styles.toast}>
              <p>{toast.message}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
