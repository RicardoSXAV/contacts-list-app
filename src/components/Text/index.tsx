import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';

import { config } from '../../styles';

interface TextProps extends RNTextProps {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  fontFamily?: keyof typeof config.fontFamily;
}

export default function Text({
  children,
  style,
  fontSize = 16,
  color,
  textAlign,
  fontFamily = 'regular',
  ...otherProps
}: TextProps) {
  return (
    <RNText
      style={[
        {
          fontSize,
          color,
          textAlign,
          fontFamily: config.fontFamily[fontFamily],
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </RNText>
  );
}
