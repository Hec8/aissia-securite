<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->string('slug')->unique()->after('title');
            $table->string('level')->nullable()->after('description');
            $table->string('category')->nullable()->after('level');
            $table->decimal('price', 10, 2)->nullable()->after('has_final_exam');
            $table->boolean('is_active')->default(true)->after('price');
            $table->boolean('is_featured')->default(false)->after('is_active');
            $table->integer('sort_order')->default(0)->after('is_featured');
        });
    }

    public function down(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->dropColumn(['slug', 'level', 'category', 'price', 'is_active', 'is_featured', 'sort_order']);
        });
    }
};
