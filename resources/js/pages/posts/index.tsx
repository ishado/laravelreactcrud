import React from 'react'; // Import React for type definitions like React.FC
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react'; // Import router if needed elsewhere, but not for the delete button in this version

// Define a type for the Post object for better type safety
interface Post {
  id: number | string; // Use number or string depending on your backend ID type
  title: string;
  content: string;
  // Add other fields if they exist, e.g., created_at, updated_at
}

// Define props type for the component
interface PostsProps {
  posts: Post[];
}

// Define constants for repeated values
const PAGE_TITLE = 'Posts';
const BREADCRUMBS: BreadcrumbItem[] = [
  {
    title: PAGE_TITLE,
    href: route('posts.index'), // Use route helper if available for index
    // Or '/posts' if route helper isn't set up for index
  },
];

// Component Definition using React.FC for functional components with props typing
const Posts: React.FC<PostsProps> = ({ posts }) => {

  // REMOVED the unused handleDeleteClick function

  // Simplified delete handler for Link's onClick
  const confirmAndDelete = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => { // Adjusted type hint slightly for as="button"
      if (!confirm('Are you sure you want to delete this post?')) {
          e.preventDefault(); // Prevent navigation/action if cancelled
      }
  };


  return (
    <AppLayout breadcrumbs={BREADCRUMBS}>
      <Head title={PAGE_TITLE} />

      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{PAGE_TITLE}</h1>
          {/* Use Link styled as a button for consistency and better semantics */}
          <Link
            href={route('posts.create')} // Use route helper if 'posts.create' route is defined
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring focus:ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
          >
            Create Post
          </Link>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Enhanced table headers with scope for accessibility */}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Handle Empty State */}
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                      No posts found. Start by creating one!
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-md">
                        {/* Truncate long content for preview */}
                        <p className="truncate" title={post.content}>
                          {post.content}
                          {/* Or using slice: {post.content.slice(0, 100)}{post.content.length > 100 ? '...' : ''} */}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {/* Use Link styled as text/button for actions */}
                        <Link
                          href={route('posts.edit', post.id)} // Use route helper if 'posts.edit' route is defined
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                        <Link
                          href={route('posts.destroy', post.id)} // Use route helper
                          method="delete"
                          as="button" // Important for accessibility and semantics when Link acts as a button
                          onClick={confirmAndDelete}
                          className="text-red-600 hover:text-red-900"
                          preserveScroll // Keep scroll position after deletion
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Posts;
