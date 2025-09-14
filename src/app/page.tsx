
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to the Sikkim Monastery Archive</h1>
        <p className="mt-4 text-xl text-gray-600">
          Discover the rich cultural heritage of Sikkim's monasteries.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800">Explore Festivals</h2>
            <p className="mt-4 text-gray-600">Learn about the vibrant festivals celebrated in Sikkim's monasteries.</p>
            <Link href="/festivals" className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
              View Festivals
            </Link>
          </div>
          <div className="rounded-lg bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800">Discover Artifacts</h2>
            <p className="mt-4 text-gray-600">Explore a collection of sacred artifacts from the monasteries.</p>
            <Link href="/artifacts" className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
              View Artifacts
            </Link>
          </div>
          <div className="rounded-lg bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800">Study Manuscripts</h2>
            <p className="mt-4 text-gray-600">Delve into ancient manuscripts and scriptures.</p>
            <Link href="/manuscripts" className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
              View Manuscripts
            </Link>
          </div>
          <div className="rounded-lg bg-gray-50 p-8 shadow-lg transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800">Admire Murals</h2>
            <p className="mt-4 text-gray-600">Discover the intricate murals that adorn the monastery walls.</p>
            <Link href="/murals" className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
              View Murals
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
