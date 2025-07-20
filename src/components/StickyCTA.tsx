import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const StickyCtaTab = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <>
      <style>{`
        @keyframes popInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          80% { opacity: 1; transform: translateX(5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes sectionBorderAnim {
          0% { border-color: #F0B254; box-shadow: 0 0 0 0 #F0B254; }
          50% { border-color: #3C78D8; box-shadow: 0 0 8px 2px #3C78D8; }
          100% { border-color: #F0B254; box-shadow: 0 0 0 0 #F0B254; }
        }
        .cta-pop {
          opacity: 0;
          color: #11143A;
        }
        .cta-pop.show {
          animation: popInLeft 0.7s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        .sticky-cta-section {
          border-width: 1px 1px 1px 0;
          border-style: solid;
          border-color: #F0B254 #F0B254 #F0B254 transparent;
          border-radius: 0 8px 8px 0;
          box-shadow: 2px 2px 5px rgba(0,0,0,0.15);
          animation: sectionBorderAnim 2s linear infinite alternate;
        }
        @keyframes sectionBorderAnim {
          0% { border-color: #F0B254 #F0B254 #F0B254 transparent; box-shadow: 0 0 8px 2px #F0B254;}
          50% { border-color: #3C78D8 #3C78D8 #3C78D8 transparent; box-shadow: 0 0 8px 2px #3C78D8; }
          100% { border-color: #F0B254 #F0B254 #F0B254 transparent; box-shadow: 0 0 8px 2px #F0B254;}
        }
      `}</style>
      <div
        className="sticky-cta-section"
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "#fff",
          padding: "12px 8px",
          borderRadius: "0 8px 8px 0",
        }}
      >
        <a
          href="tel:+16045913590"
          style={{ color: "#fff", margin: "8px 0", fontSize: "20px" }}
          title="Call Us"
        >
          <span className="cta-border">
            <FaPhoneAlt className={`cta-pop${show ? " show" : ""}`} />
          </span>
        </a>
        <a
          href="mailto:clientcare@asimali.ca"
          style={{ color: "#fff", margin: "8px 0", fontSize: "20px" }}
          title="Email Us"
        >
          <span className="cta-border">
            <FaEnvelope className={`cta-pop${show ? " show" : ""}`} />
          </span>
        </a>
      </div>
    </>
  );
};

export default StickyCtaTab;
