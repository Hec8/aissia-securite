<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('image_url')->nullable()->after('content');
            $table->text('excerpt')->nullable()->after('image_url');
            $table->string('category')->nullable()->after('excerpt');
            $table->json('tags')->nullable()->after('category');
            $table->boolean('is_published')->default(false)->after('tags');
            $table->boolean('is_featured')->default(false)->after('is_published');
            $table->unsignedInteger('views_count')->default(0)->after('is_featured');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['image_url', 'excerpt', 'category', 'tags', 'is_published', 'is_featured', 'views_count']);
        });
    }
};
