import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { useAppSelector } from '../../hooks';
import Text from '../../components/Text';
import ContactItem from '../ContactItem';
import { config } from '../../styles';
import AvatarIcon from '../../assets/icons/avatar.svg';

export default function FavoriteContactDisplay() {
  const containerHeight = useRef(new Animated.Value(0)).current;
  const { favoriteContact } = useAppSelector((state) => state.contactsList);

  useEffect(() => {
    Animated.timing(containerHeight, {
      toValue: 175,
      duration: 500,
      useNativeDriver: false,
    }).start();

    if (!favoriteContact) {
      Animated.timing(containerHeight, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [containerHeight, favoriteContact]);

  return (
    <Animated.View style={{ height: containerHeight }}>
      {favoriteContact && (
        <View style={styles.favoriteContactContainer}>
          <View style={styles.favoriteContactHeader}>
            <AvatarIcon
              fill={config.colors.yellow}
              width={20}
              height={20}
              style={{ marginRight: 12 }}
            />
            <Text
              fontFamily="semiBold"
              fontSize={20}
              color={config.colors.yellow}
            >
              Favorite Contact
            </Text>
          </View>

          <ContactItem data={favoriteContact} />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {},
  favoriteContactContainer: {
    width: '100%',
    alignItems: 'center',
  },
  favoriteContactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
