import { Colors } from '@/constants/Colors';
import { useLayoutEffect, useState, useMemo } from 'react';
import { SearchBarProps } from 'react-native-screens';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type UseNavigationSearchProps = {
  searchBarOption?: SearchBarProps;
  placeholder?: string;
};

const useNavigationSearch = ({ searchBarOption, placeholder = 'Search' }: UseNavigationSearchProps) => {
  const [search, setSearch] = useState<string>('');
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent }) => {
    setSearch(nativeEvent.text);
  };

  const defaultSearchOptions = useMemo(
    () => ({
      tintColor: theme.tabIconSelected,
      hideWhenScrolling: false,
    }),
    [theme.tabIconSelected]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOption,
        onChangeText: handleOnChangeText,
        placeHolder: placeholder,
        onBlur: () => setSearch(''),
        onCancelButtonPress: () => setSearch(''),
        onSubmitEditing: () => setSearch(search),
      },
    });
  }, [navigation, search, colorScheme, searchBarOption, defaultSearchOptions, placeholder]);

  return search;
};

export default useNavigationSearch;