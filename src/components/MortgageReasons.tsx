// components/MortgageReasons.tsx
import { FaTrophy, FaUniversity, FaClipboardCheck, FaPuzzlePiece } from "react-icons/fa";

const reasons = [
  {
    title: "Award-Winning Recognition",
    icon: <FaTrophy className="text-2xl text-gold-500" />,
    description: "Top 75 brokers in Canada, award-winning since 2019.",
    position: "left",
  },
  {
    title: "Efficient Approval Process",
    icon: <FaClipboardCheck className="text-2xl text-indigo-500" />,
    description: "Fast, smooth approval process for quick mortgage access.",
    position: "right",
  },
  {
    title: "Extensive Lender Network",
    icon: <FaUniversity className="text-2xl text-blue-500" />,
    description: "Working with 300+ lenders for optimal mortgage options.",
    position: "left",
  },
  {
    title: "Expertise in Complex Cases",
    icon: <FaPuzzlePiece className="text-2xl text-red-500" />,
    description: "Handling challenging cases with tailored mortgage solutions.",
    position: "right",
  },
];

export default function MortgageReasons() {
  return (
    <section className="bg-[#0B0D3A] py-16 text-white font-sans">
      <h2 className="text-center text-3xl font-semibold mb-12">
        Reasons to Choose Our Mortgage Brokers
      </h2>

      <div className="relative flex justify-center">
        {/* Pencil Divider */}
        <div className="w-2 bg-white h-[500px] relative z-0 rounded-full">
          {/* Pencil Tip */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-b-8 border-b-slate-900 border-l-8 border-l-white border-solid" />
        </div>

        {/* Cards */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl flex flex-col gap-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`flex justify-${reason.position === "left" ? "start" : "end"} w-full px-4`}
            >
              <div className="bg-white text-[#0B0D3A] rounded-md p-6 max-w-md shadow-lg w-full">
                <div className="flex items-center gap-3 mb-2">
                  {reason.icon}
                  <h3 className="text-lg font-bold">{reason.title}</h3>
                </div>
                <p className="text-sm">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
