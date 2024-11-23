import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login/Login';
import TrangChu from './screens/home/TrangChu';
import Header from './screens/home/Header';
import ForgotPassword from './screens/login/ForgotPassword';
import Chitiet from './screens/home/Chitiet';
import GioHang from './screens/home/GioHang';
import { ToastProvider } from 'react-native-toast-message';
import ThanhToan from './screens/home/ThanhToan';

import SignUp from './screens/login/SignUp';
import Footer from './screens/home/Footer';
import CategoryList from './screens/home/CategoryList';
import NewPassword from './screens/login/NewPassword';
import ResetPasswordConfirmation from './screens/login/ResetPasswordConfirmation';
import Welcome from './screens/login/Welcome';
import ThongBao from './screens/home/ThongBao';
import ThongTinTaiKhoan from './screens/home/ThongTinTaiKhoan';
import Favorite from './screens/home/Favorite';





const Stack = createStackNavigator();
export default function App() {
  return (
  
    <NavigationContainer> 
            {/* <ToastProvider> */}
      <Stack.Navigator initialRouteName="Welcome">
       
      <Stack.Screen name="Welcome" component={Welcome} 
        options={{ headerShown: false }}/>

        <Stack.Screen name="Header" component={Header} 
        options={{ headerShown: false }}/>
        
    <Stack.Screen name="CategoryList" component={CategoryList} options={{ headerShown: false }} 
       />
    
        <Stack.Screen name="Login" component={Login}
         options={{ headerShown: false }}/>
        <Stack.Screen name="TrangChu" component={TrangChu} 
        options={{ headerShown: false }}/>
      
        <Stack.Screen name="Chitiet" component={Chitiet}
        options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
         options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp}
         options={{ headerShown: false }} />
                 <Stack.Screen name="NewPassword" component={NewPassword} 
        options={{ headerShown: false }} />
                         <Stack.Screen name="ResetPasswordConfirmation" component={ResetPasswordConfirmation} 
        options={{ headerShown: false }} />


        <Stack.Screen name="Footer" component={Footer}/>

        <Stack.Screen name="GioHang" component={GioHang}
        options={{ headerShown: false }} />
        <Stack.Screen name="ThanhToan" component={ThanhToan}
        options={{ headerShown: false }} />
                <Stack.Screen name="ThongBao" component={ThongBao}
        options={{ headerShown: false }} />
                        <Stack.Screen name="ThongTinTaiKhoan" component={ThongTinTaiKhoan}
        options={{ headerShown: false }} />
                                <Stack.Screen name="Favorite" component={Favorite}
        options={{ headerShown: false }} />





        {/* Thêm các màn hình khác tại đây nếu cần */}
        {/* dan khungf */}
        {/* ssssssssssss */}
        {/* screenssssssssssssssssss */}
        {/* sssssssssssss */}
  
      </Stack.Navigator>
   
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
