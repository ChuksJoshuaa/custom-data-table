import type { FormField } from "@/interface";

export const formConfig: FormField[] = [
  { type: "text", label: "Name", name: "name", required: true },
  { type: "email", label: "Email", name: "email", required: true },
  {
    type: "select",
    label: "Gender",
    name: "gender",
    options: ["Male", "Female", "Other"],
  },
  {
    type: "text",
    label: "Phone Number",
    name: "phone",
    validation: {
      pattern: "^\\d{11}$",
      message: "Please enter a valid 11-digit phone number",
    },
    conditional: {
      field: "gender",
      value: "Female",
    },
  },
];

export const postFormConfig: FormField[] = [
  {
    type: "text",
    label: "Title",
    name: "title",
    required: true,
    placeholder: "Enter post title",
  },
  {
    type: "textarea",
    label: "Body",
    name: "body",
    required: true,
    placeholder: "Write your post content here...",
  },
];

export const tabs = [
  { key: "/data-table", label: "Data Table" },
  { key: "/form-builder", label: "Form Builder" },
  { key: "/blog", label: "Blog" },
];

export const columns = [
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "age", label: "Age", sortable: true },
  { key: "gender", label: "Gender", sortable: true },
];
