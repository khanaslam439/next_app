import React from 'react';
import logoImg from '../../Assets/Images/whiteLogo.png'
import styles from "../../styles/preloadding.module.css";


const Preloading = () => {
  return (
    <div >
      <div className={styles.PreLoading}>
        <div className={styles.LogoContainer}>
          <img src={logoImg} />
        </div>
      </div>
    </div>

  );
}

export default Preloading;