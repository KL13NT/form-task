import { useEffect } from "react";
import { useToasts } from "~/stores/toast";

import styles from "./Toast.module.scss";

export const Toast = () => {
  const { toasts, removeToast } = useToasts();

  useEffect(() => {
    const timerIds = toasts.map((toast) =>
      window.setTimeout(() => {
        removeToast(toast.id);
      }, 5000)
    );

    return () => {
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
    };
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
