export interface AlbumTracks {
    href:     string;
    limit:    number;
    next:     string;
    offset:   number;
    previous: string;
    total:    number;
    items:    Item[];
}

export interface Item {
    artists:           LinkedFrom[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    is_playable:       boolean;
    linked_from:       LinkedFrom;
    restrictions:      Restrictions;
    name:              string;
    preview_url:       string;
    track_number:      number;
    type:              string;
    uri:               string;
    is_local:          boolean;
}

export interface LinkedFrom {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name?:         string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Restrictions {
    reason: string;
}
