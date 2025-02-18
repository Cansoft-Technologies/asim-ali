import { Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from 'scss/components/MortgageAccordion.module.scss';

const TipsAccordion = () => {
  const accordionData = [
    {
      title: "Compare rates",
      content: [
        "Shop around with multiple lenders",
        "Consider both fixed and variable rates",
        "Compare terms and conditions",
        "Look for prepayment privileges"
      ]
    },
    {
      title: "Decide sooner than later",
      content: [
        "Start reviewing options 120 days before renewal",
        "Lock in rates early if favorable",
        "Avoid automatic renewal without review",
        "Consider changing payment frequency"
      ]
    },
    {
      title: "Understand your mortgage better",
      content: [
        "Review amortization schedule",
        "Understand prepayment penalties",
        "Check for portability options",
        "Evaluate insurance requirements"
      ]
    }
  ];

  return (
    <div className={styles.accordionContainer}>
      <h2 className={styles.mainTitle}>Tips on renewing your mortgage</h2>
      <p className={styles.subtitle}>
        Mortgage renewal could be a great opportunity for homebuyers to save up in case 
        interest rates go down. It is also an opportune time to renegotiate on the 
        terms and conditions of your mortgage.
      </p>
      
      <Accordion defaultActiveKey="0" flush>
        {accordionData.map((item, index) => (
          <Accordion.Item 
            key={index} 
            eventKey={index.toString()} 
            className={styles.accordionItem}
          >
            <Accordion.Header className={styles.accordionHeader}>
              <span className={styles.accordionTitle}>
                {item.title}
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={styles.chevronClosed}
                />
                <FontAwesomeIcon 
                  icon={faChevronUp} 
                  className={styles.chevronOpen}
                />
              </span>
            </Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              <ul className={styles.contentList}>
                {item.content.map((point, i) => (
                  <li key={i} className={styles.listItem}>{point}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default TipsAccordion;