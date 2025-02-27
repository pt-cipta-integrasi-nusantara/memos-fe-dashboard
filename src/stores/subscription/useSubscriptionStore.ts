import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ISubscriptionStore {
    subscriptionData: any;
    setSubscriptionData: (selectedItem: any) => void
    resetSubscriptionData: () => void
}

export const useSubscriptionStore = create<ISubscriptionStore>()(
    persist(
        (set, get) => ({
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
           }
        }),
        {
            name: "subscription-store",
        }
    )
);
