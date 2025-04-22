import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRegistrationFormStore {
    formData: any;
    currentStep: string;
    setCurrentStep: (step: string) => void;
    setFormData: (formInput: any) => void
    resetFormData: () => void
}

export const useRegistrationFormStore = create<IRegistrationFormStore>()(
    persist(
        (set, get) => ({
           formData: {},
           currentStep: "",
           setCurrentStep: (step: string) => {
            set({
                currentStep: step
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
            name: "registration-form-store",
        }
    )
);
