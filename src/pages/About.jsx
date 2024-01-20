import PageNav from "../components/PageNav";
import styles from "./About.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpeg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About Journey.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            laudantium! Maxime sed iste, quod repellendus laboriosam magni,
            atque autem sequi architecto magnam impedit, blanditiis asperiores
            quisquam consequatur provident quaerat cumque?
          </p>
        </div>
      </section>
    </main>
  );
}
