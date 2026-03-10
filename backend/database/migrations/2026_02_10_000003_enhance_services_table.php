<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('slug')->unique()->after('title');
            $table->string('icon')->nullable()->after('description');
            $table->json('features')->nullable()->after('icon');
            $table->boolean('is_active')->default(true)->after('features');
            $table->integer('sort_order')->default(0)->after('is_active');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['slug', 'icon', 'features', 'is_active', 'sort_order']);
        });
    }
};
