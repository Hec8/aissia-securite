<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::query();

        // Pour le public, ne montrer que les services actifs
        if (!$request->has('all')) {
            $query->active();
        }

        $services = $query->ordered()->get();

        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $service = Service::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Service créé avec succès.',
            'data' => $service
        ], 201);
    }

    public function show(Service $service): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    public function update(Request $request, Service $service): JsonResponse
    {
        $data = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:255', 'unique:services,slug,' . $service->id],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $service->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Service mis à jour.',
            'data' => $service
        ]);
    }

    public function destroy(Service $service): JsonResponse
    {
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service supprimé.'
        ]);
    }
}
