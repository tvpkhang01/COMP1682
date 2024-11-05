import React from 'react';
import { Image, View } from 'react-native';
import avatarImg from '../../assets/avatar.png';

const Avatar = ({ src, size = 40, radius = 50 }) => {
  const style = {
    height: size,
    width: size,
    borderRadius: radius,
    overflow: 'hidden',
  };

  return (
    <View style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
      <Image
        source={src ? { uri: src } : avatarImg}
        style={{ height: '100%', width: '100%', borderRadius: radius }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;
