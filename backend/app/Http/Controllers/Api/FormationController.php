<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Formation::query();

        // Pour le public, ne montrer que les formations actives
        if (!$request->has('all')) {
            $query->active();
        }

        // Filtrage par catégorie
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filtrage par niveau
        if ($request->has('level')) {
            $query->where('level', $request->level);
        }

        // Formations mises en avant seulement
        if ($request->has('featured')) {
            $query->featured();
        }

        $formations = $query->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $formations
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'level' => ['nullable', 'string', 'max:50'],
            'category' => ['nullable', 'string', 'max:100'],
            'duration_weeks' => ['required', 'integer', 'min:1', 'max:52'],
            'modules' => ['nullable', 'array'],
            'has_final_exam' => ['boolean'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $formation = Formation::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Formation créée avec succès.',
            'data' => $formation
        ], 201);
    }

    public function show(Formation $formation): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $formation
        ]);
    }

    public function update(Request $request, Formation $formation): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:formations,slug,' . $formation->id],
            'description' => ['nullable', 'string'],
            'level' => ['nullable', 'string', 'max:50'],
            'category' => ['nullable', 'string', 'max:100'],
            'duration_weeks' => ['sometimes', 'integer', 'min:1', 'max:52'],
            'modules' => ['nullable', 'array'],
            'has_final_exam' => ['boolean'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'is_active' => ['nullable', 'boolean'],
            'is_featured' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $formation->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Formation mise à jour.',
            'data' => $formation
        ]);
    }

    public function destroy(Formation $formation): JsonResponse
    {
        $formation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formation supprimée.'
        ]);
    }
}
