<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CVResource\Pages;
use App\Models\CV;
use App\Services\CVService;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class CVResource extends Resource
{
    protected static ?string $model = CV::class;

    protected static ?string $navigationIcon = 'heroicon-o-document';

    protected static ?string $navigationLabel = 'CV Management';

    protected static ?string $modelLabel = 'CV';

    protected static ?string $pluralModelLabel = 'CVs';

    public static function form(Form $form): Form
    {
        return $form;
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('filename')
                    ->label('Filename')
                    ->searchable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Generated At')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\Action::make('download')
                    ->label('Download')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(fn (CV $record): string => route('filament.resources.c-v-s.download', ['filename' => $record->filename]))
                    ->openUrlInNewTab(),
                Tables\Actions\Action::make('delete')
                    ->label('Delete')
                    ->icon('heroicon-o-trash')
                    ->action(function (CV $record): void {
                        Storage::disk('public')->delete('cv/' . $record->filename);
                    })
                    ->requiresConfirmation(),
            ])
            ->headerActions([
                Tables\Actions\Action::make('generate')
                    ->label('Generate New CV')
                    ->icon('heroicon-o-document-plus')
                    ->action(function (CVService $cvService): void {
                        $cvService->generateCV();
                        
                        // Refresh the page to show the new CV
                        redirect(request()->header('Referer'));
                    })
                    ->requiresConfirmation()
                    ->modalHeading('Generate New CV')
                    ->modalDescription('Are you sure you want to generate a new CV? This will create a new PDF file based on your current data.')
                    ->modalSubmitActionLabel('Generate'),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated(false);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCVs::route('/'),
        ];
    }

    public static function getNavigationGroup(): ?string
    {
        return 'Content Management';
    }

    public static function getNavigationSort(): ?int
    {
        return 4;
    }
} 