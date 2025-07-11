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
        .cta-pop {
          opacity: 0;
        }
        .cta-pop.show {
          animation: popInLeft 0.7s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        .cta-pop:hover {
          color: #FFD700;
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          background: "#1A1A3A",
          padding: "12px 8px",
          borderRadius: "0 8px 8px 0",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <a
          href="tel:+16045913590"
          style={{ color: "#fff", margin: "8px 0", fontSize: "20px" }}
          title="Call Us"
        >
          <FaPhoneAlt className={`cta-pop${show ? " show" : ""}`} />
        </a>
        <a
          href="mailto:clientcare@asimali.ca"
          style={{ color: "#fff", margin: "8px 0", fontSize: "20px" }}
          title="Email Us"
        >
          <FaEnvelope className={`cta-pop${show ? " show" : ""}`} />
        </a>
      </div>
    </>
  );
};

export default StickyCtaTab;
