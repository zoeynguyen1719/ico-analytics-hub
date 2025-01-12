import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import ICOProjectForm from "@/components/admin/ICOProjectForm";
import ICOProjectTable from "@/components/admin/ICOProjectTable";
import { ICOProject } from "@/types/ico";

const Admin = () => {
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<ICOProject | null>(null);

  const { data: projects, refetch } = useQuery({
    queryKey: ['admin-ico-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ICO')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (data: ICOProject) => {
    try {
      if (editingProject?.id) {
        const { error } = await supabase
          .from('ICO')
          .update(data)
          .eq('id', editingProject.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('ICO')
          .insert([data]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Project added successfully",
        });
      }
      
      setEditingProject(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (project: any) => {
    const uiProject: ICOProject = {
      ...project,
      symbol: project.symbol || "",
      category: project.category || "Cryptocurrency",
      type: project.type || "Public Sale",
      logo: project.logo || "",
    };
    setEditingProject(uiProject);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('ICO')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 bg-crypto-dark text-white">
        <h2 className="text-2xl font-bold">
          {editingProject ? 'Edit ICO Project' : 'Add New ICO Project'}
        </h2>
        
        <ICOProjectForm
          initialData={editingProject}
          onSubmit={onSubmit}
          onCancel={() => setEditingProject(null)}
        />

        <ICOProjectTable
          projects={projects || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Admin;