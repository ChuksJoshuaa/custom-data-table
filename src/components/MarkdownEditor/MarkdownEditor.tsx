import type { MarkdownEditorProps } from "@/interface";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const MarkdownEditor = ({
  initialContent = "",
  onSave,
}: MarkdownEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            !isPreview
              ? "bg-blue-100 text-blue-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            isPreview
              ? "bg-blue-100 text-blue-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Preview
        </button>
      </div>

      {isPreview ? (
        <div className="prose max-w-none p-4 border border-gray-300 rounded-md min-h-[300px]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 min-h-[300px]"
          placeholder="Write your markdown here..."
        />
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
