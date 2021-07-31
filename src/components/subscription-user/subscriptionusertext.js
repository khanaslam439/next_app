import classes from "../../styles/subscrptions.module.css";
import strings from "../../Assets/Local/Local";
import { Button } from "react-bootstrap";
import Link from "next/link";

function Subscriptiontext() {
  return (
    <div className={classes.subscriptionText + " mb-4"}>
      <h3 className="pt-lg-4 pt-md-4 pt-0 mb-4">{strings.subscriptionUser}</h3>
      <p>
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
        القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة
        التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ
        طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
        سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
        الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
        توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
        لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
        الفقرات هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
        سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في
        الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي
        توزيعاَ طبيعياَ هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى
      </p>
      <Button className={classes.subscriptionLogin + " btn-block border-0"}>
        <Link href="/Tajawal/login">{strings.loginBTN}</Link>
      </Button>
    </div>
  );
}

export default Subscriptiontext;
