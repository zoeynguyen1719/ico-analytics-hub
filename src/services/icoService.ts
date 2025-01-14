import { supabase } from "@/integrations/supabase/client";
import { ICOProject } from "@/types/ico";
import { useQuery } from "@tanstack/react-query";

const fetchICOProjects = async (): Promise<ICOProject[]> => {
  try {
    // First try to get data from Supabase
    const { data: supabaseData, error: supabaseError } = await supabase
      .from("ICO")
      .select("*");

    if (supabaseError) {
      console.error("Error fetching from Supabase:", supabaseError);
      throw supabaseError;
    }

    if (supabaseData && supabaseData.length > 0) {
      return supabaseData.map(project => ({
        ...project,
        isHighlighted: false,
        isNew: false,
        value: project.token_price || "$0"
      }));
    }

    console.info("No data in Supabase, fetching from external sources");

    // If no data in Supabase, fetch from external API using Edge Function
    const { data, error } = await supabase.functions.invoke('scrape-ico', {
      method: 'POST',
    });

    if (error) {
      console.error("Error calling scrape-ico function:", error);
      throw error;
    }

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }

    return data;
  } catch (error) {
    console.error("Error fetching ICO projects:", error);
    return [];
  }
};

export const useICOProjects = () => {
  return useQuery({
    queryKey: ['icoProjects'],
    queryFn: fetchICOProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};