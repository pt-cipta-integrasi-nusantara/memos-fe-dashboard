import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISubscriptionStore {
    subscriptionData: any;
    setSubscriptionData: (selectedItem: any) => void
    resetSubscriptionData: () => void
    formData: any;
    setFormData: (formInput: any) => void
    resetFormData: () => void
}

export const useSubscriptionStore = create<ISubscriptionStore>()(
    persist(
        (set, get) => ({
           formData: {},
           subscriptionData: {},
           setSubscriptionData: (selectedItem) => {
            set({
                subscriptionData: {...get().subscriptionData, ...selectedItem}
            })
           },
           resetSubscriptionData: () => {
            set({
                subscriptionData: {}
            })
           },
           setFormData: (formInput) => {
            set({
                formData: {...get().formData, ...formInput}
            })
           },
           resetFormData: () => {
            set({
                formData: {}
            })
           }
        }),
        {
            name: "subscription-store",
        }
    )
);
