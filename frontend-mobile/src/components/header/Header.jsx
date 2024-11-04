import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../context/AppContext';
import { getAvatarUrl } from '../../api/Api';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiVideoAddFill, RiPlayListAddFill } from 'react-icons/ri';
import HeaderMenu from './menu/Menu';

const Header = () => {
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState('');
  const [onMenu, setOnMenu] = useState(false);
  const authUser = state?.channel;
  const navigation = useNavigation();

  const avatar = getAvatarUrl(authUser?.avatarUrl);

  const handleSearch = () => {
    if (!onSearch) return;
    navigation.navigate('Search', { query: onSearch });
  };

  return (
    <View style={[styles.header, state?.theme === 'dark' ? styles.dark : styles.light]}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={toggleMenu}>
            <GiHamburgerMenu />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logo}>
            <Text>My</Text>
            <Text style={styles.tube}>Tube</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <View style={styles.headerForm}>
            <TextInput
              value={onSearch}
              onChangeText={setOnSearch}
              placeholder="Search"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <FiSearch />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          {authUser && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Upload')} style={styles.headerIcon}>
                <RiVideoAddFill />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Uplist')} style={styles.headerIcon}>
                <RiPlayListAddFill />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => setOnMenu(true)} style={styles.headerIcon}>
            {authUser ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <HiDotsHorizontal />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for HeaderMenu */}
      <Modal visible={onMenu} transparent={true} animationType="fade">
        <HeaderMenu onClose={() => setOnMenu(false)} />
      </Modal>
    </View>
  );
};

const styles = {
  header: {
    height: 70,
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingHorizontal: 20,
    zIndex: 200,
  },
  dark: {
    backgroundColor: '#222',
  },
  light: {
    backgroundColor: '#fff',
  },
  headerWrapper: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tube: {
    color: '#f03a0d',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    marginHorizontal: 20,
    maxWidth: 500,
  },
  headerForm: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchButton: {
    paddingHorizontal: 10,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 10,
    backgroundColor: 'rgba(180, 180, 180, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
};

export default Header;