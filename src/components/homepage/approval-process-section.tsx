import Image from "next/image";

export default function ApprovalProcessSection({
  approvalSection,
}: {
  approvalSection?: any;
}) {
  const defaultContent =
  [
  {
    "type": "Page_Homelandingpage_ApprovalSection_processes",
    "title": "Organizing Financial Documents",
    "description": "<p>Our mortgage agent will help you gather all the financial documents. They include tax returns, pay stubs from the last two years, and bank statements.</p>\n"
  },
  {
    "type": "Page_Homelandingpage_ApprovalSection_processes",
    "title": "Addressing Credit Concerns",
    "description": "<p>If you have any concerns related to your credit history, we can address them together. We review your credit report, identify any issues, and provide you with a solution.</p>\n"
  },
  {
    "type": "Page_Homelandingpage_ApprovalSection_processes",
    "title": "Anticipating Potential Hurdles",
    "description": "<p>Any kind of challenge could come at any time during the mortgage process. You can rely on our expertise to navigate any complexities with confidence and ease.</p>\n"
  },
  {
    "type": "Page_Homelandingpage_ApprovalSection_processes",
    "title": "Mortgage Application",
    "description": "<p>Our online mortgage broker helps you with the application. We submit all the necessary information. We&#8217;ll also be there to answer any questions along the way.</p>\n"
  }
];
  return (
    <section className="relative text-white py-16 px-4 h-full w-full md:px-8 overflow-hidden min-h-[850px] flex flex-col justify-center items-center">
      {/* Background image with overlay */}
      <Image
        src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/service-bg-2.webp?height=1080&width=1920"
        alt="Background"
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      {/* Overlay div to handle the blend mode */}
      <div className="absolute inset-0 mix-blend-overlay" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-xl md:text-2xl xl:text-4xl space-y-5 font-bold font-oswald">
              Our Mortgage Approval
              <br />
              Process
            </h2>
          </div>

          <div>
            <p
              className="text-white/80 text-lg"
              dangerouslySetInnerHTML={{
                __html:
                  approvalSection?.description ||
                  `The application journey might be a little difficult, but we make it simple and easy for you. Preparation
              is key to a successful application, and here&apos;s how we&apos;ll help you get ready:`,
              }}
            ></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {(approvalSection?.processes
            ? approvalSection.processes
            : defaultContent
          )?.map((step: any, index: number) => (
            <div key={index} className="space-y-4">
              <div className="mb-4">
                <span className="text-5xl font-bold">{index + 1}.</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-oswald">
                {step.title}
              </h3>
              <p className="text-white/80" dangerouslySetInnerHTML={{ __html: step.description }}></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
