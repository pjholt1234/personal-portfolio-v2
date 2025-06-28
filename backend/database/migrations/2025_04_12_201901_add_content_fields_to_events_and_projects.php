<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('content')->nullable()->after('end_date');
            $table->string('slug')->unique()->after('id');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->json('content')->nullable()->after('end_date');
            $table->string('slug')->unique()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('content');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('content');
        });
    }
};
