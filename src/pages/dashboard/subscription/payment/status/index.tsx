import { useParams } from "react-router-dom";
import { usePaymentById } from "../../../../../services/payment/use-payment-detail";

import { PaymentFailedContent } from "../../../../../sections/payment/payment-failed-view";
import { PaymentInProgressContent } from "../../../../../sections/payment/payment-in-progress-view";
import { PaymentSuccessContent } from "../../../../../sections/payment/payment-success-view";

export default function PaymentStatusPage() {
  const { paymentId } = useParams();
  const { data } = usePaymentById(String(paymentId));

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
        {data?.status === "Pending" ? (
          <PaymentInProgressContent data={data} />
        ) : data?.status === "Paid" ? (
          <PaymentSuccessContent />
        ) : (
          <PaymentFailedContent />
        )}
      </main>
    </div>
  );
}
