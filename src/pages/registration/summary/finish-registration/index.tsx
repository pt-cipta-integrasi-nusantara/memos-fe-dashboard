import { SummaryFinishContent } from "../../../../sections/auth/registration/registration-summary-finish-view";

export default function SummaryFinishRegistrationPage() {
  return (
    <div>
      <head>
        <title>Summary - Memos Healthcare CRM</title>
        <meta
          name="description"
          content="Sistem CRM Healthcare yang dirancang untuk beradaptasi dengan anda bekerja, mengintegrasikan berbagai aspek operasional kesehatan ke dalam satu platform yang intuitif dan mudah digunakan"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="mt-[1.5rem]">
        <SummaryFinishContent />
      </main>
    </div>
  );
}
