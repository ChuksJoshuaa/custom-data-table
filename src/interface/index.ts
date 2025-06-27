// types.ts
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId?: number;
}

export interface DataTableProps {
  data: User[];
  columns: Column[];
  pageSize?: number;
}

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  sortedDataLength: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export interface FormField {
  type: "text" | "email" | "select" | "number" | "textarea" | "string";
  label: string;
  name: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  defaultValue?: string | number;
  validation?: {
    pattern?: string;
    message?: string;
  };
  conditional?: {
    field: string;
    value: string;
  };
}

export type SubmitProps = {
  formData: Record<string, any>;
};

export interface FormBuilderProps {
  config: FormField[];
  onSubmit: (data: SubmitProps["formData"]) => void;
  initialData?: Post;
}

export interface BlogContextType {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (post: Omit<Post, "id">) => Promise<void>;
  updatePost: (id: string, post: Omit<Post, "id">) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  loader: boolean;
  setLoader: (loading: boolean) => void;
}

export interface MarkdownEditorProps {
  initialContent?: string;
  onSave: (content: string) => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface Tab {
  key: string;
  label: string;
}

export interface TabSelectorProps {
  tabs: Tab[];
  currentTab: string;
}
