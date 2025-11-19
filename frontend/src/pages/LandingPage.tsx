import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

export default function LandingPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center px-4">
      <div className="text-center text-white space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <img src={icon} alt="PocketMind Logo" className="w-16 h-16" />
          <h1 className="text-4xl font-bold tracking-wide mt-2">PocketMind</h1>
        </div>

        <p className="max-w-md text-lg opacity-90 mx-auto">
          Store what matters. Save links from platforms like YouTube, Twitter,
          LinkedIn, and more in one clean space.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            to="/register"
            className="px-8 py-3 bg-white text-emerald-700 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 border border-white text-white rounded-xl font-semibold hover:bg-white hover:text-emerald-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
