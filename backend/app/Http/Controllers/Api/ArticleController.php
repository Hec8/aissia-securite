<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Article::query();

        // Pour le public, ne montrer que les articles publiés
        if (!$request->has('all')) {
            $query->published();
        }

        // Filtrage par catégorie
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Articles mis en avant seulement
        if ($request->has('featured')) {
            $query->featured();
        }

        // Limite pour la page d'accueil
        if ($request->has('limit')) {
            $query->limit((int) $request->limit);
        }

        $articles = $query->orderByDesc('published_at')->orderByDesc('created_at')->get();

        return response()->json([
            'success' => true,
            'data' => $articles
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'image_url' => ['nullable', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'tags' => ['nullable', 'array'],
            'is_published' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        $article = Article::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Article créé avec succès.',
            'data' => $article
        ], 201);
    }

    public function show(Article $article): JsonResponse
    {
        // Incrémenter le compteur de vues
        $article->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function showBySlug(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)->firstOrFail();
        
        // Incrémenter le compteur de vues
        $article->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
    }

    public function update(Request $request, Article $article): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:articles,slug,' . $article->id],
            'content' => ['sometimes', 'string'],
            'image_url' => ['nullable', 'string'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'tags' => ['nullable', 'array'],
            'is_published' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'published_at' => ['nullable', 'date'],
        ]);

        if (isset($data['title']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
        }

        $article->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Article mis à jour.',
            'data' => $article
        ]);
    }

    public function destroy(Article $article): JsonResponse
    {
        $article->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé.'
        ]);
    }
}
