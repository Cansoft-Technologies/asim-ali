import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
import ApplyApprovedLoc from "./ApplyApprovedLoc";
import CategoryTabs from "./CatagoryTabs";
import HomeBuyerLoc from "./HomebuyerLoc";
const ContactSection = dynamic(() => import("components/ContactSection"));
const MortgageAdvisorHome = dynamic(() => import("components/MortgageAdvisorHome"));
const MortgageFeaturedHomePage = dynamic(
  () => import("components/MortgageFeaturedHomePage")
);

const Meeting = dynamic(() => import("components/Meeting"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
type Props = {
  teamData: any;
  planData: any;
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
    planData,
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
      <ApplyApprovedLoc
        approvalRenovationData={approvalRenovationData}
        sliders={sliders}
      />
      <SplitImageLeft splitImagesLeft={splitImagesLeft} />
      {/* <Team teams={teamData} /> */}
      <HomeBuyerLoc homebuyerData={homebuyerSectionData} />
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
        <ContactSection />
        <div className="my-5">
          <CategoryTabs planData={planData} />
        </div>
      </Container>
    </>
  );
};

export default HomeComponents;
