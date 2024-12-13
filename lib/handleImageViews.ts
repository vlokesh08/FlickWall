import { ImageProps, PhotoData } from "./types";


export const splitImagesIntoColumns = (images: PhotoData[], columnCount: number) => {
    const columns: PhotoData[][] = Array.from({ length: columnCount }, () => []);
    
    images.forEach((image, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(image);
    });
    
    return columns;
  };