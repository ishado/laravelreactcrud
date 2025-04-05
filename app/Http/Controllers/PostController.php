<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('posts/index', [
            'posts' => Post::all(),
        ]);

    }

    public function show(Post $post)
    {
        return Inertia::render('posts/show', [
            'post' => $post,
        ]);
    }

    public function create()
    {
        return Inertia::render('posts/create');
    }

    public function store(Request $request)
    {
        Post::create([
            'title'   => $request->title,
            'content' => $request->content,
        ]);

        return redirect()->route('posts.index');
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $post->update([
            'title'   => $request->title,
            'content' => $request->content,
        ]);

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index');
    }
}
