<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CVService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CVController extends Controller
{
    public function __construct(
        private readonly CVService $cvService
    ) {}

    public function getCV(): StreamedResponse|array
    {
        $latestCV = $this->cvService->getLatestCV();
        
        if (!$latestCV) {
            return ['error' => 'No CV found'];
        }

        $path = 'cv/' . $latestCV;
        
        if (!Storage::disk('public')->exists($path)) {
            return ['error' => 'CV file not found'];
        }

        return Storage::disk('public')->download($path, $latestCV, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $latestCV . '"'
        ]);
    }

    public function generate(): array
    {
        try {
            $filename = $this->cvService->generateCV();
            return [
                'message' => 'CV generated successfully',
                'filename' => $filename
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }
}
