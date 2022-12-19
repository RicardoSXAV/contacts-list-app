import React from 'react';
import { View, StyleSheet } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

import { config } from '../../styles';
import Text from '../Text';

interface ContactSectionHeaderProps {
  title: string;
}

export default function ContactSectionHeader({
  title,
}: ContactSectionHeaderProps) {
  return (
    <DropShadow style={styles.dropShadow}>
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.titleText} fontFamily="semiBold">
          {title}
        </Text>
      </View>
    </DropShadow>
  );
}

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    backgroundColor: config.colors.darkBlueGray,
    minWidth: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: config.colors.white,
  },
  dropShadow: {
    shadowColor: config.colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});
