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
              className="team_section my-5"
              style={{
                backgroundImage: `url("${teams?.teamImage?.sourceUrl}")`,
              }}
            >
              {
                teams?.teamTitle && teams?.teamDescription && (
                  <div className={styles.overlay}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teams?.teamTitle,
                  }}
                ></div>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: teams?.teamDescription,
                  }}
                ></div>
              </div>
                )
              }
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Team;
