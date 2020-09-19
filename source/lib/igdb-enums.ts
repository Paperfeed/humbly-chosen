export enum Endpoint {
  AchievementIcons = 'achievement_icons',
  Achievements = 'achievements',
  AgeRatingContentDescriptions = 'age_rating_content_descriptions',
  AgeRatings = 'age_ratings',
  AlternativeNames = 'alternative_names',
  Artworks = 'artworks',
  CharacterMugShots = 'character_mug_shots',
  Characters = 'characters',
  Collections = 'collections',
  Companies = 'companies',
  CompanyLogos = 'company_logos',
  CompanyWebsites = 'company_websites',
  Covers = 'covers',
  ExternalGames = 'external_games',
  Feeds = 'feeds',
  Franchises = 'franchises',
  GameEngineLogos = 'game_engine_logos',
  GameEngines = 'game_engines',
  GameModes = 'game_modes',
  GameVersionFeatureValues = 'game_version_feature_values',
  GameVersionFeatures = 'game_version_features',
  GameVersions = 'game_versions',
  GameVideos = 'game_videos',
  Games = 'games',
  Genres = 'genres',
  InvolvedCompanies = 'involved_companies',
  Keywords = 'keywords',
  MultiplayerModes = 'multiplayer_modes',
  PageBackgrounds = 'page_backgrounds',
  PageLogos = 'page_logos',
  PageWebsites = 'page_websites',
  Pages = 'pages',
  PlatformLogos = 'platform_logos',
  PlatformVersionCompanies = 'platform_version_companies',
  PlatformVersionReleaseDates = 'platform_version_release_dates',
  PlatformVersions = 'platform_versions',
  PlatformWebsites = 'platform_websites',
  Platforms = 'platforms',
  PlayerPerspectives = 'player_perspectives',
  ProductFamilies = 'product_families',
  PulseGroups = 'pulse_groups',
  PulseSources = 'pulse_sources',
  PulseUrls = 'pulse_urls',
  Pulses = 'pulses',
  ReleaseDates = 'release_dates',
  Screenshots = 'screenshots',
  Search = 'search',
  Themes = 'themes',
  TimeToBeat = 'time_to_beats',
  Titles = 'titles',
  Websites = 'websites',
}

export enum ExternalGameCategory {
  Steam = 1,
  Gog = 5,
  Youtube = 10,
  Microsoft = 11,
  Apple = 13,
  Twitch = 14,
  Android = 15,
}

export enum ExternalGameMedia {
  Digital = 1,
  Physical = 2,
}

