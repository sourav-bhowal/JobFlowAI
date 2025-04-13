"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";

// Hero Tiles Component
export default function HeroTiles() {
  // State for the percentage
  const [percentage, setPercentage] = useState(0);

  // State for the jobs daily
  const [jobsDaily, setJobsDaily] = useState(0);

  // State for the faster matches
  const [fasterMatches, setFasterMatches] = useState(0);

  // Animation setup
  useEffect(() => {
    gsap.to(
      {},
      {
        duration: 2,
        onUpdate: function () {
          setPercentage(Math.round(this.progress() * 90)); // Set the percentage value to 97
          setJobsDaily(Math.round(this.progress() * 100)); // Set the jobs daily value to 1000
          setFasterMatches(Math.round(this.progress() * 3)); // Set the faster matches value to 10
        },
      }
    );
  }, []);

  // Return the Hero Tiles
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="rounded-lg bg-neutral-900 p-8 backdrop-blur-sm">
        <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          {percentage}%
        </div>
        <div className="mt-2 text-lg">Match Accuracy</div>
      </div>
      <div className="rounded-lg bg-neutral-900 p-8 backdrop-blur-sm">
        <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          {jobsDaily}+
        </div>
        <div className="mt-2 text-lg">Jobs Daily</div>
      </div>
      <div className="rounded-lg bg-neutral-900 p-8 backdrop-blur-sm">
        <div className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          {fasterMatches}x
        </div>
        <div className="mt-2 text-lg">Faster Matches</div>
      </div>
    </div>
  );
}
