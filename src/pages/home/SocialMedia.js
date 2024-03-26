import styles from "./SocialMedia.module.scss";
import useWindowResize from "../../hooks/useWindowResize";
import { InstagramEmbed } from "react-social-media-embed";
import photo from "../../assets/social/camera-svgrepo-com.svg";
import video from "../../assets/social/video-svgrepo-com.svg";

const SocialMedia = () => {
  const windowWidth = useWindowResize();

  return (
    <div className={styles["social-media-section"]}>
      <div className={styles.content}>
        <h1>
          Step Inside Our <span>Creative</span> Realm
        </h1>
        <h2>
          Where the <span>Magic</span> Happens
        </h2>
        {windowWidth < 768 ? (
          <div
            className={styles["embed-phone"]}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/CzjMftyo59P/?img_index=1"
              width={328}
            />
          </div>
        ) : (
          ""
        )}
        <p>
          Follow us on <strong>Instagram</strong> and join our journey. You'll
          be getting a sneak peek into what we're up to behind the scenes, from
          upcoming releases to the creative chaos that goes into our designs.
          It's like being part of an exclusive club where style secrets are
          shared, and you're in on the action.{" "}
        </p>
        <div className={styles.wrapper}>
          <div className={styles["wrapper__inner-wrapper"]}>
            <img src={video} loading="lazy" alt="video-camera" />
            <div>
              <p>Video Content</p>
              <p>Witness the step-by-step creation process.</p>
            </div>
          </div>
          <div className={styles["wrapper__inner-wrapper"]}>
            <img src={photo} loading="lazy" alt="photo-camera" />
            <div>
              <p>Photo Content</p>
              <p>Find the pair that match you in our Gallery.</p>
            </div>
          </div>
        </div>
      </div>

      {windowWidth > 767 ? (
        <div className={styles["instagram-embed"]}>
          <div
            className={styles["embed-one"]}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/CzjMftyo59P/?img_index=1"
              width={328}
            />
          </div>
          <div
            className={styles["embed-two"]}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InstagramEmbed
              url="https://www.instagram.com/p/C0Gw8zioxc9/"
              width={328}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SocialMedia;
