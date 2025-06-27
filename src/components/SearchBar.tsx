import type { SearchBarProps } from "@/interface";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) => (
  <div className="relative">
    <input
      type="text"
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
    />
    <svg
      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  </div>
);

export default SearchBar;
