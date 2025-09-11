import React from "react";
import data from "../data/careerData.json";

export default function CareerBank() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Career Bank</h1>
      <ul className="space-y-4">
        {data.careerBank.map((career) => (
          <li key={career.id} className="border p-4 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">{career.careerName}</h2>
            <p>{career.description}</p>
            <p><strong>Skills:</strong> {career.skillsRequired.join(", ")}</p>
            <p><strong>Salary:</strong> {career.averageSalary}</p>
            <p><strong>Education:</strong> {career.educationPath}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
