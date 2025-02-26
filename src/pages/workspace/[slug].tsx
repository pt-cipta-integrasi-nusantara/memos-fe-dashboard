import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { WorkspaceContent } from "../../components";

export default function WorkspacePage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      <Head>
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
      </Head>

      <main className="mt-[1.5rem]">
        <WorkspaceContent t={t} />
      </main>
    </div>
  );
}
