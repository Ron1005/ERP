"use client"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          Welcome to ERP Ultra
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're excited to have you here. Start exploring our platform to discover amazing features and possibilities.
        </p>
      </div>
    </div>
  );
}