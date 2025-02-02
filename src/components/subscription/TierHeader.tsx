interface TierHeaderProps {
  name: string;
  price: string;
  highlighted: boolean;
}

const TierHeader = ({ name, price, highlighted }: TierHeaderProps) => {
  return (
    <>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-crypto-blue text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2 text-crypto-blue">
          {name}
        </h3>
        <div className="text-3xl font-bold mb-4 text-white">{price}</div>
      </div>
    </>
  );
};

export default TierHeader;