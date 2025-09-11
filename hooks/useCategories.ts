import { Category } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const {
    isLoading,
    data: Categories,
    error,
  } = useQuery<Category[]>({
    queryKey: ["Categories"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/v1/master/categories`
      );
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      const data = await response.json();
      return data;
    },
  });

  return { isLoading, Categories, error };
}
