"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [creating, setCreating] = useState(false);
  const router = useRouter();
  const { name, id, loaded } = useUser();

  console.log("nammmmemeeee in main page: ", name, id);

  useEffect(() => {
    if (!loaded) return;

    if (!id) {
      router.push("/login");
    }
  }, [id, router]);

  const createCompany = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const companyName = formData.get("companyName").toString().trim();
  };

  return (
    <div className="p-8">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h1>your companies</h1>
          <p className="h1desc">Select your company or create one</p>
        </div>
        <button className="secbutton" onClick={() => setCreating(true)}>
          Create Company
        </button>
      </header>

      <main className="flex items-start justify-start">
        {/* Hier kommen die company karten hin */}
      </main>

      {creating && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className=" bg-gray-800/80 p-8 rounded-lg w-96">
            <div className="w-full flex items-center justify-between mb-4">
              <h2 className="">Create Company</h2>
              <button
                className="text-sm cursor-pointer"
                onClick={() => setCreating(false)}
              >
                ❌
              </button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={createCompany}>
              <div className="flex flex-col">
                <label htmlFor="companyName" className="mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="tinput"
                />
              </div>

              <button className="mainbutton" type="submit">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
