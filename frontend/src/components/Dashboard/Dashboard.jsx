import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.section1}>
          <div className={`${styles.component} ${styles.component1}`}>
          </div>
          <div className={`${styles.component} ${styles.component2}`}></div>
          <div className={`${styles.component} ${styles.component3}`}></div>
          <div className={`${styles.component} ${styles.component4}`}></div>
        </div>
        <div className={styles.section2}>
          <div className={`${styles.component} ${styles.component1}`}></div>
          <div className={`${styles.component} ${styles.component2}`}></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
