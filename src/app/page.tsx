"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  BookCopy,
  Landmark,
  Sprout,
  CalendarDays,
  Camera,
  Ticket,
  Users,
} from "lucide-react";

// Local data for monasteries
const monasteryData = [
  {
    name: "Rumtek Monastery",
    location: "Dharma Chakra Centre, Gangtok, Sikkim",
    established: "1966",
    description: "Rumtek Monastery is the largest monastery in Sikkim and a famous site of pilgrimage for Buddhists. It is home to the Kagyu lineage of Tibetan Buddhism and features a beautiful shrine hall and the Golden Stupa.",
  },
  {
    name: "Pemayangtse Monastery",
    location: "Pemayangtse, Pelling, Sikkim",
    established: "1705",
    description: "One of the oldest and most significant monasteries in Sikkim, Pemayangtse Monastery is part of the Nyingma order. It houses priceless paintings and sculptures, and offers a stunning view of the Himalayas.",
  },
  {
    name: "Enchey Monastery",
    location: "Gangtok, Sikkim",
    established: "1909",
    description: "Perched on a hill above Gangtok, Enchey Monastery is known for its serene atmosphere and intricate religious artwork. The monastery is believed to be blessed by the revered tantric master, Lama Druptob Karpo.",
  },
];

// Features data for the home section
const features = [
  {
    title: "Manuscripts",
    description: "Explore digitized ancient manuscripts.",
    href: "/manuscripts",
    icon: (
      <BookCopy className="h-6 w-6 text-indigo-500" />
    ),
  },
  {
    title: "Murals",
    description: "Discover high-resolution monastery murals.",
    href: "/murals",
    icon: (
      <Landmark className="h-6 w-6 text-green-500" />
    ),
  },
  {
    title: "Artifacts",
    description: "View a catalog of sacred artifacts.",
    href: "/artifacts",
    icon: (
      <Sprout className="h-6 w-6 text-amber-500" />
    ),
  },
  {
    title: "Virtual Tour",
    description: "Take an interactive 360° tour.",
    href: "/virtual-tour",
    icon: (
      <Camera className="h-6 w-6 text-sky-500" />
    ),
  },
  {
    title: "Festivals",
    description: "See upcoming events and ceremonies.",
    href: "/festivals",
    icon: (
      <CalendarDays className="h-6 w-6 text-rose-500" />
    ),
  },
  {
    title: "Book a Visit",
    description: "Plan your visit to the monastery.",
    href: "/booking",
    icon: (
      <Ticket className="h-6 w-6 text-purple-500" />
    ),
  },
  {
    title: "Community",
    description: "Contribute your knowledge.",
    href: "/community",
    icon: (
      <Users className="h-6 w-6 text-orange-500" />
    ),
  },
];

function Card({ title, description, icon }) {
  return (
    <div className="flex h-full flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-lg font-medium font-bold text-gray-800">
          {title}
        </h3>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

const App = () => {
  const [monasteryName, setMonasteryName] = useState('');
  const [monasteryDetails, setMonasteryDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const foundMonastery = monasteryData.find(
      (monastery) => monastery.name.toLowerCase() === monasteryName.toLowerCase()
    );

    if (foundMonastery) {
      setMonasteryDetails(foundMonastery);
      setError('');
    } else {
      setMonasteryDetails(null);
      setError('Monastery not found. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8"> {/* Changed from bg-gray-100 to bg-stone-100 */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2"> {/* Changed text color */}
            Welcome to the Sikkim Archive
          </h1>
          <p className="text-lg text-gray-600">
            A digital gateway to the rich cultural heritage of Sikkim's monasteries.
          </p>
        </div>

        {/* Monastery Search Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sikkim Monasteries</h2>
          <p className="text-gray-600 mb-4">
            Enter the name of a monastery to get its details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              value={monasteryName}
              onChange={(e) => setMonasteryName(e.target.value)}
              placeholder="e.g., Rumtek Monastery"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Details
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {monasteryDetails && (
            <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800">{monasteryDetails.name}</h3>
              <p className="text-gray-600 mt-2">
                <strong className="font-semibold">Location:</strong> {monasteryDetails.location}
              </p>
              <p className="text-gray-600">
                <strong className="font-semibold">Established:</strong> {monasteryDetails.established}
              </p>
              <p className="text-gray-700 mt-4">{monasteryDetails.description}</p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;