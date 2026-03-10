<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobOffer;
use Illuminate\Support\Str;

class JobOfferController extends Controller
{
    // Public: list active offers
    public function index(Request $request)
    {
        $offers = JobOffer::where('is_active', true)->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $offers,
        ]);
    }

    // Public: show single by slug
    public function show($slug)
    {
        $offer = JobOffer::where('slug', $slug)->firstOrFail();

        return response()->json(['success' => true, 'data' => $offer]);
    }

    // Admin: store
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'profiles' => 'nullable|string',
            'conditions' => 'nullable|string',
            'location' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $data['slug'] = Str::slug($data['title']);

        $offer = JobOffer::create($data);

        return response()->json(['success' => true, 'data' => $offer], 201);
    }

    // Admin: update
    public function update(Request $request, JobOffer $jobOffer)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'profiles' => 'nullable|string',
            'conditions' => 'nullable|string',
            'location' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        $jobOffer->update($data);

        return response()->json(['success' => true, 'data' => $jobOffer]);
    }

    // Admin: show by id (returns JSON 404 if not found)
    public function adminShow($id)
    {
        $offer = JobOffer::find($id);
        if (!$offer) {
            return response()->json(['success' => false, 'message' => 'Offre introuvable'], 404);
        }
        return response()->json(['success' => true, 'data' => $offer]);
    }

    // Admin: destroy
    public function destroy(JobOffer $jobOffer)
    {
        $jobOffer->delete();
        return response()->json(['success' => true, 'data' => null]);
    }
}
