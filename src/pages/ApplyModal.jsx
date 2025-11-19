import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { countriesList } from "../data/countries";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    desiredCountry: "",
    visaType: "study",
    urgency: "",
    degreeLevel: "bachelor", // ← NEW FIELD
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Required validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.desiredCountry ||
      !formData.urgency ||
      !formData.degreeLevel
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      desiredCountry: formData.desiredCountry,
      visaType: formData.visaType,
      urgency: formData.urgency,
      degreeLevel: formData.degreeLevel, // ← Sent to backend
      additionalNotes: formData.additionalNotes.trim(),
    };

    try {
      const res = await fetch("https://your-api.com/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Application Submitted Successfully! We’ll contact you soon.", {
          duration: 5000,
          icon: "✅",
        });
        onClose();
        setFormData({
          name: "", email: "", phone: "", address: "",
          desiredCountry: "", visaType: "study", urgency: "", degreeLevel: "", additionalNotes: ""
        });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Apply Now</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Get Free Consultation & Visa Assistance</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X size={26} className="text-gray-600" />
            </button>
          </div>

          

          <div className="p-8 space-y-6">
               {/* Visa Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Visa Type *</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-[#EE7A36] transition flex-1 min-w-[140px]">
                  <input type="radio" name="visaType" value="study" checked={formData.visaType === "study"} onChange={handleChange} className="w-5 h-5 text-[#EE7A36]" />
                  <span className="font-medium">Study Visa</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer bg-gray-50 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-[#EE7A36] transition flex-1 min-w-[140px]">
                  <input type="radio" name="visaType" value="visit" checked={formData.visaType === "visit"} onChange={handleChange} className="w-5 h-5 text-[#EE7A36]" />
                  <span className="font-medium">Visit Visa</span>
                </label>
              </div>
            </div>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
            </div>

            {/* Phone & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+92 300 1234567"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows="3" placeholder="House no, Street, City..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
            </div>

            {/* Desired Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Where do you want to go? *</label>
              <select name="desiredCountry" value={formData.desiredCountry} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]">
                <option value="">Select Country</option>
                {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Degree Level - NEW FIELD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Interested Degree Level *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {["Bachelor", "Master",].map((level) => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer bg-gray-50 px-5 py-3 rounded-xl border-2 border-gray-200 hover:border-[#EE7A36] transition">
                    <input
                      type="radio"
                      name="degreeLevel"
                      value={level.toLowerCase()}
                      checked={formData.degreeLevel === level.toLowerCase()}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#EE7A36]"
                    />
                    <span className="font-medium text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

         

            {/* Urgency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">How soon do you want to go? *</label>
              <select name="urgency" value={formData.urgency} onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]">
                <option value="">Select timeline</option>
                <option value="within-3-months">Within 3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="6-12-months">6-12 months</option>
                <option value="just-exploring">Just exploring</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
              <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} rows="4"
                placeholder="Any specific university, budget, IELTS score, etc..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#EE7A36] hover:bg-[#d96d2f] text-white font-bold text-lg py-5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Submit Application – It's Free!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}