import Head from "next/head";
import { FC } from "react";

interface CustomSeoProps {
  seoData: { title?: string; description?: string };
}
const CustomSeo: FC<CustomSeoProps> = ({ seoData }) => {
  try {
    const { title, description } = seoData;
    return (
      <Head>
        <title>{title === '홈' ? "" : `${title} | `}K:Log</title>
        <meta name="viewport" content={`initial-scale=1.0, width=device-width`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:article:author" content="K:Log" />
      </Head>
    );
  } catch {
    return (
      <Head>
        <title>K:Log</title>
        <meta name="description" content={"존재하지 않는 페이지입니다."} />
      </Head>
    );
  }
};

export default CustomSeo;
