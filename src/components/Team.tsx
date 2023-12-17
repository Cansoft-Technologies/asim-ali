import { Container } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";
import { useInView } from "react-intersection-observer";

type MyProps = {
  teams: any;
};

const Team = (props: MyProps) => {
  const { teams } = props;
  const { ref: imgRef, inView: load } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });

  return (
    <>
      <Container ref={imgRef}>
        {load && (
          <div>
            {teams?.hideSection == true ? (
              ""
            ) : (
              <div
                className="team_section my-5"
                style={{
                  backgroundImage: `url("${teams?.teamImage?.sourceUrl}")`,
                }}
              >
                <div className={styles.overlay}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: teams?.teamTitle,
                    }}
                  ></div>
                  <p
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: teams?.teamDescription,
                    }}
                  ></p>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default Team;
