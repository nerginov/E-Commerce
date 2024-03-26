import img from "../../assets/fashion-drawing-stock-photography-black-and-white-curly-hair-women-b6d34df5ea30231c31cd13f43b1934fc.png";
import styles from "./About.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
const About = () => {
  const windowWidth = useWindowResize();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          {windowWidth > 767 && (
            <div className={styles.aboutImg}>
              <img src={img} alt="" />
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
          <header>
            <h1>
              Meet <span className={styles.accentSpan}>Silven</span>, the heart
              and soul behind{" "}
              <span className={styles.accentSpan}>SI'allure</span>. <br />
              {windowWidth < 767 && (
                <div className={styles.aboutImg}>
                  <img src={img} alt="" />
                </div>
              )}
              <span>
                She's the proud owner and artisan, pouring her passion into
                every piece she creates.
              </span>
            </h1>
          </header>

          <div>
            <h2>Unique Beauty Statements</h2>
            <p>
              For <span>Silven</span>, accessories aren't just about looks;
              they're about expressing your unique beauty and story. That's why
              each <span>SI'allure</span> piece is carefully handmade with love.
            </p>
          </div>

          <div>
            <h2>Honoring Craftsmanship</h2>
            <p>
              Craftsmanship is at the core of <span>Silven</span>'s work. From
              mixing materials to crafting limited collections, she puts her
              heart into every step. Each accessory is a labor of love, made
              just for you.
            </p>
          </div>

          <div className={styles.textBoxThree}></div>
        </div>
      </div>
    </div>
  );
};

export default About;
