import Link from "next/link"
import { Button } from "components/ui/button"

export default function CtaSection() {
  return (
    <section className="w-full bg-[#FFFFC8] py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Start Your Application and Get Approved Quickly!</h2>
            <p className="text-gray-600 mb-8">
              Are you a resident of British Columbia looking for a loan? Our hassle-free and obligation-free application
              process takes less than a minute to complete.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <Link href="/apply">
              <Button className="bg-[#070819] hover:bg-[#070819]/90 text-white font-medium px-10 py-3 text-base mb-4 rounded-sm">
                Apply Now
              </Button>
            </Link>
            <p className="text-2xl font-bold text-[#070819]">+1 604-591-3590</p>
          </div>
        </div>
      </div>
    </section>
  )
}
