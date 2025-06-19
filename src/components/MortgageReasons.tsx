import React from 'react';
import { Triangle, TriangleIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// --- TYPE DEFINITIONS ---
interface ReasonCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  className?: string;
}

// --- SVG ICON COMPONENTS ---
// These are custom SVG components crafted to match the style in the image.

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2C8.686 2 6 4.686 6 8v4h12V8c0-3.314-2.686-6-6-6z" />
    <path d="M12 12v8" />
    <path d="M8 20h8" />
    <path d="M5 10H3a1 1 0 00-1 1v2a1 1 0 001 1h2" />
    <path d="M19 10h2a1 1 0 011 1v2a1 1 0 01-1 1h-2" />
  </svg>
);

const ChecklistIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 2v4" />
    <path d="M15 2v4" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 22h16" />
    <path d="M2 18.5l10-6 10 6" />
    <path d="M3 12v6" />
    <path d="M8 12v6" />
    <path d="M13 12v6" />
    <path d="M18 12v6" />
    <path d="M21 12.5v-2.5l-9-5.4-9 5.4v2.5" />
  </svg>
);

const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5C9.239 5 7 7.239 7 10c0 2.247 1.442 4.148 3.407 4.793" />
    <path d="M17 10c0-2.761-2.239-5-5-5" />
    <path d="M4.537 11.968A7.99 7.99 0 004 14c0 4.418 3.582 8 8 8s8-3.582 8-8c0-.337-.021-.67-.062-1" />
    <path d="M12 14.793v.012A2.75 2.75 0 0014.75 12h.013A2.75 2.75 0 0012 9.237v-.012" />
    <path d="M14 18a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);


// --- CENTRAL GRAPHIC COMPONENT ---
// This SVG creates the central pencil-like graphic and connecting lines.
// It's designed to be responsive and align with the grid layout.

const CentralPencilGraphic: React.FC = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-center">
    <div className="absolute inset-0 z-1 left-[225px] top-[300px]">
      <div className="relative inset-0 bg-black border border-black rotate-90 h-[10px] w-[400px]"></div>
    <div className="relative inset-0 border border-black rotate-90 h-[10px] w-[400px] ml-5"></div>
    <div className="relative inset-0 border border-black rotate-90 h-[10px] w-[400px] ml-10"></div>
    </div>
    <div className="absolute inset-0 z-1 left-[225px] top-[300px]">
      <div className="relative"><FontAwesomeIcon icon={faPlay} className="text-black w-[100px] h-[100px]"/></div>
    </div>
  </div>
);


// --- REASON CARD COMPONENT ---
// This component displays each of the four reasons with an icon, title, and description.

const ReasonCard: React.FC<ReasonCardProps> = ({ icon: Icon, title, description, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg border-4 border-brand-navy ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-brand-navy">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold text-brand-gold">
            {title}
          </h3>
          <p className="mt-2 text-brand-gold">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---

const reasonsData = [
  {
    id: 1,
    icon: TrophyIcon,
    title: "Award-Winning Recognition",
    description: "Top 75 brokers in Canada, award-winning since 2019.",
    gridPosition: "col-start-1 row-start-1"
  },
  {
    id: 2,
    icon: ChecklistIcon,
    title: "Efficient Approval Process",
    description: "Fast, smooth approval process for quick mortgage access.",
    gridPosition: "col-start-2 row-start-1"
  },
  {
    id: 3,
    icon: BankIcon,
    title: "Extensive Lender Network",
    description: "Working with 300+ lenders for optimal mortgage options.",
    gridPosition: "col-start-1 row-start-2"
  },
  {
    id: 4,
    icon: BrainIcon,
    title: "Expertise in Complex Cases",
    description: "Handling challenging cases with tailored mortgage solutions.",
    gridPosition: "col-start-2 row-start-2"
  },
];

const MortgageReasons = () => {
  return (
    <div className="bg-brand-navy min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-gold text-center">
          Reasons to Choose Our Mortgage Brokers
        </h2>
        
        <div className="relative mt-12 lg:mt-16">
          {/* This is a simplified SVG graphic. A more accurate one is below */}
          {/* <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="none" className="opacity-70">
              <defs>
                <g id="line-group">
                  <path d="" stroke="white" strokeWidth="1.5" />
                  <path d="" stroke="white" strokeWidth="1.5" transform="translate(3,0)" />
                  <path d="" stroke="white" strokeWidth="1.5" transform="translate(-3,0)" />
                </g>
              </defs>
              <path d="M 200 375 L 192 360 L 208 360 Z" fill="white" stroke="#101844" strokeWidth="1" />
              <path d="M 200 360 Q 125 285, 50 150 M 198 360 Q 123 285, 48 150 M 202 360 Q 127 285, 52 150" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 200 360 Q 275 285, 350 150 M 198 360 Q 273 285, 348 150 M 202 360 Q 277 285, 352 150" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 200 360 Q 125 435, 50 500 M 198 360 Q 123 435, 48 500 M 202 360 Q 127 435, 52 500" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 200 360 Q 275 435, 350 500 M 198 360 Q 273 435, 348 500 M 202 360 Q 277 435, 352 500" fill="none" stroke="white" strokeWidth="1" />
            </svg>
          </div> */}
          <CentralPencilGraphic/>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="flex flex-col gap-y-8 md:mt-16">
                <ReasonCard 
                  icon={reasonsData[0].icon} 
                  title={reasonsData[0].title} 
                  description={reasonsData[0].description}
                />
                <ReasonCard 
                  icon={reasonsData[2].icon} 
                  title={reasonsData[2].title} 
                  description={reasonsData[2].description}
                />
              </div>
              <div className="flex flex-col gap-y-8">
                 <ReasonCard 
                  icon={reasonsData[1].icon} 
                  title={reasonsData[1].title} 
                  description={reasonsData[1].description}
                />
                <ReasonCard 
                  icon={reasonsData[3].icon} 
                  title={reasonsData[3].title} 
                  description={reasonsData[3].description}
                />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageReasons;