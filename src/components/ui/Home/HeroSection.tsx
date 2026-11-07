
import Link from "next/link"
import { ArrowRight, HeartHandshake, Users } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="bg-[#F5F8F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <HeartHandshake size={18} />
              Together For A Better Community
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#102A43] leading-tight">
              Small Actions,
              <span className="block text-[#087F5B]">
                Big Changes.
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-base md:text-lg leading-8 max-w-lg">
              Connect with people in your local community, join meaningful
              social events, and make a positive difference together.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/upcoming-events"
                className="inline-flex items-center gap-2 bg-[#087F5B] hover:bg-[#066747] text-white px-6 py-3.5 rounded-xl font-semibold transition"
              >
                Explore upcoming Events
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 border border-[#087F5B] text-[#087F5B] hover:bg-emerald-50 px-6 py-3.5 rounded-xl font-semibold transition"
              >
                Create Event
              </Link>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Users className="text-[#087F5B]" size={23} />
              </div>
              <div>
                <p className="font-bold text-[#102A43]">
                  Together We Can
                </p>
                <p className="text-sm text-gray-500">
                  Build a stronger community
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div
              className="w-full h-[350px] md:h-[470px] rounded-3xl bg-cover bg-center shadow-xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000')",
              }}
            />

            <div className="absolute -bottom-5 -left-3 md:-left-7 bg-white p-5 rounded-2xl shadow-lg max-w-[230px]">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <HeartHandshake className="text-emerald-700" size={22} />
                </div>
                <div>
                  <p className="font-bold text-[#102A43]">
                    Make An Impact
                  </p>
                  <p className="text-xs text-gray-500">
                    Be part of the change
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
