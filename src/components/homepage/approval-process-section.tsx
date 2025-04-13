import Image from "next/image"

export default function ApprovalProcessSection() {
  return (
    <section className="relative text-white py-16 px-4 h-full w-full md:px-8 overflow-hidden min-h-[850px] flex flex-col justify-center items-center">
      {/* Background image with overlay */}
      <Image
          src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/service-bg.png?height=1080&width=1920"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Overlay div to handle the blend mode */}
        <div 
          className="absolute inset-0 mix-blend-overlay" 
          aria-hidden="true"
        />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-4xl md:text-7xl xl:text-7xl font-bold font-oswald">
              Our Mortgage Approval
              <br />
              Process
            </h2>
          </div>

          <div>
            <p className="text-white/80 text-lg">
              The application journey might be a little difficult, but we make it simple and easy for you. Preparation
              is key to a successful application, and here&apos;s how we&apos;ll help you get ready:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div>
            <div className="mb-4">
              <span className="text-5xl font-bold">1.</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-oswald">Organizing Financial Documents</h3>
            <p className="text-white/80">
              Our mortgage agent will help you gather all the financial documents. They include tax returns, pay stubs
              from the last two years, and bank statements.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-5xl font-bold">2.</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-oswald">Addressing Credit Concerns</h3>
            <p className="text-white/80">
              If you have any concerns related to your credit history, we can address them together. We review your
              credit report, identify any issues, and provide you with a solution.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-5xl font-bold">3.</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-oswald">Anticipating Potential Hurdles</h3>
            <p className="text-white/80">
              Any kind of challenge could come at any time during the mortgage process. You can rely on our expertise to
              navigate any complexities with confidence and ease.
            </p>
          </div>

          <div>
            <div className="mb-4">
              <span className="text-5xl font-bold">4.</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 font-oswald">Mortgage Application</h3>
            <p className="text-white/80">
              Our online mortgage broker helps you with the application. We submit all the necessary information. We&apos;ll
              also be there to answer any questions along the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
