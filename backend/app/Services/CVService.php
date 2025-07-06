<?php

namespace App\Services;

use App\Enums\EventTypesEnum;
use App\Models\Contact;
use App\Models\Event;
use App\Models\Project;
use CVGenerator\CVData;
use CVGenerator\CVGenerator;
use Illuminate\Support\Facades\Storage;
use App\Models\CVSection;

class CVService
{
    private const CV_STORAGE_PATH = 'cv';
    private const CV_FILENAME_PREFIX = 'cv_';

    public function generateCV(): string
    {
        $contact = Contact::first();
        if (!$contact) {
            throw new \Exception('No contact information found');
        }

        $cvData = $this->prepareCVData($contact);
        
        $filename = self::CV_FILENAME_PREFIX . now()->format('Y_m_d_His') . '.pdf';
        $outputPath = Storage::disk('public')->path(self::CV_STORAGE_PATH . '/' . $filename);
        
        if (!Storage::disk('public')->exists(self::CV_STORAGE_PATH)) {
            Storage::disk('public')->makeDirectory(self::CV_STORAGE_PATH);
        }

        $generator = new CVGenerator();
        $generator->generate($cvData->toArray(), $outputPath);

        return $filename;
    }

    public function getLatestCV(): ?string
    {
        $files = Storage::disk('public')->files(self::CV_STORAGE_PATH);
        
        if (empty($files)) {
            return null;
        }

        rsort($files);
        
        return basename($files[0]);
    }

    private function prepareCVData(Contact $contact): CVData
    {
        $cvData = new CVData();
        $cvData->setPersonalInfo(
            $contact->first_name,
            $contact->last_name,
            $contact->address,
            $contact->telephone,
            $contact->email,
            $contact->linkedin,
            'Full stack developer'
        );

        if ($contact->introduction) {
            $cvData->setIntroduction(strip_tags($contact->introduction));
        }

        $this->addExperience($cvData);
        $this->addEducation($cvData);
        $this->addProjects($cvData);
        $this->addOptionalSections($cvData);

        return $cvData;
    }

    private function addExperience(CVData $cvData): void
    {
        $professionalEvents = Event::where('type', EventTypesEnum::PROFESSIONAL->name)
            ->orderBy('start_date', 'desc')
            ->get();

        foreach ($professionalEvents as $event) {
            $reference = null;
            if ($event->reference_name) {
                $reference = [
                    'name' => $event->reference_name,
                    'job_title' => $event->reference_job_title,
                    'company' => $event->reference_company,
                    'phone' => $event->reference_phone,
                    'email' => $event->reference_email,
                    'relationship' => strip_tags($event->reference_relationship)
                ];
            }

            $cvData->addExperience(
                $event->title,
                $event->subtitle,
                $event->start_date->format('M Y'),
                $event->end_date ? $event->end_date->format('M Y') : 'Present',
                [$event->description],
                $reference
            );
        }
    }

    private function addEducation(CVData $cvData): void
    {
        $educationEvents = Event::where('type', EventTypesEnum::EDUCATION->name)
            ->orderBy('start_date', 'desc')
            ->get();

        foreach ($educationEvents as $event) {
            $cvData->addEducation(
                $event->title,
                $event->subtitle,
                $event->start_date->format('M Y'),
                $event->end_date ? $event->end_date->format('M Y') : 'Present',
                [$event->description]
            );
        }
    }

    private function addProjects(CVData $cvData): void
    {
        $projects = Project::where('cv', true)
            ->orderBy('start_date', 'desc')
            ->get();

        if ($projects->isEmpty()) {
            return;
        }

        $renderedProjects = [];

        foreach ($projects as $project) {
            $dateRange = $project->start_date->format('M Y');
            if ($project->end_date) {
                $dateRange .= ' - ' . $project->end_date->format('M Y');
            }

            $subtitle = $project->subtitle . ' (' . $dateRange . ')';

            $bullets = [];
            $bullets[] = $project->description;

            if ($project->technologies->count() > 0) {
                $bullets[] = "Technologies: " . $project->technologies->pluck('name')->join(', ');
            }

            if ($project->github_link) {
                $bullets[] = "GitHub: " . $project->github_link;
            }

            $renderedProjects[] = [
                'title' => $project->title,
                'subtitle' => $subtitle,
                'bullets' => $bullets
            ];
        }

        if (!empty($renderedProjects)) {
            $cvData->addOptionalSection(
                'Projects',
                [],
                '', // Optional subtitle
                $renderedProjects
            );
        }
    }

    private function addOptionalSections(CVData $cvData): void
    {
        $sections = CVSection::where('active', true)
            ->orderBy('order')
            ->get();

        foreach ($sections as $section) {
            $subsections = [];
            $mainBullets = $section->bullets ?? [];

            if (!empty($section->subsections)) {
                foreach ($section->subsections as $sub) {
                    $subsections[] = [
                        'title' => $sub['title'],
                        'subtitle' => $sub['subtitle'] ?? null,
                        'bullets' => array_map(fn($bullet) => $bullet['text'], $sub['bullets'] ?? [])
                    ];
                }
            }

            $mainBullets = array_map(fn($bullet) => $bullet['text'], $mainBullets);

            $cvData->addOptionalSection(
                $section->title,
                $mainBullets,
                $section->subtitle,
                $subsections
            );
        }
    }
} 