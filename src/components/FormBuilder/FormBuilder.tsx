import type { FormBuilderProps } from "@/interface";
import useFormBuilder from "@/components/FormBuilder/useFormBuilder";

const FormBuilder = ({ config, onSubmit }: FormBuilderProps) => {
  const { formData, errors, handleChange, handleSubmit, shouldShowField } =
    useFormBuilder({ config, onSubmit });

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full md:max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      {config.map((field) => {
        if (!shouldShowField(field)) return null;

        return (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={4}
                className={`block w-full px-3 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className={`block w-full px-3 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
            )}

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        );
      })}

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
