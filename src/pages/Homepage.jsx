import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>Your travel journal</h1>
        <h2>Keep track of your adventures!</h2>
      </section>
    </main>
  );
}
