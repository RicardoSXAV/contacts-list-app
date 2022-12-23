import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import DropShadow from 'react-native-drop-shadow';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainStackParamsList } from '../../routes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleFavoriteContact } from '../../store/contacts';
import Text from '../../components/Text';
import { config } from '../../styles';
import AvatarIcon from '../../assets/icons/avatar.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import Phone from '../../assets/icons/phone.svg';
import Email from '../../assets/icons/email.svg';
import Building from '../../assets/icons/building.svg';
import Star from '../../assets/icons/star.svg';

interface ContactDetailsProps
  extends StackScreenProps<MainStackParamsList, 'ContactDetails'> {}

export default function ContactDetails({ route }: ContactDetailsProps) {
  const { data, backgroundColor } = route.params;

  const { goBack } = useNavigation();
  const { favoriteContact } = useAppSelector((state) => state.contactsList);
  const dispatch = useAppDispatch();
  const safeArea = useSafeAreaInsets();

  const detailsOpacity = useRef(new Animated.Value(0)).current;
  const isFavoriteContact = favoriteContact?.recordID === data.recordID;

  useEffect(() => {
    Animated.timing(detailsOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [detailsOpacity]);

  return (
    <View style={styles.screenContainer}>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: safeArea.top,
            backgroundColor: config.colors.darkBlueGray,
            zIndex: 10,
          }}
        />
      )}

      <DropShadow style={styles.headerDropShadow}>
        <View style={styles.detailsHeader}>
          <TouchableOpacity
            style={styles.chevronContainer}
            onPress={() => goBack()}
          >
            <ChevronLeft
              fill="white"
              width={25}
              height={25}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>

          <Text fontFamily="semiBold" fontSize={20} color="white">
            Contact Details
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
        </View>
      </DropShadow>

      <DropShadow style={styles.detailsDropShadow}>
        <Animated.View
          style={[styles.detailsContainer, { opacity: detailsOpacity }]}
        >
          {data.hasThumbnail ? (
            <FastImage
              source={{ uri: data.thumbnailPath }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
            >
              <AvatarIcon fill="white" width={150} height={150} />
            </View>
          )}

          <Text
            fontFamily="semiBold"
            fontSize={20}
            color={config.colors.black}
            style={{ marginVertical: 15 }}
          >
            {data.displayName}
          </Text>

          {data.phoneNumbers.length ? (
            <Phone fill={config.colors.darkBlueGray} width={20} height={20} />
          ) : null}
          {data.phoneNumbers.map(({ number }) => (
            <Text key={number}>{number}</Text>
          ))}

          {data.emailAddresses.length ? (
            <Email fill={config.colors.darkBlueGray} width={20} height={20} />
          ) : null}
          {data.emailAddresses.map(({ email }) => (
            <Text key={email}>{email}</Text>
          ))}

          {data.company && (
            <Building
              fill={config.colors.darkBlueGray}
              width={20}
              height={20}
            />
          )}
          <Text>{data.company}</Text>
        </Animated.View>
      </DropShadow>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
  },
  detailsHeader: {
    width: '100%',
    height: 60,
    backgroundColor: config.colors.darkBlueGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingVertical: 50,
    backgroundColor: config.colors.white,
    width: '80%',
    borderRadius: 30,
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  headerDropShadow: {
    width: '100%',
    height: 60,
    shadowColor: config.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  detailsDropShadow: {
    width: '100%',
    alignItems: 'center',
    shadowColor: config.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  chevronContainer: {
    position: 'absolute',
    left: 20,
  },
  chevronLeft: {},
  starContainer: {
    position: 'absolute',
    left: '86%',
  },
});
