import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [scripts, setScripts] = useState([]);

    useEffect(() => {
        fetchScripts();
    }, []);

    const fetchScripts = async () => {
        try {
            const res = await API.get("my-scripts/");
            setScripts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center">
                My Saved Scripts
            </h1>

            <div className="space-y-4">
                {scripts.length === 0 ? (
                    <p className="text-center text-gray-400">
                        No scripts saved yet
                    </p>
                ) : (
                    scripts.map((s) => (
                        <div
                            key={s.id}
                            className="bg-zinc-800 p-4 rounded-xl shadow"
                        >
                            <h2 className="text-xl font-bold">
                                {s.title}
                            </h2>

                            <p className="text-sm text-gray-400">
                                Topic: {s.topic}
                            </p>

                            <p className="mt-2">
                                <b>Hook:</b> {s.hook}
                            </p>

                            <p>
                                <b>CTA:</b> {s.cta}
                            </p>

                            <p>
                                <b>Hashtags:</b> {s.hashtags}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;