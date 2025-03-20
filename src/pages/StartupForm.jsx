import { useState } from "react";
import { analyzeStartupData } from "../backend/formAnalyser.js";

const StartupForm = () => {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    startupStage: "",
    businessModel: "",
    description: "",
    website: "",
  });

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "E-commerce",
    "AI",
    "Education",
    "Agriculture",
    "Real Estate",
    "Gaming",
    "Logistics",
    "Social Media",
    "Sustainability",
    "Cybersecurity",
    "Biotech",
    "Food & Beverages",
    "Other",
  ];

  const startupStages = [
    "Idea Stage",
    "Prototype Ready",
    "MVP Ready",
    "Early Revenue",
    "Scaling",
    "Established Business",
  ];

  const businessModels = [
    "B2B",
    "B2C",
    "D2C",
    "SaaS",
    "Marketplace",
    "Subscription",
    "Freemium",
    "On-Demand Service",
    "Advertising-Based",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before API call

    try {
      const mentors = await analyzeStartupData(formData);
      setResults(mentors);
    } catch (err) {
      setError("Failed to fetch mentor recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      {/* Progress Bar */}
      <div className="flex mb-6">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
              step >= s ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Startup Name */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              What’s your Startup Name?
            </h2>
            <input
              type="text"
              name="startupName"
              value={formData.startupName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter startup name"
            />
          </div>
        )}

        {/* Step 2: Industry Focus */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              What industry is your startup in?
            </h2>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Industry</option>
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 3: Startup Stage & Business Model */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              Select your Startup Stage
            </h2>
            <select
              name="startupStage"
              value={formData.startupStage}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Stage</option>
              {startupStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>

            <h2 className="text-xl font-bold mt-4 mb-2">
              Select Business Model
            </h2>
            <select
              name="businessModel"
              value={formData.businessModel}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Model</option>
              {businessModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Step 4: Detailed Description */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Describe your startup</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 h-32 focus:ring-2 focus:ring-blue-400"
              placeholder="Briefly describe your startup’s vision, goals, and impact..."
            />
          </div>
        )}

        {/* Step 5: Website Link (Optional) */}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-bold mb-2">
              Startup Website (Optional)
            </h2>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter website URL"
            />
          </div>
        )}

        {/* Step 6: Review & Submit */}
        {step === 6 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Review Your Information</h2>
            <p>
              <strong>Startup Name:</strong> {formData.startupName || "N/A"}
            </p>
            <p>
              <strong>Industry:</strong> {formData.industry || "N/A"}
            </p>
            <p>
              <strong>Startup Stage:</strong> {formData.startupStage || "N/A"}
            </p>
            <p>
              <strong>Business Model:</strong> {formData.businessModel || "N/A"}
            </p>
            <p>
              <strong>Description:</strong> {formData.description || "N/A"}
            </p>
            <p>
              <strong>Website:</strong> {formData.website || "N/A"}
            </p>
          </div>
        )}

        {/* Buttons for Navigation */}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
      {results.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-2">
            Recommended Mentors (India 🇮🇳)
          </h2>
          <ul className="space-y-3">
            {results.map((mentor, index) => (
              <li
                key={index}
                className="p-3 bg-white shadow-md rounded-lg flex flex-col gap-2"
              >
                <p className="font-semibold">{mentor.name}</p>
                <p className="text-sm text-gray-600">{mentor.description}</p>
                <a
                  href={mentor.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm text-center"
                >
                  Open LinkedIn Profile
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StartupForm;
