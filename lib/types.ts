export interface ImageProps {
    id: string;
    url: string;
    height: number;
  }
  
  export interface Category {
    id: string;
    name: string;
  }

  export interface PhotoData {
    id: string;
    slug: string;
    alternative_slugs: {
        [key: string]: string; // Maps language codes to slugs
    };
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: string[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[]; // Array of collections the user has added this photo to
    sponsorship: any | null; // Sponsorship details if available
    topic_submissions: Record<string, any>; // Dynamic topic submission data
    asset_type: string; // Type of asset, e.g., "photo"
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string | null;
        portfolio_url: string | null;
        bio: string | null;
        location: string | null;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: string | null;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        total_promoted_photos: number;
        total_illustrations: number;
        total_promoted_illustrations: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: string | null;
            portfolio_url: string | null;
            twitter_username: string | null;
            paypal_email: string | null;
        };
    };
}
