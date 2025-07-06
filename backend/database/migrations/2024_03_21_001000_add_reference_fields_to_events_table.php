<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('reference_name')->nullable();
            $table->string('reference_job_title')->nullable();
            $table->string('reference_company')->nullable();
            $table->string('reference_phone')->nullable();
            $table->string('reference_email')->nullable();
            $table->text('reference_relationship')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn([
                'reference_name',
                'reference_job_title',
                'reference_company',
                'reference_phone',
                'reference_email',
                'reference_relationship'
            ]);
        });
    }
}; 