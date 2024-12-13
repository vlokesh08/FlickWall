import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { Category } from '@/lib/types';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    className="mb-4"
    contentContainerStyle={{ paddingHorizontal: 12 }}
  >
    {categories.map((category) => (
      <TouchableOpacity
        key={category.id}
        onPress={() => onSelectCategory(category.id)}
        className={`px-4 py-2 rounded-xl mr-2 ${
          selectedCategory === category.id
            ? 'bg-green-500'
            : 'bg-gray-200 dark:bg-gray-700'
        }`}
      >
        <Text
          className={`${
            selectedCategory === category.id
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);