"use client";

import { useParams } from "next/navigation";

export default function Home() {
  const { companyId } = useParams();

  console.log("company id in company page: ", companyId);
  return (
    <div>
      <p>Wassssuppp</p>
    </div>
  );
}
