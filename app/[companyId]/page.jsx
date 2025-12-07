"use client";

import { Sidebar } from "@/components";
import { useComs } from "@/hooks/useComs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { companyId } = useParams();
  const [com, setCom] = useState({});

  const { coms, loaded } = useComs();

  useEffect(() => {
    if (!loaded) return;

    const com = coms.find((c) => c.id === companyId);
    console.log("found com: ", com);
    setCom(com);
  });

  // 39974cf5-4a7a-4920-8cd7-0e58d261f018

  console.log("company id in company page: ", companyId);
  return (
    <div className="flex items-start">
      <Sidebar />
      <div className="p-8">
        <header>
          <h1> {com?.name}</h1>
        </header>

        <main>{/* Hier müssen wir das mit webhooks machen */}</main>
      </div>
    </div>
  );
}
