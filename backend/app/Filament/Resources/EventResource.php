<?php

namespace App\Filament\Resources;

use App\Enums\EventTypesEnum;
use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\RelationManagers;
use App\Models\Event;
use App\Models\File;
use Filament\Forms\Components\Actions\Action;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class EventResource extends Resource
{
    use HasBlocks;

    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->unique(Event::class, 'slug', ignoreRecord: true)
                    ->required(),
                TextInput::make('subtitle'),
                Select::make('type')
                    ->options(EventTypesEnum::toArray())
                    ->required(),
                TextInput::make('icon'),
                Select::make('projects')
                    ->multiple()
                    ->relationship('projects', 'title'),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('description_long')
                    ->columnSpanFull(),
                DatePicker::make('start_date')
                    ->required(),
                DatePicker::make('end_date'),
                Select::make('files')
                    ->multiple()
                    ->relationship('files', 'name'),
                Repeater::make('cvBullets')
                    ->relationship('cvBullets')
                    ->schema([
                        Textarea::make('content')
                            ->required()
                            ->label('CV Bullet Point')
                            ->rows(2),
                    ])
                    ->maxItems(3)
                    ->columnSpanFull(),
                Builder::make('content')
                    ->blocks(self::getBlocks()),
                Section::make('Reference')
                    ->schema([
                        TextInput::make('reference_name')
                            ->label('Reference Name')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->maxLength(255),
                        TextInput::make('reference_job_title')
                            ->label('Reference Job Title')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->maxLength(255),
                        TextInput::make('reference_company')
                            ->label('Reference Company')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->maxLength(255),
                        TextInput::make('reference_phone')
                            ->label('Reference Phone')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->tel()
                            ->maxLength(255),
                        TextInput::make('reference_email')
                            ->label('Reference Email')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->email()
                            ->maxLength(255),
                        RichEditor::make('reference_relationship')
                            ->label('Reference Relationship')
                            ->required(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name)
                            ->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->visible(fn(Get $get): bool => $get('type') === EventTypesEnum::PROFESSIONAL->name),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                Tables\Columns\TextColumn::make('subtitle')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->searchable(),
                Tables\Columns\TextColumn::make('icon')
                    ->searchable(),
                Tables\Columns\TextColumn::make('start_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('end_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('reference_name')
                    ->label('Reference')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('reference_company')
                    ->label('Reference Company')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
