"use client";

import { Sidebar } from "@/components";
import { useComs } from "@/hooks/useComs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WebhooksPage() {
  const { companyId } = useParams();
  const [com, setCom] = useState({});
  const [creatinWH, setCreatingWH] = useState(true);
  const [endpoints, setEndpoints] = useState(true);

  /* TODO: Nächster schritt ist es die endpoints anzuzeigen als table */

  const { coms, loaded } = useComs();

  useEffect(() => {
    if (!loaded) return;

    const com = coms.find((c) => c.id === companyId);
    console.log("found com: ", com);
    setCom(com);

    fetchWebhookEndpoints();
  }, []);

  // 39974cf5-4a7a-4920-8cd7-0e58d261f018

  const fetchWebhookEndpoints = async () => {
    const res = await fetch(`/api/webhook?companyId=${companyId}`);

    res.json().then((e) => setEndpoints(e));
  };

  const saveWebhook = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    console.log("form data in /webhooks: ", formData);

    const name = formData.get("name").toString().trim();
    const url = formData.get("url").toString().trim();

    const res = await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId,
        name,
        url,
      }),
    });

    console.log("res in create webhook: ", res);
    setCreatingWH(false);
  };

  console.log("company id in company page: ", companyId);
  return (
    <div className="flex items-start">
      <Sidebar />
      <div className="p-8 w-full">
        <header className="mb-8">
          <h1> {com?.name}</h1>
        </header>

        <main className="w-full">
          <div className="flex items-center justify-between w-full">
            <h2>Webhooks</h2>
            <button className="secbutton" onClick={() => setCreatingWH(true)}>
              Create Webhook
            </button>
          </div>
          {/* hier muss man seine webhooks sehen */}

          <div>
            {/* hier kommen jetzt die webhook endpoints hin */}
            <p></p>
          </div>
        </main>
      </div>

      {creatinWH && (
        <div className="fixed inset-0 bg-black/50 w-screen h-screen flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg flex flex-col items-start p-6">
            <div className="flex items-center justify-between w-full mb-6">
              <h2 className="">Create Webhook</h2>
              <button onClick={() => setCreatingWH(false)}>❌</button>
            </div>
            <form onSubmit={saveWebhook}>
              <div className="gap-3 flex justify-between items-center mb-4">
                <label htmlFor="name">Name</label>
                <input className="tinput" type="text" id="name" name="name" />
              </div>
              <div className="justify-between flex items-center mb-6">
                <label htmlFor="url">URL</label>
                <input className="tinput" type="text" id="url" name="url" />
              </div>
              {/* hier kommen noch die events hin */}

              <button type="submit" className="mainbutton">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
