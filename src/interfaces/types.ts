export interface ImageData {
  id: string;
  image: {
    compressed: {
      url: string;
    };
    original: {
      url: string;
    };
  };
}

export interface ApiResponse {
  success: boolean;
  status: number;
  count: number;
  images: ImageData[];
}
