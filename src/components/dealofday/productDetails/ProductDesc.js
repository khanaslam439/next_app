import classes from '../../../styles/productDetails.module.css'
import strings from "../../../Assets/Local/Local";

function ProductDesc(props) {

  strings.setLanguage(props.lang);

  return (
    <div className={classes.prodDesc}>
      <h5>{strings.tradeMark}: آبل</h5>
      <h5>{strings.type}: سماعة رأس</h5>
      <h5>{strings.modelName}: ابل ايربودز ماكس</h5>
      <h5>{strings.weight}: 384.8 جرام</h5>
      <h5 className={classes.prodDescTitle + ' mt-4 mb-3'}>{strings.audioTechnology}</h5>
      <h5>محرك ديناميكي من تصميم ابل</h5>
      <h5>خاصية إلغاء الضوضاء النشط</h5>
      <h5>نمط شفافية الصوت</h5>
      <h5>موازنة الصوت المتكيفة</h5>
      <h5>صوت ثلاثي الأبعاد مع خاصية التتبع الديناميكي للرأس</h5>
      <h5 className={classes.prodDescTitle + ' mt-4 mb-3'}>{strings.battery}</h5>
      <h5>ما يصل إلى 20 ساعة من تشغيل الفيديو مع تمكين الصوت ثلاثي الأبعاد</h5>
      <h5>ما يصل إلى 20 ساعة من التحدث بشحنة واحدة</h5>
      <h5>5 دقائق من الشحن توفر مدة استماع تصل إلى ما يقارب ساعة ونصف</h5>
    </div>
  )
}

export default ProductDesc
