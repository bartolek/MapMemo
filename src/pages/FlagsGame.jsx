import PageNav from "../components/PageNav";
import styles from "./FlagsGame.module.css";
import Quiz from "../components/Quiz";

function FlagsGame() {
  return (
    <main className={styles.product}>
      <PageNav />
      <Quiz />
    </main>
  );
}

export default FlagsGame;
