export interface GalleryImage {
	id: string;
	url: string;
	title: string;
	description?: string;
	aspectRatio?: number;
	tags?: string[];
	metadata?: Record<string, any>;
}

export interface GalleryCollection {
	id: string;
	name: string;
	description?: string;
	images: GalleryImage[];
	thumbnailUrl?: string;
	isPublic: boolean;
}

export interface GalleryItemDetail extends GalleryImage {
	dimensions: {
		width: number;
		height: number;
	};
	fileSize: number;
	format: string;
	duration?: number; // For video/audio content
}