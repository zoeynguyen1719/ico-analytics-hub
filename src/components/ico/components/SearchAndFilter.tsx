
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  platforms: string[];
}

// Define sectors to match the distribution chart
const sectors = [
  'DeFi',
  'Gaming',
  'Infrastructure',
  'NFT/Metaverse',
  'AI/ML',
  'Others'
];

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  selectedSector,
  setSelectedSector,
}: SearchAndFilterProps) => {
  return (
    <Card className="p-6 bg-zinc-800/50 backdrop-blur-sm border-crypto-blue">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input 
            type="text" 
            placeholder="Search tokens..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="pl-10 bg-zinc-700 border-crypto-gray text-white placeholder:text-zinc-400 hover:bg-zinc-600 focus:bg-zinc-600 transition-colors" 
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
        </div>
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-[180px] bg-zinc-700 border-crypto-gray text-white">
            <SelectValue placeholder="Filter by Sector" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-crypto-gray">
            <SelectItem value="all" className="text-white hover:bg-zinc-700">All Sectors</SelectItem>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector.toLowerCase()} className="text-white hover:bg-zinc-700">
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default SearchAndFilter;
