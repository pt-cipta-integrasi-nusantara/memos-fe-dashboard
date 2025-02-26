import { TermsConditionContent } from "../../../sections/auth/registration/step-one-view";

export default function RegistrationStepOne() {
  return (
    <div>
      <head>
        <title>Terms and Condition - Memos Healthcare CRM</title>
        <meta
          name="description"
          content="Sistem CRM Healthcare yang dirancang untuk beradaptasi dengan anda bekerja, mengintegrasikan berbagai aspek operasional kesehatan ke dalam satu platform yang intuitif dan mudah digunakan"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="mt-[1.5rem]">
        <TermsConditionContent />
      </main>
    </div>
  );
}
