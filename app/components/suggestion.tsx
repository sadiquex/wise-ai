import { MdArrowOutward } from "react-icons/md";

type SuggestionProps = {
  question: string;
  onClick: () => void;
};

export default function Suggestion({ question, onClick }: SuggestionProps) {
  return (
    <div
      onClick={onClick}
      className="min-h-[200px] cursor-pointer flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <p className="font-medium text-gray-600 dark:text-white">{question}</p>
      <div className="flex justify-end">
        <span className="p-2 bg-[#eaecf5]">
          <MdArrowOutward size={20} />
        </span>
      </div>
    </div>
  );
}
