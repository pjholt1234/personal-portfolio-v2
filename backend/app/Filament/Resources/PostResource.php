<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Models\Post;
use App\Models\Project;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PostResource extends Resource
{
    use HasBlocks;

    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('project_id')
                    ->label('Project')
                    ->relationship('project', 'title')
                    ->required()
                    ->searchable()
                    ->preload(),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(Post::class, 'slug', ignoreRecord: true, modifyRuleUsing: function ($rule, $get) {
                        return $rule->where('project_id', $get('project_id'));
                    })
                    ->maxLength(255)
                    ->rules(['regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'])
                    ->helperText('URL-friendly slug (lowercase letters, numbers, and hyphens only). Must be unique within the project.'),
                Textarea::make('excerpt')
                    ->label('Excerpt')
                    ->rows(3)
                    ->maxLength(500),
                DateTimePicker::make('published_at')
                    ->label('Published At')
                    ->helperText('Leave empty to keep as draft'),
                Builder::make('content')
                    ->blocks(self::getBlocks())
                    ->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('project.title')
                    ->label('Project')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('slug')
                    ->searchable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Published'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('project_id')
                    ->label('Project')
                    ->relationship('project', 'title')
                    ->searchable()
                    ->preload(),
                Tables\Filters\Filter::make('published_at')
                    ->label('Published')
                    ->query(fn (EloquentBuilder $query): EloquentBuilder => $query->whereNotNull('published_at')),
                Tables\Filters\Filter::make('draft')
                    ->label('Draft')
                    ->query(fn (EloquentBuilder $query): EloquentBuilder => $query->whereNull('published_at')),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('published_at', 'desc');
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
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
