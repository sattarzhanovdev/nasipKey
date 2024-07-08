export const GetUserInfo = async () => {
   try {
     const userInfoString = await AsyncStorage.getItem('userId');
     if (userInfoString !== null) {
       const userInfo = JSON.parse(userInfoString);
       console.log(userInfo);
       return userInfo;
     }
   } catch (error) {
     console.error('Error retrieving user info from AsyncStorage:', error);
   }
   return null;
 };