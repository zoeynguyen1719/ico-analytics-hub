import { useState } from "react";
import { toolMenuItems } from "./MainMenu";

const ToolsMenu = () => {
  const [showTools, setShowTools] = useState(false);

  return (
    <div 
      className="hidden md:flex items-center fixed right-0 top-20 bg-gradient-to-l from-crypto-dark to-[#2A4B57] px-6 py-3 rounded-l-xl transition-all duration-300 hover:translate-x-0 translate-x-[calc(100%-48px)] group shadow-xl border-l border-t border-b border-crypto-blue/20"
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() => setShowTools(false)}
    >
      <div className="flex items-center">
        <span className="text-crypto-blue font-bold rotate-90 transform origin-left translate-y-[-50%] group-hover:opacity-0 transition-opacity absolute left-6 tracking-widest uppercase text-sm bg-crypto-dark/50 px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
          Tools
        </span>
        <div className="flex items-center gap-6 pl-10">
          {toolMenuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="relative group/tool"
              title={item.label}
            >
              <item.icon 
                size={22} 
                className="text-crypto-blue hover:text-white transition-all duration-300 transform hover:scale-110" 
              />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-crypto-blue text-crypto-dark px-2 py-1 rounded text-xs font-medium opacity-0 group-hover/tool:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsMenu;