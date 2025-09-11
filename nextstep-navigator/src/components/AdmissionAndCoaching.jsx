import React from "react";
import data from "../data/careerData.json";

export default function AdmissionAndCoaching() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admission & Coaching</h1>
      <ul className="space-y-4">
        {data.admissionAndCoaching.guidanceTopics.map((topic) => (
          <li key={topic.id} className="border p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold">{topic.title}</h2>
            <p>{topic.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
