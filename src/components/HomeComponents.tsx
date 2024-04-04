import React from "react";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
const ApplyApprovedSection = dynamic(
  () => import("components/ApplyApprovedSection")
);
const ContactSection = dynamic(() => import("components/ContactSection"));
const FlexibilityTab = dynamic(() => import("components/FlexibilityTab"));
const HomeBuyerSection = dynamic(() => import("components/HomeBuyerSection"));
const MortgageAdvisor = dynamic(() => import("components/MortgageAdvisor"));
const MortgageFeaturedHome = dynamic(
  () => import("components/MortgageFeaturedHome")
);
const ServiceSection = dynamic(() => import("components/ServiceSection"));
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
const SplitImageRight = dynamic(() => import("../components/SplitImageRight"));

type Props = {
  teamData: any;
  featuredTextLeft: any;
  featuredTextRight: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  approvalRenovationData: any;
  sliders: any;
  meetings: any;
  advisorData: any;
  splitImagesRight: any;
  mortgageInterestData: any;
  splitImagesLeft: any;
  tabRenovationData: any;
  mortgageServiceData: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  tipsImageRight: any;
  homebuyerSectionData: any;
  contactData: any;
};

const HomeComponents = (props: Props) => {
  const {
    teamData,
    featuredTextLeft,
    featuredTextRight,
    featuredImageLeft,
    featuredImageRight,
    approvalRenovationData,
    sliders,
    meetings,
    advisorData,
    splitImagesRight,
    mortgageInterestData,
    splitImagesLeft,
    tabRenovationData,
    mortgageServiceData,
    tipsTitle,
    tipsDescription,
    tipsLeftText,
    tipsRightText,
    tipsImageLeft,
    tipsImageRight,
    homebuyerSectionData,
    contactData,
  } = props;
  return (
    <>
      <Meeting meetings={meetings} />
      <MortgageFeaturedHome advisorData={mortgageInterestData} />
      <MortgageAdvisor advisorData={advisorData} />
      <FlexibilityTab tabData={tabRenovationData} />
      <ApplyApprovedSection
        approvalRenovationData={approvalRenovationData}
        sliders={sliders}
      />
      <SplitImageLeft splitImagesLeft={splitImagesLeft} />
      <Team teams={teamData} />
      <HomeBuyerSection homebuyerData={homebuyerSectionData} />
      {/* <ServiceSection
        textLeft={featuredTextLeft}
        textRight={featuredTextRight}
        imageLeft={featuredImageLeft}
        imageRight={featuredImageRight}
      />
      <MortgageAdvisor advisorData={mortgageServiceData} />
      <Container
        className="mb-5 px-3 py-3"
        style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
      >
        <h2 className="text-center">{tipsTitle}</h2>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: tipsDescription,
          }}
        ></div>
      </Container>
      <ServiceSection
        textLeft={tipsLeftText}
        textRight={tipsRightText}
        imageLeft={tipsImageLeft}
        imageRight={tipsImageRight}
      /> */}
      <Container className="mb-5">
        <h2 className="text-center service-title">{contactData?.title}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: contactData?.description,
          }}
          className="text-lg text-start"
        ></div>
      </Container>
      <Container className="mt-5">
        <div className="my-5">
          <p className="text-center service-title">Contact Us</p>
        </div>
        <ContactSection />
      </Container>
    </>
  );
};

export default HomeComponents;
