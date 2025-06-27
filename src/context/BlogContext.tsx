import type { BlogContextType, ChildrenProps, Post } from "@/interface";
import { createContext, useCallback, useContext, useState } from "react";

const BlogContext = createContext<BlogContextType>({} as BlogContextType);

export const BlogProvider = ({ children }: ChildrenProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loader, setLoader] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }, []);

  const addPost = useCallback(async (post: Omit<Post, "id">) => {
    try {
      const newPost = { ...post, id: Date.now().toString() };
      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error("Failed to add post:", error);
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (id: string, post: Omit<Post, "id">) => {
    try {
      setPosts((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, ...post } : p))
      );
    } catch (error) {
      console.error("Failed to update post:", error);
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      throw error;
    }
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        fetchPosts,
        addPost,
        updatePost,
        deletePost,
        sidebarOpen,
        setSidebarOpen,
        loader,
        setLoader,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
