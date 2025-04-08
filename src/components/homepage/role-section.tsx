import Image from "next/image"
import Link from "next/link"
import { Button } from "components/ui/button"

export default function RoleSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The Role We Play as Your Specialist Mortgage Brokers</h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Our mortgage professionals ensure your path to homeownership or mortgage refinancing is easy. We use our
            experience and local market knowledge to select the right solution for you no matter your credit score.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center items-center mb-16 mt-16">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-medium">1</div>
            </div>
            <div className="w-24 md:w-40 h-px bg-gray-300 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-medium text-gray-400">2</div>
            </div>
            <div className="w-24 md:w-40 h-px bg-gray-300 mx-4"></div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-medium text-gray-400">3</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-50 p-8 rounded-sm">
            <div className="flex justify-center mb-6">
              <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/role1.png" alt="Financial Assessment" width={48} height={48} />
            </div>
            <h3 className="text-xl font-medium text-center mb-4">Assessing Financial Situation</h3>
            <p className="text-gray-600 text-center">
              At first, we find out your current financial situation and credit score. We will help you access your
              income, expenses, and savings. This will help us understand your affordability and the amount of money you
              can borrow.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-sm">
            <div className="flex justify-center mb-6">
              <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/role2.png" alt="Mortgage Options" width={48} height={48} />
            </div>
            <h3 className="text-xl font-medium text-center mb-4">Exploring Mortgage Options</h3>
            <p className="text-gray-600 text-center">
              Once we understand your financial situation, we will look at different mortgage loan options. We will
              check out interest rates and terms before finding the best home loan option for you.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-sm">
            <div className="flex justify-center mb-6">
              <Image src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/04/role3.png" alt="Communication with Lenders" width={48} height={48} />
            </div>
            <h3 className="text-xl font-medium text-center mb-4">Communication with Lenders</h3>
            <p className="text-gray-600 text-center">
              We work as a middleman between you and the lenders. We communicate with financial institutions on your
              behalf. Also, we handle all your paperwork and discuss the terms of the home loan.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/apply">
            <Button className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-black font-medium px-12 py-6 rounded-none">
              Apply Now
            </Button>
          </Link>
          <Link href="/team">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-gray/900 hover:text-white px-12 py-6 rounded-none"
            >
              Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

