import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewsFiltersProps {
  cryptoMentions: string[];
  selectedCrypto: string;
  setSelectedCrypto: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

const NewsFilters = ({
  cryptoMentions,
  selectedCrypto,
  setSelectedCrypto,
  selectedDate,
  setSelectedDate,
}: NewsFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
        <SelectTrigger className="w-[200px] bg-crypto-dark text-white border-crypto-gray">
          <SelectValue placeholder="Select cryptocurrency" />
        </SelectTrigger>
        <SelectContent className="bg-crypto-dark border-crypto-gray">
          <SelectItem value="all" className="text-white hover:bg-crypto-gray">
            All Cryptocurrencies
          </SelectItem>
          {cryptoMentions.map((crypto) => (
            <SelectItem 
              key={crypto} 
              value={crypto.toLowerCase()}
              className="text-white hover:bg-crypto-gray"
            >
              {crypto}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[200px] justify-start text-left font-normal bg-crypto-dark text-white border-crypto-gray",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-crypto-dark border-crypto-gray" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            className="bg-crypto-dark text-white"
          />
        </PopoverContent>
      </Popover>

      {(selectedCrypto !== "all" || selectedDate) && (
        <Button 
          variant="outline" 
          className="bg-crypto-dark text-white border-crypto-gray hover:bg-crypto-gray"
          onClick={() => {
            setSelectedCrypto("all");
            setSelectedDate(undefined);
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default NewsFilters;