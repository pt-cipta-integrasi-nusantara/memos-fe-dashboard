import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { ProfileContent } from "../../components";

export default function ProfilePage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      <Head>
        <title>Profile - Memos Healthcare CRM</title>
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
      </Head>

      <main>
        <ProfileContent t={t} />
      </main>
    </div>
  );
}