export enum GameField {
  AgeRatings = 'age_ratings', //	Reference ID for Age Rating	The PEGI rating
  AggregatedRating = 'aggregated_rating', //	Double	Rating based on external critic scores
  AggregatedRatingCount = 'aggregated_rating_count', //	Integer	Number of external critic scores
  AlternativeNames = 'alternative_names', //	Array of Alternative Name IDs	Alternative names for this game
  Artworks = 'artworks', //	Array of Artwork IDs	Artworks of this game
  Bundles = 'bundles', //	Reference ID for Game	The bundles this game is a part of
  Category = 'category', //	Category Enum	The category of this game
  Checksum = 'checksum', //	uuid	Hash of the object
  Collection = 'collection', //	Reference ID for Collection	The series the game belongs to
  Cover = 'cover', //	Reference ID for Cover	The cover of this game
  CreatedAt = 'created_at', //	Unix Time Stamp	Date this was initially added to the IGDB database
  Dlcs = 'dlcs', //	Reference ID for Game	DLCs for this game
  Expansions = 'expansions', //	Reference ID for Game	Expansions of this game
  ExternalGames = 'external_games', //	Array of External Game IDs	External IDs this game has on other services
  FirstReleaseDate = 'first_release_date', //	Unix Time Stamp	The first release date for this game
  Follows = 'follows', //	Integer	Number of people following a game
  Franchise = 'franchise', //	Reference ID for Franchise	The main franchise
  Franchises = 'franchises', //	Array of Franchise IDs	Other franchises the game belongs to
  GameEngines = 'game_engines', //	Array of Game Engine IDs	The game engine used in this game
  GameModes = 'game_modes', //	Array of Game Mode IDs	Modes of gameplay
  Genres = 'genres', //	Array of Genre IDs	Genres of the game
  Hypes = 'hypes', //	Integer	Number of follows a game gets before release
  InvolvedCompanies = 'involved_companies', //	Array of Involved Company IDs	Companies who developed this game
  Keywords = 'keywords', //	Array of Keyword IDs	Associated keywords
  MultiplayerModes = 'multiplayer_modes', //	Array of Multiplayer Mode IDs	Multiplayer modes for this game
  Name = 'name', //	String
  ParentGame = 'parent_game', //	Reference ID for Game	If a DLC, expansion or part of a bundle, this is the main game or bundle
  Platforms = 'platforms', //	Array of Platform IDs	Platforms this game was released on
  PlayerPerspectives = 'player_perspectives', //	Array of Player Perspective IDs	The main perspective of the player
  Popularity = 'popularity', //	Double	The popularity score of the game
  PulseCount = 'pulse_count', //	Integer	Number of pulse articles for this game
  Rating = 'rating', //	Double	Average IGDB user rating
  RatingCount = 'rating_count', //	Integer	Total number of IGDB user ratings
  ReleaseDates = 'release_dates', //	Array of Release Date IDs	Release dates of this game
  Screenshots = 'screenshots', //	Array of Screenshot IDs	Screenshots of this game
  SimilarGames = 'similar_games', //	Reference ID for Game	Similar games
  Slug = 'slug', //	String	A url-safe, unique, lower-case version of the name
  StandaloneExpansions = 'standalone_expansions', //	Reference ID for Game	Standalone expansions of this game
  Status = 'status', //	Status Enum	The status of the games release
  Storyline = 'storyline', //	String	A short description of a games story
  Summary = 'summary', //	String	A description of the game
  Tags = 'tags', //	Array of Tag Numbers	Related entities in the IGDB API
  Themes = 'themes', //	Array of Theme IDs	Themes of the game
  TimeToBeat = 'time_to_beat', //	Reference ID for Time To Beat	How long the game takes to be completed
  TotalRating = 'total_rating', //	Double	Average rating based on both IGDB user and external critic scores
  TotalRatingCount = 'total_rating_count', //	Integer	Total number of user and external critic scores
  UpdatedAt = 'updated_at', //	Unix Time Stamp	The last date this entry was updated in the IGDB database
  Url = 'url', //	String	The website address (URL) of the item
  VersionParent = 'version_parent', //	Reference ID for Game	If a version, this is the main game
  VersionTitle = 'version_title', //	String	Title of this version (i.e Gold edition)
  Videos = 'videos', //	Reference ID for Game Video	Videos of this game
  Websites = 'websites', //	Reference ID for Website	Websites associated with this game
}

export enum GameCategory {
  MainGame,
  DLCAddon,
  Expansion,
  Bundle,
  StandaloneExpansion,
  Mod,
  Episode,
  Season,
}

export enum GameStatus {
  Released,
  Alpha,
  Beta,
  EarlyAccess,
  Offline,
  Cancelled,
  Rumored,
}

export enum AgeRatingCategory {
  ESRB = 1,
  PEGI = 2,
}

export enum AgeRating {
  Three = 1,
  Seven = 2,
  Twelve = 3,
  Sixteen = 4,
  Eighteen = 5,
  RP = 6,
  EC = 7,
  E = 8,
  E10 = 9,
  T = 10,
  M = 11,
  AO = 12,
}

export enum WebsiteCategory {
  Official = 1,
  Wikia = 2,
  Wikipedia = 3,
  Facebook = 4,
  Twitter = 5,
  Twitch = 6,
  Instagram = 8,
  Youtube = 9,
  Iphone = 10,
  Ipad = 11,
  Android = 12,
  Steam = 13,
  Reddit = 14,
  Itch = 15,
  Epicgames = 16,
  Gog = 17,
  Discord = 18,
}
