import { useEffect, useState } from "react";
import { useUser } from "./useUser";

export function useComs() {
  const [loaded, setLoaded] = useState(false);
  const [coms, setComs] = useState([]);

  const { id, loaded: uloaded } = useUser();

  useEffect(() => {
    if (!uloaded || !id) return;

    setLoaded(false);

    fetchComs();

    setLoaded(true);
  }, [uloaded, id]);

  const fetchComs = async () => {
    const res = await fetch(`/api/company?userId=${id}`);
    const { companies } = await res.json();
    console.log("data in useCom: ", companies);
    if (companies && companies.length > 0) {
      setComs(companies);
    }
  };

  return { coms, loaded };
}
