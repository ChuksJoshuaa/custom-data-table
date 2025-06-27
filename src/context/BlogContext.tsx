import { FETCH_POSTS_URL } from "@/constants";
import type { BlogContextType, ChildrenProps, Post } from "@/interface";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const BlogContext = createContext<BlogContextType>({} as BlogContextType);

export const BlogProvider = ({ children }: ChildrenProps) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allPosts, searchTerm]);

  const posts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, postsPerPage, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const fetchPosts = useCallback(async () => {
    setLoader(true);
    try {
      const response = await fetch(FETCH_POSTS_URL);
      const data = await response.json();
      setAllPosts(data.slice(0, 50));
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setLoader(false);
    }
  }, []);

  const addPost = useCallback(async (post: Omit<Post, "id">) => {
    try {
      const newPost = { ...post, id: Date.now().toString() };
      setAllPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error("Failed to add post:", error);
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (id: string, post: Omit<Post, "id">) => {
    try {
      setAllPosts((prev) =>
        prev.map((p) => (String(p.id) === String(id) ? { ...p, ...post } : p))
      );
    } catch (error) {
      console.error("Failed to update post:", error);
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      setAllPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      throw error;
    }
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        allPosts: filteredPosts,
        fetchPosts,
        addPost,
        updatePost,
        deletePost,
        sidebarOpen,
        setSidebarOpen,
        loader,
        setLoader,
        searchTerm,
        setSearchTerm,
        currentPage,
        setCurrentPage,
        postsPerPage,
        totalPages,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
