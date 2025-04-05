import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// Define the Post type more specifically if possible
interface Post {
    id: number | string; // Or just number depending on your ID type
    title: string;
    content: string;
    // Add other fields if they exist and are used
}

// Define Props type
interface EditPostProps {
    post: Post;
    // Inertia automatically provides errors via useForm hook,
    // so it doesn't need to be a separate prop like in the Vue example
    // unless you are passing other specific errors.
}

export default function EditPost({ post }: EditPostProps) {
    // Form state managed by Inertia's useForm
    const { data, setData, errors, put, processing, isDirty, reset } = useForm({
        title: post.title || '', // Provide default empty string just in case
        content: post.content || '', // Provide default empty string just in case
    });

    // Breadcrumbs - Make them dynamic
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Posts', href: route('posts.index') }, // Use route helper
        // Optional: Link to the specific post's show page if you have one
        // { title: post.title, href: route('posts.show', post.id) },
        { title: 'Edit', href: route('posts.edit', post.id) } // Use route helper
    ];

    // Toast notification (simplified) - Keep alert for now, or integrate a React toast library
    function showToast(message: string) {
        alert(message); // Replace with a proper toast library implementation if desired
    }

    // Handle form submission for update
    function submit(e: React.FormEvent) {
        e.preventDefault();
        // Use PUT method
        put(route('posts.update', post.id), {
            // preserveScroll: true, // Optional: Keep scroll position after update
            onSuccess: () => {
                // showToast('Post updated successfully!');
                // Often the backend redirects, making explicit reset/visit unnecessary.
                // If no backend redirect, you might uncomment reset() or router.visit()
                // reset(); // Reset form fields only if needed after successful non-redirect update
            },
            onError: (formErrors) => {
                console.error('Form submission errors:', formErrors);
                // Errors are automatically available via the `errors` object from useForm
                showToast('Failed to update post. Please check the errors.');
            }
        });
    }

    // Simple Cancel/Back functionality
    function goBack() {
        if (window.history.length > 1 && document.referrer !== window.location.href) {
            // Check referrer to avoid looping back to the same edit page if it was the first entry
            window.history.back();
        } else {
            router.visit(route('posts.index')); // Fallback to index using Inertia router
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Post: ${post.title}`} />

            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
                        <p className="text-gray-600 mt-1">Update the details for "{post.title}"</p>
                    </div>

                    {/* Back Button */}
                    <button
                        onClick={goBack}
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* Edit Form */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <form onSubmit={submit}>
                        <div className="p-6 space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        type="text"
                                        name="title"
                                        required
                                        className={`p-3 block w-full rounded-md shadow-sm sm:text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.title ? 'border-red-500 border' : 'border-gray-300 border'}`} // Use template literal for conditional class
                                        placeholder="Enter post title"
                                    />
                                </div>
                                {errors.title && ( // Display error message if it exists
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Content Field */}
                            <div>
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                    Content
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        name="content"
                                        rows={6}
                                        required
                                        className={`p-3 block w-full rounded-md shadow-sm sm:text-sm focus:border-blue-500 focus:ring-blue-500 ${errors.content ? 'border-red-500 border' : 'border-gray-300 border'}`} // Use template literal for conditional class
                                        placeholder="Write your post content here..."
                                    ></textarea>
                                </div>
                                {errors.content && ( // Display error message if it exists
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end items-center space-x-3">
                            <button
                                onClick={goBack}
                                type="button"
                                disabled={processing} // Disable cancel while processing
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing || !isDirty} // Disable if processing or form hasn't changed
                                className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    (processing || !isDirty) ? 'bg-blue-400 cursor-not-allowed opacity-75' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {processing && ( // Show spinner when processing
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {processing ? 'Saving...' : 'Update Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
