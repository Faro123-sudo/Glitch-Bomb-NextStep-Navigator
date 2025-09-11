import React from "react";
import data from "../data/careerData.json";

export default function SuccessStories() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Success Stories</h1>
      <div className="space-y-4">
        {data.successStories.map((story) => (
          <div key={story.id} className="border p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">{story.name}</h2>
            <p><strong>Career:</strong> {story.career}</p>
            <p>{story.story}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
