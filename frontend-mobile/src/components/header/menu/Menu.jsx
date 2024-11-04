import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../context/AppContext';
import { getAvatarUrl, logout } from '../../../api/Api';
import { FaGear, FaFlag, FaCircleHalfStroke, FiLogOut, FaQuestionCircle } from 'react-icons';

const HeaderMenu = ({ open, onClose }) => {
  const { state, toggleTheme, logoutAuth } = useContext(AppContext);
  const authUser = state?.channel;
  const avatar = getAvatarUrl(authUser?.avatarUrl);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const res = await logout({ name: state?.auth.name });
      if (res.status === 200) {
        logoutAuth();
        onClose(false);
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    open && (
      <View style={[styles.menu, state?.theme === 'dark' ? styles.dark : styles.light]}>
        {authUser && (
          <TouchableOpacity onPress={() => {
            onClose(false);
            navigation.navigate(`Channel`, { id: authUser._id });
          }} style={styles.menuAvatar}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
            <View style={styles.menuInfo}>
              <Text style={styles.name}>{authUser.name}</Text>
              <Text style={styles.viewChannel}>View Channel</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.menuLinks}>
          {authUser ? (
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
              <FiLogOut />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              onClose(false);
              navigation.navigate('Login');
            }} style={styles.authButton}>
              <Text style={styles.loginText}>Sign In</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity onPress={() => {
            toggleTheme();
            onClose(false);
          }} style={styles.menuItem}>
            <FaCircleHalfStroke />
            <Text style={styles.menuText}>
              {state?.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>

          {authUser && (
            <TouchableOpacity onPress={() => {
              onClose(false);
              navigation.navigate('Settings', { id: authUser._id });
            }} style={styles.menuItem}>
              <FaGear />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => {
            onClose(false);
            navigation.navigate('Report');
          }} style={styles.menuItem}>
            <FaFlag />
            <Text style={styles.menuText}>Report</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            onClose(false);
            navigation.navigate('Help');
          }} style={styles.menuItem}>
            <FaQuestionCircle />
            <Text style={styles.menuText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 80,
    right: 0,
    width: 260,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    zIndex: 50,
  },
  dark: {
    backgroundColor: '#333',
    color: '#fff',
  },
  light: {
    backgroundColor: '#fff',
    color: '#333',
  },
  menuAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  menuInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewChannel: {
    fontSize: 14,
    color: '#666',
  },
  menuLinks: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  authButton: {
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HeaderMenu;
