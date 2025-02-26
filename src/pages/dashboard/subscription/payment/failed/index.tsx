import { PaymentFailedContent } from "../../../../../components/Pages/Dashboard";

export default function PaymentFailedPage() {
  return (
    <div>
      <head>
        <title>Dashboard - Memos Healthcare CRM</title>
        <meta
          name="description"
          content="Sistem CRM Healthcare yang dirancang untuk beradaptasi dengan anda bekerja, mengintegrasikan berbagai aspek operasional kesehatan ke dalam satu platform yang intuitif dan mudah digunakan"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/dokter-hero-mobile.webp"
        />
      </head>

      <main className="mt-[1.5rem]">
        <PaymentFailedContent />
      </main>
    </div>
  );
}
