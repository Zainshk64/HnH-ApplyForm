import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function UniversityCard({ uni, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(238, 122, 54, 0.18)" }}
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={uni.university_image}
          alt={uni.university_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-[#EE7A36] text-sm font-bold">{uni.country}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-[#EE7A36] transition-colors">
          {uni.university_name}
        </h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{uni.program_name}</p>

        <div className="mt-3 text-sm text-gray-500 font-medium">
          {uni.degree_level} • {uni.duration}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {uni.tags.split(", ").map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-orange-50 text-[#EE7A36] px-3 py-1.5 rounded-full font-semibold border border-orange-200"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#EE7A36]">{uni.tuition_first_year}</p>
            <p className="text-xs text-gray-500 font-medium">First Year</p>
          </div>
          <button className="bg-[#EE7A36] cursor-pointer text-white font-bold px-3 sm:px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#e06b1f] transition-all transform hover:scale-105 shadow-md">
            Apply Now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}