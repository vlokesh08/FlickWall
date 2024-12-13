import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Heart } from 'lucide-react-native';
import { ImageProps, PhotoData } from '@/lib/types';

interface ImageGridItemProps {
  image: PhotoData;
  columnWidth: number;
  isLiked: boolean;
  onImagePress: (image: PhotoData) => void;
  onLikeToggle: (imageId: string) => void;
}

export const ImageGridItem: React.FC<ImageGridItemProps> = ({
  image,
  columnWidth,
  isLiked,
  onImagePress,
  onLikeToggle
}) => {
  const aspectRatio = image.height / columnWidth;

  return (
    <TouchableOpacity
      key={image.id}
      onPress={() => onImagePress(image)}
      className="rounded-2xl overflow-hidden bg-gray-200 mb-2"
      style={{ 
        width: columnWidth,
        height: columnWidth * aspectRatio 
      }}
    >
      <Image
        source={{ uri: image?.urls?.regular || image?.urls?.small }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <TouchableOpacity
        onPress={() => onLikeToggle(image.id)}
        className="absolute bottom-2 right-2"
      >
        <Heart
          color={isLiked ? "red" : "white"}
          fill={isLiked ? "red" : "transparent"}
          size={24}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};