import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRegistrationFormStore {
    formData: any;
    setFormData: (formInput: any) => void
    resetFormData: () => void
}

export const useRegistrationFormStore = create<IRegistrationFormStore>()(
    persist(
        (set, get) => ({
           formData: {},
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
            name: "registration-form-store",
        }
    )
);
