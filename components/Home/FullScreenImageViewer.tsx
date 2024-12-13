import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  PanResponder,
  StyleSheet
} from 'react-native';
import { ArrowLeft, Download, Brush } from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface ImageUrls {
  small?: string;
  medium?: string;
  large?: string;
  regular?: string;
}

interface ImageItem {
  id: string;
  urls: ImageUrls;
}

const FullScreenImageViewer = ({ 
  selectedImage, 
  setSelectedImage, 
  images 
}: {
  selectedImage: ImageItem, 
  setSelectedImage: (image: any) => void, 
  images: ImageItem[]
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    images.findIndex(img => img.id === selectedImage.id)
  );
  const [imageSize, setImageSize] = useState<{width: number, height: number}>({ width: 0, height: 0 });

  // Get current image after potential index change
  const currentImage = images[currentImageIndex];

  // Determine best available image URL
  const getBestImageUrl = (urls: ImageUrls) => {
    return urls.regular || urls.large || urls.medium || urls.small;
  };

  useEffect(() => {
    if (currentImage && currentImage.urls) {
      const imageUrl = getBestImageUrl(currentImage.urls);
      
      if (imageUrl) {
        Image.getSize(
          imageUrl, 
          (width, height) => {
            setImageSize({ width, height });
          },
          (error) => {
            console.error('Failed to get image size', error);
          }
        );
      }
    }
  }, [currentImage?.urls]);

  // Swipe gesture handler
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      const { dx } = gestureState;
      
      // Swipe threshold
      if (Math.abs(dx) > 50) {
        if (dx > 0 && currentImageIndex > 0) {
          // Swipe right (previous image)
          setCurrentImageIndex(prev => prev - 1);
        } else if (dx < 0 && currentImageIndex < images.length - 1) {
          // Swipe left (next image)
          setCurrentImageIndex(prev => prev + 1);
        }
      }
    }
  });

  // Calculate image dimensions to cover full screen
  const calculateImageStyle = () => {
    const { width: imgWidth, height: imgHeight } = imageSize;
    
    if (imgWidth === 0 || imgHeight === 0) return { width: 0, height: 0 };

    const screenAspectRatio = screenWidth / screenHeight;
    const imageAspectRatio = imgWidth / imgHeight;

    let width, height;
    if (screenAspectRatio > imageAspectRatio) {
      // Screen is wider than image
      width = screenWidth;
      height = screenWidth / imageAspectRatio;
    } else {
      // Image is wider than screen
      height = screenHeight;
      width = screenHeight * imageAspectRatio;
    }

    return {
      width,
      height,
      position: 'absolute' as 'absolute',
      top: (screenHeight - height) / 2,
      left: (screenWidth - width) / 2
    };
  };

  if (!currentImage) return null;

  const imageUrl = getBestImageUrl(currentImage.urls);

  return (
    <Modal 
      visible={!!selectedImage} 
      transparent={false}
      animationType="slide"
    >
      <SafeAreaView style={styles.container}>
        {/* Top Navigation */}
        <View style={styles.topNavigation}>
          <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
          <Text style={styles.topNavigationText}>
            {`Wallpaper ${currentImageIndex + 1} of ${images.length}`}
          </Text>
        </View>

        {/* Full Screen Image with Swipe */}
        <View 
          style={styles.imageContainer}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: imageUrl }}
            style={calculateImageStyle()}
            resizeMode="cover"
          />
        </View>

        {/* Bottom Action Bar */}
        <View style={styles.bottomActionBar}>
          <TouchableOpacity style={styles.actionButton}>
            <Download color="white" size={24} />
            <Text style={styles.actionButtonText}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Brush color="white" size={24} />
            <Text style={styles.actionButtonText}>Set Wallpaper</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topNavigationText: {
    color: 'white',
    marginLeft: 16,
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActionBar: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)', // Dark gray with opacity
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});

export default FullScreenImageViewer;