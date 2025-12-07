import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h1>your companies</h1>
          <p className="h1desc">Select your company or create one</p>
        </div>
        <button className="secbutton">Create Company</button>
      </header>

      <main className="flex items-start justify-start">
        {/* Hier kommen die company karten hin */}
      </main>
    </div>
  );
}
