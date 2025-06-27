import DataTable from "@/components/DataTable/DataTable";
import Layout from "@/components/Layout";
import type { User } from "@/interface";
import { columns } from "@/utils";
import { useEffect, useState } from "react";

const DataTableView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <Layout>
      <div className="px-4 sm:px-0 py-1 w-full">
        <h1 className="text-2xl font-bold mb-6">User Data Table</h1>
        <DataTable data={users} columns={columns} pageSize={10} />
      </div>
    </Layout>
  );
};

export default DataTableView;
