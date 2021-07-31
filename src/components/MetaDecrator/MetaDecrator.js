import Head from "next/head";

const metaDecartor = ({ title, description, imgUrl, imgAlt }) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content="تجول - شراء منتجات - شراء اونلاين " />
      <meta name="author" content="Tajwal" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />

      <meta name="twitter:card" content={imgUrl} />

      <meta property="og:site_name" content={title} />
      <meta name="twitter:image:alt" content={imgAlt}></meta>
      <title>{title}</title>
      
    </Head>
  );
};
metaDecartor.defaultProps = {
  title: "Tajwal",
  description:
    " يقوم المستخدم بالتجول بالاسواق كما لو انه خرج ليتسوق بنفسه  دون الحاجة الي  تسجيل الدخول من خلال اليه البحث يستطيع المستخدم ان يشاهد جميع التفاصيل والمعلومات عن المتجر(الموقع – التقيم – التعليقات – صور للمتجر – مواعيد العمل ) ويستطيع المستخدم ان يتابع المتاجر لكي يصل له كل جديد",
  imgUrl: "https://www.mediafire.com/convkey/01cb/nfifrquxgwu8tvuzg.jpg",
  imgAlt: "Tajwal logo",
};
export default metaDecartor;
