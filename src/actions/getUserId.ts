import { auth } from "@/auth";

export const getUserById = async () => {
  const session = await auth();

  try {
    const response = await fetch(`/api/users/${session?.user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else {
      console.log("Invalid data format");
    }
  } catch {
    console.log("error");
  }
};
