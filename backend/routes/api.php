<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\FormationController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\JobOfferController;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

// Global OPTIONS handler for CORS preflight (helps during local dev)
Route::options('{any}', function () {
    $origin = env('FRONTEND_URL', 'http://localhost:3000');
    return response('', 200)
        ->header('Access-Control-Allow-Origin', $origin)
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        ->header('Access-Control-Allow-Credentials', 'true');
})->where('any', '.*');

// Services
Route::get('/services', [ServiceController::class, 'index']);

// Products
Route::get('/products', [ProductController::class, 'index']);

// Formations / Trainings
Route::get('/formations', [FormationController::class, 'index']);
Route::get('/trainings', [FormationController::class, 'index']); // Alias pour le frontend

// Articles / News
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/news', [ArticleController::class, 'index']); // Alias pour le frontend
Route::get('/articles/{slug}', [ArticleController::class, 'showBySlug'])->where('slug', '[a-z0-9\-]+');
Route::get('/news/{slug}', [ArticleController::class, 'showBySlug'])->where('slug', '[a-z0-9\-]+');

// Contact
Route::post('/contact', [ContactMessageController::class, 'store']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']); // Legacy

// Newsletter
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);

// Quote / Devis
Route::post('/quotes', [QuoteController::class, 'store']);
Route::post('/devis', [QuoteController::class, 'store']); // Alias français

// Recruitment / Jobs
Route::get('/jobs', [JobOfferController::class, 'index']);
Route::get('/job-offers', [JobOfferController::class, 'index']); // Alias anglais
Route::get('/recrutement', [JobOfferController::class, 'index']);
Route::get('/jobs/{slug}', [JobOfferController::class, 'show'])->where('slug', '[a-z0-9\-]+');
Route::get('/job-offers/{slug}', [JobOfferController::class, 'show'])->where('slug', '[a-z0-9\-]+');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/admin/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    
    // Dashboard stats
    Route::get('/stats', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'services' => \App\Models\Service::count(),
                'products' => \App\Models\Product::count(),
                'formations' => \App\Models\Formation::count(),
                'articles' => \App\Models\Article::count(),
                'messages' => \App\Models\ContactMessage::count(),
                'unread_messages' => \App\Models\ContactMessage::where('is_read', false)->count(),
                'quotes' => \App\Models\Quote::count(),
                'pending_quotes' => \App\Models\Quote::where('status', 'pending')->count(),
                'newsletter_subscribers' => \App\Models\NewsletterSubscriber::where('is_active', true)->count(),
                'job_offers' => \App\Models\JobOffer::count(),
            ]
        ]);
    });

    // Services CRUD
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services/{service}', [ServiceController::class, 'show']);
    Route::put('/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

    // Products CRUD
    Route::post('/products', [ProductController::class, 'store']);
    Route::get('/products/{product}', [ProductController::class, 'show']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);

    // Formations CRUD
    Route::post('/formations', [FormationController::class, 'store']);
    Route::get('/formations/{formation}', [FormationController::class, 'show']);
    Route::put('/formations/{formation}', [FormationController::class, 'update']);
    Route::delete('/formations/{formation}', [FormationController::class, 'destroy']);

    // Articles CRUD
    Route::post('/articles', [ArticleController::class, 'store']);
    Route::get('/articles/{article}', [ArticleController::class, 'show']);
    Route::put('/articles/{article}', [ArticleController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleController::class, 'destroy']);

    // Contact Messages
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::get('/contact-messages/{contactMessage}', [ContactMessageController::class, 'show']);
    Route::patch('/contact-messages/{contactMessage}/read', [ContactMessageController::class, 'markAsRead']);
    Route::delete('/contact-messages/{contactMessage}', [ContactMessageController::class, 'destroy']);

    // Newsletter
    Route::get('/newsletter', [NewsletterController::class, 'index']);
    Route::delete('/newsletter/{subscriber}', [NewsletterController::class, 'destroy']);

    // Quotes / Devis
    Route::get('/quotes', [QuoteController::class, 'index']);
    Route::get('/quotes/{quote}', [QuoteController::class, 'show']);
    Route::put('/quotes/{quote}', [QuoteController::class, 'update']);
    Route::delete('/quotes/{quote}', [QuoteController::class, 'destroy']);

    // Job Offers CRUD
    Route::get('/job-offers', [JobOfferController::class, 'index']);
    Route::post('/job-offers', [JobOfferController::class, 'store']);
    // Use adminShow which returns JSON 404 when id not found (avoids HTML exception pages)
    Route::get('/job-offers/{id}', [JobOfferController::class, 'adminShow']);
    Route::put('/job-offers/{jobOffer}', [JobOfferController::class, 'update']);
    Route::delete('/job-offers/{jobOffer}', [JobOfferController::class, 'destroy']);

    // Applications (contact messages with attachments)
    Route::get('/applications', [\App\Http\Controllers\Api\ContactMessageController::class, 'applications']);
    Route::get('/contact-messages/{contactMessage}/attachment', [\App\Http\Controllers\Api\ContactMessageController::class, 'downloadAttachment']);
});
