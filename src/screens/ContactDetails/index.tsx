import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import DropShadow from 'react-native-drop-shadow';

import { MainStackParamsList } from '../../routes';
import Text from '../../components/Text';
import { config } from '../../styles';
import AvatarIcon from '../../assets/icons/avatar.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import Phone from '../../assets/icons/phone.svg';
import Email from '../../assets/icons/email.svg';
import Building from '../../assets/icons/building.svg';

interface ContactDetailsProps
  extends StackScreenProps<MainStackParamsList, 'ContactDetails'> {}

export default function ContactDetails({ route }: ContactDetailsProps) {
  const { data, backgroundColor } = route.params;
  const { goBack } = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <DropShadow style={styles.dropShadow}>
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
        </View>
      </DropShadow>

      <View style={styles.detailsContainer}>
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
          style={{ marginVertical: 15 }}
        >
          {data.displayName}
        </Text>

        {data.phoneNumbers.length ? (
          <Phone fill={config.colors.darkBlueGray} width={20} height={20} />
        ) : null}
        {data.phoneNumbers.map(({ number }) => (
          <Text>{number}</Text>
        ))}

        {data.emailAddresses.length ? (
          <Email fill={config.colors.darkBlueGray} width={20} height={20} />
        ) : null}
        {data.emailAddresses.map(({ email }) => (
          <Text>{email}</Text>
        ))}

        {data.company && (
          <Building fill={config.colors.darkBlueGray} width={20} height={20} />
        )}
        <Text>{data.company}</Text>
      </View>
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
  dropShadow: {
    width: '100%',
    height: 60,
    shadowColor: config.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  chevronContainer: {
    position: 'absolute',
    left: 20,
  },
  chevronLeft: {},
});
