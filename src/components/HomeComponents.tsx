import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
const ApplyApprovedSection = dynamic(
  () => import("components/ApplyApprovedSection")
);
const ContactSection = dynamic(() => import("components/ContactSection"));
const FlexibilityTab = dynamic(() => import("components/FlexibilityTab"));
const HomeBuyerSection = dynamic(() => import("components/HomeBuyerSection"));
const MortgageAdvisorHome = dynamic(() => import("components/MortgageAdvisorHome"));
const MortgageFeaturedHomePage = dynamic(
  () => import("components/MortgageFeaturedHomePage")
);
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
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
    approvalRenovationData,
    sliders,
    meetings,
    advisorData,
    mortgageInterestData,
    splitImagesLeft,
    tabRenovationData,
    homebuyerSectionData,
    contactData,
  } = props;
  return (
    <>
      <MortgageFeaturedHomePage advisorData={mortgageInterestData} />
      <MortgageAdvisorHome advisorData={advisorData} />
      {/* <FlexibilityTab tabData={tabRenovationData} /> */}
      <Meeting meetings={meetings} />
      <ApplyApprovedSection
        approvalRenovationData={approvalRenovationData}
        sliders={sliders}
      />
      <SplitImageLeft splitImagesLeft={splitImagesLeft} />
      {/* <Team teams={teamData} /> */}
      <HomeBuyerSection homebuyerData={homebuyerSectionData} />
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
