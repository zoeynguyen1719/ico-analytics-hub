import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

interface ICOProject {
  id?: number;
  "Project Name": string;
  "Price"?: number;
  "Sale Price"?: number;
  "ROI"?: number;
  "ATH ROI"?: number;
  "Platform"?: string;
  "ICO date"?: string;
  created_at?: string;
  description?: string;
  website_url?: string;
  whitepaper_url?: string;
  token_type?: string;
  token_price?: string;
  token_supply?: number;
  hard_cap?: string;
  distributed_percentage?: number;
  kyc_required?: boolean;
  restricted_countries?: string[];
  social_links?: Record<string, any>;
  team_members?: Record<string, any>;
  roadmap?: Record<string, any>;
  token_metrics?: Record<string, any>;
  slug?: string;
  // UI specific fields
  symbol: string;
  category: string;
  type: string;
  logo: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<ICOProject | null>(null);
  
  const form = useForm<ICOProject>({
    defaultValues: {
      "Project Name": "",
      symbol: "",
      category: "Cryptocurrency",
      type: "Public Sale",
      "Price": undefined,
      "Platform": "",
      "ICO date": "",
      logo: "",
    },
  });

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

  const handleEdit = (project: any) => {
    const uiProject: ICOProject = {
      ...project,
      symbol: project.symbol || "",
      category: project.category || "Cryptocurrency",
      type: project.type || "Public Sale",
      logo: project.logo || "",
    };
    setEditingProject(uiProject);
    form.reset(uiProject);
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Project Name"
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
                name="Price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="Platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter platform" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ICO date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ICO Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                <TableHead>Price</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>ICO Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects?.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project["Project Name"]}</TableCell>
                  <TableCell>{project["Price"]}</TableCell>
                  <TableCell>{project["Platform"]}</TableCell>
                  <TableCell>{project["ICO date"]}</TableCell>
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
                        onClick={() => project.id && handleDelete(project.id)}
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
