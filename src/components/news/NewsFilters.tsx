import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

      {selectedCrypto !== "all" && (
        <Button 
          variant="outline" 
          className="bg-crypto-dark text-white border-crypto-gray hover:bg-crypto-gray"
          onClick={() => {
            setSelectedCrypto("all");
          }}
        >
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default NewsFilters;