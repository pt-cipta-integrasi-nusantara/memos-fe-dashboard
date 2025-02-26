import { SignupContent } from "../sections/auth/signup-view";

export default function SignupPage() {
  return (
    <>
      <head>
        <title>Clinix</title>
        <meta
          name="description"
          content="Sistem CRM Healthcare yang dirancang untuk beradaptasi dengan anda bekerja, mengintegrasikan berbagai aspek operasional kesehatan ke dalam satu platform yang intuitif dan mudah digunakan"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main className="mt-[1.5rem]">
        <SignupContent />
      </main>
    </>
  );
}
