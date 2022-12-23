import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Contact } from 'react-native-contacts';
import FastImage from 'react-native-fast-image';

import { config, THUMBNAIL_BACKGROUND_COLORS } from '../../styles';
import Text from '../Text';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteContact } from '../../store/contacts';
import { getRandomNumber } from '../../utils/common';
import Star from '../../assets/icons/star.svg';

interface ContactItemProps {
  data: Contact;
}

export default function ContactItem({ data }: ContactItemProps) {
  const { displayName, thumbnailPath, hasThumbnail } = data;
  const { navigate } = useNavigation();

  const { favoriteContact } = useAppSelector((state) => state.contactsList);
  const dispatch = useAppDispatch();

  const isFavoriteContact = favoriteContact?.recordID === data.recordID;
  const randomNumber = useMemo(
    () => getRandomNumber(0, THUMBNAIL_BACKGROUND_COLORS.length - 1),
    [],
  );
  const randomColor = THUMBNAIL_BACKGROUND_COLORS[randomNumber];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={() =>
        navigate('ContactDetails', {
          backgroundColor: randomColor,
          data,
        })
      }
      testID={data.recordID}
    >
      {hasThumbnail ? (
        <FastImage
          source={{ uri: thumbnailPath }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.thumbnail,
            styles.fallbackContainer,
            { backgroundColor: randomColor },
          ]}
        >
          <Text
            fontFamily="medium"
            fontSize={25}
            style={{ color: config.colors.white, marginTop: 5 }}
          >
            {displayName[0].toUpperCase()}
          </Text>
        </View>
      )}
      <Text fontSize={14} fontFamily="medium" color={config.colors.black}>
        {displayName}
      </Text>

      <TouchableOpacity
        style={styles.starContainer}
        onPress={() => dispatch(toggleFavoriteContact({ contact: data }))}
      >
        <Star
          width={30}
          height={30}
          fill={
            isFavoriteContact
              ? config.colors.yellow
              : config.colors.lightBlueGray
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '80%',
    height: 90,
    marginBottom: 20,
    backgroundColor: config.colors.white,
    borderRadius: 15,
    elevation: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    position: 'absolute',
    left: '80%',
  },
});
