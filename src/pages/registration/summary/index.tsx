import Head from "next/head";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { ProfesionForm } from "../../../components/Pages/RegistrationSteps";
import { SummaryContent } from "../../../components/Pages/RegistrationSteps/Summary/Summary";

export default function SummaryPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Summary - Memos Healthcare CRM</title>
        <meta
          name="description"
          content="Sistem CRM Healthcare yang dirancang untuk beradaptasi dengan anda bekerja, mengintegrasikan berbagai aspek operasional kesehatan ke dalam satu platform yang intuitif dan mudah digunakan"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-[1.5rem]">
        <SummaryContent t={t} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<any> = async ({ locale }) => ({
  props: {
    locale,
    ...(await serverSideTranslations(locale ?? "id", ["common"])),
  },
});
