import { Container } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";



type MyProps = {
  teams: any;
};

const Team = (props: MyProps) => {
  const { teams } = props;

  return (
    <>
      <Container>
            <div>
              {teams?.hideSection == true ? (
                ""
              ) : (
                <div
                  className="team_section"
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
                      dangerouslySetInnerHTML={{
                        __html: teams?.teamDescription,
                      }}
                    ></p>
                  </div>
                </div>
              )}
            </div>
      </Container>
    </>
  );
};

export default Team;
