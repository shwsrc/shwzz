export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export interface LanyardData {
  spotify: SpotifyData | null;
  listening_to_spotify: boolean;
  kv: Record<string, string>;
  discord_user: DiscordUser;
  discord_status: string;
  activities: Activity[];
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  global_name: string | null;
  display_name: string | null;
  discriminator: string;
  bot: boolean;
  avatar: string;
}

export interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  };
  created_at: number;
  timestamps?: {
    start: number;
    end?: number;
  };
  details?: string;
  application_id?: string;
  assets?: {
    small_text?: string;
    small_image?: string;
    large_text?: string;
    large_image?: string;
  };
}