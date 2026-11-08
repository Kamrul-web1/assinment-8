
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const companyLinks = [
    "About Us",
    "Our Mission",
    "Our Team",
    "Contact Us",
  ];

  const activityLinks = [
    "Winter Clothes Distribution",
    "Blanket Distribution",
    "Food Donation",
    "Community Support",
  ];

  const informationLinks = [
    "How It Works",
    "Create an Event",
    "Join Events",
    "FAQs",
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook" },
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaLinkedinIn, label: "LinkedIn" },
    { icon: FaTwitter, label: "Twitter" },
  ];

  return (
    <footer className="w-full mt-20">

      {/* Main Footer */}
      <div className="relative bg-[#16A34A] text-white">

        {/* Wave */}
        <div className="absolute bottom-full left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            className="block w-full h-[70px] sm:h-[100px] md:h-[140px] lg:h-[160px]"
          >
            <path
              d="M0,100 C300,240 470,170 720,90 C1000,-10 1180,-10 1440,100 L1440,180 L0,180 Z"
              fill="#16A34A"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-6 pt-10 sm:pt-14 md:pt-20 pb-10">

          {/* Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-10 sm:gap-y-12">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Social<span className="text-green-200">Care.</span>
                </h2>
              </Link>

              <p className="text-white/85 text-sm leading-7 max-w-sm">
                Together, we can make a difference. Join hands with
                your community to organize social events, support
                people in need, and create a better tomorrow.
              </p>

              <div className="flex items-center gap-5 mt-5">
                {socialLinks.map(({ icon: Icon, label }) => (
                  <Link
                    key={label}
                    href="#"
                    aria-label={label}
                    className="hover:text-green-200 hover:-translate-y-1 transition-all duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-5">
                Company
              </h3>

              <ul className="space-y-3 text-sm text-white/85">
                {companyLinks.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-green-200 transition"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-5">
                Our Activities
              </h3>

              <ul className="space-y-3 text-sm text-white/85">
                {activityLinks.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="flex items-start gap-1.5 hover:text-green-200 transition"
                    >
                      <ChevronRight
                        size={15}
                        className="shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-5">
                Information
              </h3>

              <ul className="space-y-3 text-sm text-white/85">
                {informationLinks.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="flex items-start gap-1.5 hover:text-green-200 transition"
                    >
                      <ChevronRight
                        size={15}
                        className="shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Contact Info */}
          <div className="border-t border-white/20 mt-10 sm:mt-12 pt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <div className="flex items-center gap-2 text-sm text-white/85 min-w-0">
              <Mail size={17} className="shrink-0" />
              <span className="break-all">support@socialcare.com</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/85">
              <MapPin size={17} className="shrink-0" />
              <span>Serving Communities Across Bangladesh</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white/85">
              <Heart size={16} className="shrink-0 fill-white" />
              <span>Made with Love for Humanity</span>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#18181B] text-white py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center">

          <p className="text-xs sm:text-sm text-white/70">
            © {new Date().getFullYear()} SocialCare. All Rights Reserved.
          </p>

          <p className="text-xs sm:text-sm text-white/70">
            Together We Make A{" "}
            <span className="text-green-500 font-semibold">
              Difference.
            </span>
          </p>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
