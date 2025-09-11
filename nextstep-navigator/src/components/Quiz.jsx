import React from "react";
import data from "../data/careerData.json";

export default function Quiz() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Career Quiz</h1>
      <div className="space-y-6">
        {data.quizQuestions.map((q) => (
          <div key={q.id} className="border p-4 rounded-xl shadow-sm">
            <p className="font-medium">{q.question}</p>
            <ul className="list-disc ml-6 mt-2">
              {q.options.map((option, i) => (
                <li key={i}>
                  {option} - {q.answersMapping[option]}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
