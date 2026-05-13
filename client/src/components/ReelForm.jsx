import API from "../services/api";
import { useState } from "react";

function ReelForm() {
    const [formData, setFormData] = useState({
        topic: "",
        niche: "",
        platform: "",
        style: "",
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("generate/", formData);

            // ✅ IMPORTANT FIX: store only result object
            setResult(response.data);

            console.log("API Response:", response.data);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-2xl">

            <h2 className="text-3xl font-bold mb-6 text-center">
                Generate Reel Script
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                <input
                    type="text"
                    name="topic"
                    placeholder="Enter Topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
                />

                <input
                    type="text"
                    name="niche"
                    placeholder="Enter Niche"
                    value={formData.niche}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
                />

                <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
                >
                    <option value="">Select Platform</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="TikTok">TikTok</option>
                </select>

                <select
                    name="style"
                    value={formData.style}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
                >
                    <option value="">Select Style</option>
                    <option value="Motivational">Motivational</option>
                    <option value="Funny">Funny</option>
                    <option value="Educational">Educational</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
                >
                    Generate Script
                </button>
            </form>

            {/* RESULT SECTION */}
            {result && (
                <div className="mt-8 bg-zinc-800 p-5 rounded-xl space-y-4">

                    <div>
                        <h3 className="font-bold text-xl">Title</h3>
                        <p>{result?.title}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">Hook</h3>
                        <p>{result?.hook}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">Script</h3>
                        <p>{result?.script}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">CTA</h3>
                        <p>{result?.cta}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">Hashtags</h3>
                        <p>{result?.hashtags}</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default ReelForm;