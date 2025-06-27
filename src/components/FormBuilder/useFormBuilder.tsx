import type { FormBuilderProps, FormField, SubmitProps } from "@/interface";
import { useState } from "react";

const useFormBuilder = ({
  config,
  onSubmit,
  initialData: initialEdittedData,
}: FormBuilderProps) => {
  const [formData, setFormData] = useState<SubmitProps["formData"]>(() => {
    const initialData: SubmitProps["formData"] = initialEdittedData
      ? { ...initialEdittedData }
      : {};
    config.forEach((field) => {
      if (
        field.defaultValue !== undefined &&
        initialData[field.name] === undefined
      ) {
        initialData[field.name] = field.defaultValue;
      }
    });
    return initialData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }

    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return field.validation.message || `Invalid ${field.label}`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    config.forEach((field) => {
      if (field.conditional) {
        const dependentFieldValue = formData[field.conditional.field];
        if (dependentFieldValue !== field.conditional.value) {
          return;
        }
      }

      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const shouldShowField = (field: FormField): boolean => {
    if (!field.conditional) return true;
    return formData[field.conditional.field] === field.conditional.value;
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    shouldShowField,
    setFormData,
    setErrors,
    validateField,
    config,
  };
};

export default useFormBuilder;
