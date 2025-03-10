import { useParams } from "react-router-dom";
import { PaymentContent } from "../../../../../sections/payment/payment-view";
import { useSubscriptionById } from "../../../../../services/subscription/use-subscription-detail";

export default function PaymentDetailPage() {
  const { subscriptionId } = useParams();
  const { data } = useSubscriptionById(String(subscriptionId));
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
        <PaymentContent data={data} />
      </main>
    </div>
  );
}
