import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ResearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
  categories: string[];
  onSearch: () => void;
}

const ResearchFilters: React.FC<ResearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  categories,
  onSearch
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-crypto-dark p-4 rounded-lg">
      <div className="flex-1 w-full md:w-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-crypto-gray border-crypto-blue text-white pl-10"
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crypto-blue w-4 h-4" />
          </div>
          <Button 
            onClick={onSearch}
            className="bg-crypto-blue hover:bg-crypto-green text-white"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full md:w-[180px] bg-crypto-gray border-crypto-blue text-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-crypto-dark border-crypto-blue">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => onSortOrderChange(value)}>
          <SelectTrigger className="w-full md:w-[180px] bg-crypto-gray border-crypto-blue text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-crypto-dark border-crypto-blue">
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ResearchFilters;