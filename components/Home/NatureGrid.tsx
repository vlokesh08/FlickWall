import React, { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FullScreenImageViewer from "@/components/Home/FullScreenImageViewer";
import Logo from "@/components/Logo";

import { ImageProps, Category, PhotoData } from "@/lib/types";
import { CATEGORIES, NATURE_IMAGES } from "@/lib/constants";
import { CategorySelector } from "./CategorySelector";
import { ImageGridItem } from "./ImageGridItem";
import Loader from "../Loader";
import { getApiUrl } from "@/utils/env";

export default function NatureGrid() {
  const [selectedImage, setSelectedImage] = useState<PhotoData | null>(null);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const isInitialLoad = useRef(true);
  // Add a ref to store the FlatList
  const flatListRef = useRef<FlatList>(null);
  // Responsive calculations
  const screenWidth = Dimensions.get("window").width;
  const columnWidth = (screenWidth - 24) / 2;

  const fetchImages = useCallback(
    async (currentPage: number, resetData = false) => {
      if (!hasMoreImages && !resetData) return;

      if (isInitialLoad.current || resetData) {
        setIsLoading(true);
      }
      try {
        const response = await fetch(
          getApiUrl(`photos?page=${currentPage}${
            selectedCategory !== "all" ? `&query=${selectedCategory}` : ""
          }`)
        );
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();

        const imagesWithHeight = data.photos.results.map(
          (image: PhotoData) => ({
            ...image,
            height: Math.floor(Math.random() * (240 - 160 + 1)) + 160,
          })
        );

        setImages((prev) =>
          resetData ? imagesWithHeight : [...prev, ...imagesWithHeight]
        );
        if (isInitialLoad.current) {
          isInitialLoad.current = false;
        }
        setHasMoreImages(imagesWithHeight.length > 0);
        setPage(currentPage);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCategory, hasMoreImages]
  );

  useEffect(() => {
    fetchImages(1, true);
  }, [selectedCategory, fetchImages]);

  const toggleLike = useCallback((imageId: string) => {
    setLikedImages((current) =>
      current.includes(imageId)
        ? current.filter((id) => id !== imageId)
        : [...current, imageId]
    );
  }, []);

  const renderImageColumn = useCallback(
    ({ item: column, index }: { item: PhotoData[]; index: number }) => (
      <View
        key={index}
        className="flex-1"
        style={{
          marginHorizontal: 4,
          maxWidth: columnWidth,
        }}
      >
        {column.map((image: PhotoData) => (
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
    ),
    [columnWidth, likedImages, toggleLike]
  );

  // Memoized column splitting
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

  // if(isLoading ) {
  //   return (
  //     <Loader />
  //   )
  // }

  if (images.length === 0 && !isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 dark:background-secondary">
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-gray-600 mt-1 dark:text-white">
            No images found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-#F3F4F6 dark:bg-#4B5563">
      <View style={{ height: 120 }}>
        <View className="px-4 mb-4 flex-row gap-3 items-center justify-center" style={{ marginTop: 20}}>
          <Logo size={24} />
          <Text className="text-2xl font-bold text-gray-600 mt-1 dark:text-white">
            FlickWall
          </Text>
        </View>
        <CategorySelector
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={imageColumns}
          renderItem={renderImageColumn}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingTop: 16,
          }}
          // ListHeaderComponent={
          //   <>
          //     <View className="px-4 mb-4 flex-row gap-3 items-center justify-center">
          //       <Logo size={24} />
          //       <Text className="text-2xl font-bold text-gray-600 mt-1 dark:text-white">
          //         FlickWall
          //       </Text>
          //     </View>
          //     <CategorySelector
          //       categories={CATEGORIES}
          //       selectedCategory={selectedCategory}
          //       onSelectCategory={setSelectedCategory}
          //     />
          //   </>
          // }
          refreshControl={
            <RefreshControl
              refreshing={isLoading && (isInitialLoad.current)}
              onRefresh={() => fetchImages(1, true)}
            />
          }
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <FullScreenImageViewer
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
      )}
    </SafeAreaView>
  );
}
