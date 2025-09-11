import React from "react";
import data from "../data/careerData.json";

export default function MultimediaGuidance() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Multimedia Guidance</h1>
      
      <h2 className="text-lg font-semibold">Videos</h2>
      <ul className="list-disc ml-6 mb-4">
        {data.multimediaGuidance.videos.map((video) => (
          <li key={video.id}>
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {video.title}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">Podcasts</h2>
      <ul className="list-disc ml-6">
        {data.multimediaGuidance.podcasts.map((podcast) => (
          <li key={podcast.id}>
            <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {podcast.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
