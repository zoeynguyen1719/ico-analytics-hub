import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { ICOProject } from "@/types/ico";

interface ICOProjectFormProps {
  initialData?: ICOProject | null;
  onSubmit: (data: ICOProject) => void;
  onCancel?: () => void;
}

const ICOProjectForm = ({ initialData, onSubmit, onCancel }: ICOProjectFormProps) => {
  const form = useForm<ICOProject>({
    defaultValues: initialData || {
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

  return (
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
          {initialData && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {initialData ? 'Update Project' : 'Add Project'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ICOProjectForm;