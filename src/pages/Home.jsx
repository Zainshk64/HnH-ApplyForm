import { useState } from "react";
import { motion } from "framer-motion";
import UniversityCard from "../components/UniversityCard";
import FloatingApplyButton from "../components/FloatingApplyButton";
import { countryData } from "../data/countries";
import { GraduationCap, Users, CheckCircle, Globe, ArrowRight } from "lucide-react";
import ApplyModal from "./ApplyModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-[#EE7A36]" size={32} />
            <span className="sm:text-xl font-bold text-gray-900">
              H&H Visa Consultant
            </span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#EE7A36] cursor-pointer text-white font-semibold  px-3 py-2.5 rounded-full hover:bg-[#d96d2f] transition-all"
          >
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EE7A36]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EE7A36]/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="bg-orange-100 text-[#EE7A36] px-6 py-2 rounded-full text-sm font-semibold">
              🎓 #1 Visa Consultant in Pakistan
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight">
            Study Abroad with
            <br />
            <span className="text-[#EE7A36]">H&H Visa Consultant</span>
          </h1>

          <p className="text-md md:text-2xl mt-8 text-gray-600 max-w-3xl mx-auto">
            Your Gateway to World-Class Education in Canada, UK, USA, Germany,
            Australia & More
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-3">
              <div className="bg-[#EE7A36] p-3 rounded-full">
                <Users className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-gray-900">10,000+</p>
                <p className="text-sm text-gray-600">Students Placed</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#EE7A36] p-3 rounded-full">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Visa Success Rate</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-3">
              <div className="bg-[#EE7A36] p-3 rounded-full">
                <Globe className="text-white" size={24} />
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div> */}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-12 cursor-pointer bg-[#EE7A36] text-white font-bold sm:text-lg px-5 sm:px-10 py-5 rounded-full shadow-xl hover:shadow-2xl hover:bg-[#d96d2f] transition-all inline-flex items-center gap-3"
          >
            Start Your Journey Today
            <ArrowRight size={24} />
          </motion.button>
        </motion.div>
      </section>

      {/* University Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Top Universities Waiting for You
            </h2>
            <p className="text-xl text-gray-600">
              Explore world-class institutions and start your application today
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countryData.map((uni, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <UniversityCard
                  uni={uni}
                  onClick={() => setIsModalOpen(true)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <FloatingApplyButton onClick={() => setIsModalOpen(true)} /> */}
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
