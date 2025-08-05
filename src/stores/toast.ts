import { create } from "zustand";

type Toast = {
	message: string;
	id: number;
};

type ToastStore = {
	toasts: Toast[];
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: number) => void;
};

export const useToasts = create<ToastStore>((set) => ({
	toasts: [],
	addToast: (toast) =>
		set((state) => ({
			toasts: [...state.toasts, { ...toast, id: state.toasts.length }],
		})),

	removeToast: (id) =>
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		})),
}));

export const toast = useToasts.getState().addToast;
