import { useEffect, useState } from "react";

export function useUser() {
  const [loaded, setLoaded] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setLoaded(false);
    const userName = localStorage.getItem("userName");
    fetchUser(userName);
    setName(userName);
    setLoaded(true);
  }, []);

  const fetchUser = async (name) => {
    const res = await fetch(`/api/user?name=${name}`);
    const data = await res.json();
    console.log("data in useUser: ", data);
    if (data.user && data.user.length > 0) {
      setId(data.user[0].id);
    }
  };

  return { id, name, loaded };
}
