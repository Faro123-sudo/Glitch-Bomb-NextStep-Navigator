import React from "react";
import data from "../data/careerData.json";

export default function ResourceLibrary() {
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resource Library</h1>

      <h2 className="text-lg font-semibold">Articles</h2>
      <ul className="list-disc ml-6 mb-4">
        {data.resourceLibrary.articles.map((article) => (
          <li key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">E-books</h2>
      <ul className="list-disc ml-6 mb-4">
        {data.resourceLibrary.ebooks.map((ebook) => (
          <li key={ebook.id}>
            <a href={ebook.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {ebook.title}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold">Webinars</h2>
      <ul className="list-disc ml-6">
        {data.resourceLibrary.webinars.map((webinar) => (
          <li key={webinar.id}>
            {webinar.title} – <strong>{webinar.date}</strong> 
            (<a href={webinar.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Join</a>)
          </li>
        ))}
      </ul>
    </section>
  );
}
