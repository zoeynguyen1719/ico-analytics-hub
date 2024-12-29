import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

interface ICOProject {
  id?: number;
  name: string;
  symbol: string;
  category: string;
  type: string;
  value: string;
  logo: string;
  isHighlighted: boolean;
  isNew: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<ICOProject | null>(null);
  
  const form = useForm<ICOProject>({
    defaultValues: {
      name: "",
      symbol: "",
      category: "Cryptocurrency",
      type: "Public Sale",
      value: "",
      logo: "",
      isHighlighted: false,
      isNew: true,
    },
  });

  const { data: projects, refetch } = useQuery({
    queryKey: ['admin-ico-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ico_projects')
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
          .from('ico_projects')
          .update(data)
          .eq('id', editingProject.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('ico_projects')
          .insert([data]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Project added successfully",
        });
      }
      
      form.reset();
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

  const handleEdit = (project: ICOProject) => {
    setEditingProject(project);
    form.reset(project);
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('ico_projects')
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter symbol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                        <SelectItem value="DeFi">DeFi</SelectItem>
                        <SelectItem value="NFT">NFT</SelectItem>
                        <SelectItem value="GameFi">GameFi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter logo URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              {editingProject && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingProject(null);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">
                {editingProject ? 'Update Project' : 'Add Project'}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.symbol}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.value}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;