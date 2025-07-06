<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CVSectionResource\Pages;
use App\Models\CVSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Forms\Components\Section;

class CVSectionResource extends Resource
{
    protected static ?string $model = CVSection::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'CV Management';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Basic Information')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('subtitle')
                            ->maxLength(255),
                        TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Toggle::make('active')
                            ->default(true)
                    ])->columns(2),

                Section::make('Main Bullets')
                    ->schema([
                        Repeater::make('bullets')
                            ->schema([
                                TextInput::make('text')
                                    ->required()
                                    ->maxLength(255)
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['text'] ?? null)
                    ]),

                Section::make('Subsections')
                    ->schema([
                        Repeater::make('subsections')
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('subtitle')
                                    ->maxLength(255),
                                Repeater::make('bullets')
                                    ->schema([
                                        TextInput::make('text')
                                            ->required()
                                            ->maxLength(255)
                                    ])
                                    ->defaultItems(0)
                                    ->reorderable()
                                    ->collapsible()
                                    ->itemLabel(fn (array $state): ?string => $state['text'] ?? null)
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('subtitle')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('order')
                    ->sortable(),
                ToggleColumn::make('active')
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
            ])
            ->defaultSort('order')
            ->reorderable('order')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCVSections::route('/'),
            'create' => Pages\CreateCVSection::route('/create'),
            'edit' => Pages\EditCVSection::route('/{record}/edit'),
        ];
    }
} 