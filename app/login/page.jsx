"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function loginPage() {
  const router = useRouter();
  const { id, loaded } = useUser();

  useEffect(() => {
    if (!loaded) return;

    if (id) {
      router.push("/");
    }
  }, [id, router, loaded]);

  const loginUser = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name").toString().trim();
    console.log("name: ", name);

    if (!name) {
      alert("no name provided");
      return;
    }

    /* const res = await fetch("/api/save-user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name }),
    });

    console.log(
      "response from save-user: ",
      res.json().then(({ message }) => console.log(message))
    ); */

    localStorage.setItem("userName", name);

    router.push("/");
  };

  return (
    <div className="p-8 flex items-center justify-start">
      <main className="w-full max-w-6xl flex items-center justify-center flex-col gap-8">
        <h1 className="text-center">Login Page</h1>

        <form className="flex flex-col gap-8" onSubmit={loginUser}>
          <div className="flex items-center gap-4">
            <label htmlFor="name">Name</label>
            <input type="text" className="tinput" name="name" id="name" />
          </div>

          <button className="mainbutton" type="submit">
            Done
          </button>
        </form>
      </main>
    </div>
  );
}

export default loginPage;
