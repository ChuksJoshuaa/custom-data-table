import FormBuilder from "@/components/FormBuilder/FormBuilder";
import Layout from "@/components/Layout";
import MarkdownEditor from "@/components/MarkdownEditor/MarkdownEditor";
import { useBlog } from "@/context/BlogContext";
import type { SubmitProps } from "@/interface";
import { postFormConfig } from "@/utils";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogApp = () => {
  const { posts, addPost, updatePost, deletePost, fetchPosts } = useBlog();
  const [editMode, setEditMode] = useState(false);
  const [showMarkdownEditor, setShowMarkdownEditor] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && id !== "new") {
      setEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleGoBack = () => {
    setEditMode(false);
    setShowMarkdownEditor(false);
    navigate("/blog");
  };

  const handleSubmit = (data: { title: string; body: string }) => {
    if (editMode && id !== "new") {
      updatePost(id as string, data);
    } else {
      addPost(data);
    }
    handleGoBack();
  };

  const handleDelete = (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
    }
  };

  const currentPost = editMode
    ? posts.find((post) => Number(post.id) === Number(id))
    : null;

  return (
    <React.Fragment>
      <Layout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
              <Link
                to="/blog/new"
                onClick={handleGoBack}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                New Post
              </Link>
            </div>

            <div className="space-y-6">
              {!editMode && !id && (
                <>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {posts.map((post) => (
                        <li key={post.id}>
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <Link
                                to={`/blog/${post.id}`}
                                className="text-lg font-medium text-blue-600 hover:text-blue-500 truncate"
                              >
                                {post.title}
                              </Link>
                              <div className="ml-2 flex-shrink-0 flex space-x-2">
                                <Link
                                  to={`/blog/edit/${post.id}`}
                                  className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {post.body}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {(editMode || id === "new") && (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {editMode ? "Edit Post" : "Create New Post"}
                    </h2>
                    <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                      <button
                        type="button"
                        onClick={handleGoBack}
                        className="inline-flex items-center mr-2 px-4 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Go Back
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShowMarkdownEditor(!showMarkdownEditor)
                        }
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {showMarkdownEditor ? "Hide Editor" : "Markdown Editor"}
                      </button>
                    </div>
                  </div>

                  {showMarkdownEditor ? (
                    <MarkdownEditor
                      initialContent={currentPost?.body || ""}
                      onSave={(content) => {
                        const title = currentPost?.title || "";
                        handleSubmit({ title, body: content });
                      }}
                    />
                  ) : (
                    <FormBuilder
                      config={postFormConfig}
                      onSubmit={
                        handleSubmit as (data: SubmitProps["formData"]) => void
                      }
                      initialData={currentPost || undefined}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default BlogApp;
