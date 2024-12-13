import React, { 
  useCallback, 
  useState, 
  useMemo, 
  useRef 
} from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { ImageGridItem } from "../Home/ImageGridItem";
import { PhotoData } from "@/lib/types";
import FullScreenImageViewer from "@/components/Home/FullScreenImageViewer";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native";
import Loader from "../Loader";
import { getApiUrl } from '@/utils/env';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Search = React.memo(({
  onSearchChange,
}: {
  onSearchChange?: (query: string) => void;
}) => {
  const [images, setImages] = useState<PhotoData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const flashListRef = useRef<FlashList<PhotoData[]> | null>(null);
  const columnWidth = (screenWidth - 24) / 2;
  const [isLoading, setIsLoading] = useState(true);
  const isInitialLoad = useRef(true);
  // Add a ref to store the FlatList
  const flatListRef = useRef<FlatList>(null);
  // Optimized image filtering
  const filteredImages = useMemo(() => 
    searchTerm
      ? images.filter((image) =>
          image.alt_description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : images,
    [images, searchTerm]
  );

  // Memoized like toggle
  const toggleLike = useCallback((imageId: string) => {
    setLikedImages((current) =>
      current.includes(imageId)
        ? current.filter((id) => id !== imageId)
        : [...current, imageId]
    );
  }, []);

  // Fetch images with search
  const fetchImages = useCallback(async (currentPage: number, resetData = false) => {
    if (!hasMoreImages && !resetData) return;
    if (isInitialLoad.current || resetData) {
      setIsLoading(true);
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        getApiUrl(`photos?page=${currentPage}&query=${searchTerm}}`)
      );
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      
      const imagesWithHeight = data.photos.results.map((image: PhotoData) => ({
        ...image,
        height: Math.floor(Math.random() * (240 - 160 + 1)) + 160
      }));

      setImages(prev => resetData ? imagesWithHeight : [...prev, ...imagesWithHeight]);
      setHasMoreImages(imagesWithHeight.length > 0);
      setPage(currentPage);
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsSearching(false);
      setIsLoading(false);
    }
  }, [hasMoreImages, searchTerm]);


  const imageColumns = useMemo(() => {
    if (images.length === 0) return [];
    
    const columns: PhotoData[][] = [[], []];
    images.forEach((image, index) => {
      columns[index % 2].push(image);
    });
    
    return columns;
  }, [images]);

  const loadMoreImages = () => {
    if (!isLoading && hasMoreImages) {
      fetchImages(page + 1);
    }
  };

  // Render image column
  const renderImageColumn = useCallback(({ item: column, index }: { item: PhotoData[], index: number }) => (
    <View 
      key={index} 
      className="flex-1"
      style={{ 
        marginHorizontal: 4,
        maxWidth: columnWidth 
      }}
    >
      {column.map((image : PhotoData) => (
        <ImageGridItem 
          key={image.id}
          image={image}
          columnWidth={columnWidth}
          isLiked={likedImages.includes(image.id)}
          onImagePress={setSelectedImage}
          onLikeToggle={toggleLike}
        />
      ))}
    </View>
  ), [columnWidth, likedImages, toggleLike]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="p-4">
        <View className="relative flex-row items-center">
          <TextInput
            className="bg-white border dark:text-white border-gray-300 rounded-xl px-4 py-2 pl-10 text-gray-700 dark:bg-gray-700 flex-1"
            placeholder="Search..."
            style={{ height: 50 }}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity
            className="absolute right-2 bg-black rounded-full"
            onPress={() => fetchImages(1, true)}
            style={{ height: 40, width: 40, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="search" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>


      {images.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/Search2.png")}
            style={{ width: 300, height: 300 }}
          />
          <Text className="text-2xl font-bold text-gray-600 dark:text-gray-300">
            No Images Found
          </Text>
        </View>
      ) : (
        isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={imageColumns}
            renderItem={renderImageColumn}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={{ 
              paddingHorizontal: 8,
              paddingTop: 16 
            }}
            refreshControl={
              <RefreshControl
                refreshing={isLoading && (isInitialLoad.current || isSearching)} 
                onRefresh={() => fetchImages(1, true)}
              />
            }
            onEndReached={loadMoreImages}
            onEndReachedThreshold={0.5}
            maintainVisibleContentPosition={{ // Add this prop
              minIndexForVisible: 0,
            }}
          />
        )


      )}

      {selectedImage && (
        <FullScreenImageViewer
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={filteredImages}
        />
      )}
    </KeyboardAvoidingView>
  );
});

export default Search;