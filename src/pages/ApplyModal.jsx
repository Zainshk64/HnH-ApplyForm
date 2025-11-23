import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { visitCountries, uniqueStudyCountries } from "../data/countries";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ApplyModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [availableCountries, setAvailableCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    desiredCountry: "",
    visaType: "", // Changed from default "study" to empty
    urgency: "",
    degreeLevel: "",
    additionalNotes: "",
  });
  const base_url = "https://hhgooglesheet-production.up.railway.app"

  // Update available countries when visa type changes
  useEffect(() => {
    if (formData.visaType === 'visit') {
      setAvailableCountries(visitCountries);
    } else if (formData.visaType === 'study') {
      setAvailableCountries(uniqueStudyCountries);
    } else {
      setAvailableCountries([]);
    }
    
    // Reset country selection when visa type changes
    setFormData(prev => ({ ...prev, desiredCountry: "" }));
  }, [formData.visaType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.visaType) {
      toast.error("Please select a visa type to continue");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    // Updated validation to exclude degreeLevel for visit visa
    const requiredFields = ['name', 'email', 'phone', 'address', 'desiredCountry', 'urgency'];
    
    // Only require degree level for study visa
    if (formData.visaType === 'study') {
      requiredFields.push('degreeLevel');
    }
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill all required fields!");
      return;
    }

    const payload = { ...formData };
    
    try {
      const res = await fetch( `${base_url}/api/application/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Application Submitted Successfully! We'll contact you soon.", {
          duration: 5000,
          icon: "✅",
        });
        onClose();
        setStep(1);
        setFormData({
          name: "", email: "", phone: "", address: "",
          desiredCountry: "", visaType: "", urgency: "", degreeLevel: "bachelor", additionalNotes: ""
        });
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.",err);
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
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {step === 1 ? "What brings you here?" : "Complete Your Application"}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {step === 1 ? "Select your visa type to get started" : "Fill details – It's 100% Free"}
              </p>
            </div>
            <button onClick={onClose} className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition">
              <X size={26} className="text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {/* Step 1: Visa Type Only */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-6 text-center">
                    Choose Your Visa Type
                  </label>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {[
                      { value: "study", label: "Study Visa", desc: `${uniqueStudyCountries.length} countries available` },
                      { value: "visit", label: "Visit Visa", desc: `${visitCountries.length} countries available` },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className={`flex flex-col items-center justify-center gap-2 cursor-pointer p-10 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                          formData.visaType === item.value
                            ? "border-[#EE7A36] bg-orange-50 shadow-lg"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="visaType"
                          value={item.value}
                          checked={formData.visaType === item.value}
                          onChange={handleChange}
                          className="w-6 h-6 text-[#EE7A36]"
                        />
                        <span className="text-2xl font-bold text-gray-800">{item.label}</span>
                        <span className="text-sm text-gray-500">{item.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full cursor-pointer max-w-md mx-auto bg-[#EE7A36] hover:bg-[#d96d2f] text-white font-bold text-xl py-5 rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-xl"
                >
                  Continue
                  <ArrowRight size={28} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Full Form */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Back button */}
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 mb-4"
                >
                  ← Back to Visa Type
                </button>

                {/* Display selected visa type */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <span className="text-sm font-medium text-gray-700">Selected Visa Type: </span>
                  <span className="text-sm font-bold text-[#EE7A36] capitalize">{formData.visaType} Visa</span>
                </div>

                {/* Form fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
                  </div>
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="2"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Where do you want to go? * 
                    <span className="text-xs text-gray-500 ml-2">
                      ({availableCountries.length} countries available for {formData.visaType} visa)
                    </span>
                  </label>
                  <select 
                    name="desiredCountry" 
                    value={formData.desiredCountry} 
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EE7A36]"
                  >
                    <option value="">Select Country</option>
                    {availableCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Only show degree level for study visa */}
                {formData.visaType === 'study' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Interested Degree Level *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Bachelor", "Master"].map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer bg-gray-50 px-5 py-3 rounded-xl border-2 border-gray-200 hover:border-[#EE7A36] transition">
                          <input
                            type="radio"
                            name="degreeLevel"
                            value={level.toLowerCase()}
                            checked={formData.degreeLevel === level.toLowerCase()}
                            onChange={handleChange}
                            className="w-5 h-5 text-[#EE7A36]"
                          />
                          <span className="font-medium">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes (Optional)</label>
                  <textarea 
                    name="additionalNotes" 
                    value={formData.additionalNotes} 
                    onChange={handleChange} 
                    rows="4"
                    placeholder={formData.visaType === 'study' 
                      ? "Any specific university, budget, IELTS score, etc..." 
                      : "Purpose of visit, duration, special requirements, etc..."}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#EE7A36]" 
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full cursor-pointer bg-[#EE7A36] hover:bg-[#d96d2f] text-white font-bold text-lg py-5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Submit Application – It's Free!
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}