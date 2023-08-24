
import React from 'react';

// import React, { useState, PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SignUpScreen, SignInScreen } from './AuthScreens';
import { JobsBoardScreen } from './JobsBoard';
import { UserProfileScreen } from './UserProfile';
import { PostJobScreen } from './PostJob';
import { RedeemPointsScreen } from './RedeemPoints';
import { RedemptionConfirmationScreen } from './RedemptionConfirmation';
import { Image, ImageBackground } from 'react-native';
type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  BottomTabNavigator: undefined;
  PostJob: undefined;
  RedemptionConfirmation: undefined;


};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
//make the bottom navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="JobsBoard">
      <Tab.Screen name="JobsBoard" component={JobsBoardScreen} options={{
        title: 'Jobs Board', tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={{
                uri:
                  leaf_img_src,
              }}
            />
          );
        }
      }} />
      <Tab.Screen name="PostJob" component={PostJobScreen} options={{
        title: 'Post Job', tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={{
                uri:
                  post_job_src,
              }}
            />
          );
        }
      }} />
      <Tab.Screen name="RedeemPoints" component={RedeemPointsScreen} options={{
        title: 'Redeem Points', tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={{
                uri:
                  redeem_pts_src,
              }}
            />
          );
        }
      }} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} options={{
        title: 'User Profile', tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={{
                uri:
                  user_profile_src,
              }}
            />
          );
        }
      }} />
    </Tab.Navigator>
  );
}
export default function App(): JSX.Element {
  return (
    <ImageBackground source={require("./EcoEarn-logos.jpeg")} style={{ flex: 1 }}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="RedemptionConfirmation"
          component={RedemptionConfirmationScreen}
          options={{ headerLeft: () => null }}  // This line removes the back button
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ImageBackground>
  );
}

const leaf_img_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEX///+O4msA2oAAuaCS4mpD3HkA2HgA2n+I4WIAuKEA3H4AxZbY9+eK4WWM4mgA2HmG4F/k+N34/faS43Dz/PDn+eDs+ubC77Cn6I2i54f2/POY5Xir6ZLW9Mq57KWv6pfK8bze9tXR99+87am065+d7L+K6bQNvJyd5n/A7q7k+uuw8MrG9Ni58tAx3olZ4plv5aWn7sRG35Ji45+B6K453o3R88V756qz8MxT34HI8bnL9dzZ+OlFyrB96LW869+N3crJyQUOAAAHpUlEQVR4nO2daVviSBCASZztjgw5CAER5FJkkFW8j9U59v//qu0EFMEE+qgyiVvvp/kyMe9T1dXdlaSpVAiCIAiCIAiCIAiCIAiCIAiCIIpNGLVazXpMsxV18r4bQDr13vO43XWDBEew+FdgTY9Ohr1WmPcNGhA1H/qHDWHlup5nfcTzXKHrdI/OyugZ9fpTS7ilmaWJdtsH9TJZhgNXSm5d05s+N/O+c0laDVfFbqXpBt54VIZQTpXCt44bWINe0SV7gb5gEkqnMa7nLbGVtkEIXyPpNIYFDmTDWNCKA+mMW3mbZAEhGOM67VHeLukcmmfpEs+ZFtJx6EAZCsegiI6hBRbExLFdvMI6ciAVxUJgEOWttEk9daWtj+se5K20STTVW7dl4jSKNhzDNmC5ifGCcdFS9QhY0XKtXt5OG4ArWsFRwVZybeCxKMJYsNEYmuyi0vGck7yt1uiATv0LnMNCZWrTcKeYhmsVaokDuUR9xXOGeWu9B77aCIJ+3lrviBAExWBs5+31jgeEPBWDcVqgxwJw++E1xUZx1nAthHoq8BrF6eL0MYpN3CUvTIMcp9jEG+PCRPEMJ4hiwVQURawgirGIV26i2rGgNpOr2SdIQbS8LvAitTN7Op1c2myN6vxqcvrS2fanOjjl1IrnRTC5sHZ9dcOY7/uc2+tw7vuM2bd357Os/z3ACqLljEH0atc3cyG3qbbpyfz7v9MvgLHHeFUcGuu9TKopgcvQZJfp2YqzsFkomm2manecbY/dBv5t6nVwVqcJXkO/2oTXN2p6Mew87VIdkCdu6bhHmn7RHVfWE/D0II7Rao3YLj7o+M1u1cO3VEy93ggvTQXqE3/tiunpZRrCPBjOQDlPo0ff1/XLNERb18QEat3w06qBn82v0q+KOCUKPAW/F1tz/C1hxxkXxhS0XOlGcfioPwAXgndZl0ZNU8uVLDbntkmCxoIZOSqoo6apO5ASvDMMIGen2RcPMaupWLxJ9DRm94YB5Oxi2/UHeGtTgbd7xriomgVQpOhWwUoPddK3gl1BPDXMUCGYsXV6Ba2ZscDb0Qe/ZYZ+9rYxuABxCxUTbOtLhTeGQzBz2/SeZ9T5wnK3bPc7c2NBbu9uSjVxB6LlZc6JM9t0CGZtCzfAFbQyXyuaSbYotuFnz/TvwGtIJWTt9mvGs0QcQqlOAvJ8YTmpW4xjgAja/s46mhCiLtxEEA9T/ui58TRox2VGStDsJX4Zgo+1BkRQNoSVygHuQEypNRcggtyW7efh7i/iWoMiaPsTSUHs/cWH9vCT8UptaZj5vOIDR8gDcX1dcwEkyC+lBTF73wlrj9ugBHdtmtZoIZcay1m9vAhTRRNDecFKpftpaXoMJug/qhji9qPeVdMZxFJtgdSa+w3s+cIKltV0DiYoPxkuQC41r53TS+P94BtqSYo/XyzSdAJVRm3VJMXfXyRr02NAQW4rPtnqYBs6D5UKwJZ+ZXijJgjyhelWvHZlAjcIxTDc0UL8CMaL0Ws0QLa8bzD5NekS9GXNt38A/WxeVRVEb5ta3/6CNJTfOK3ATlNYQ9W5IiZCTlNgQ523dZDTFNQw4+WZHSBP+qCG0i2odXDTFNSQ/dQyxHxBCtaQz/VemkP6QAHBUO5pRQqotQbSUGeuSEBtSAEacq778VHYQAwipKHyvuINzMfBgIb+tbZhWA5D9X3FCsSeG5whv9cXxNzqwxlqLmjQgwhnyIw+OsJ7fwjM0KCSJjxj5SmYoUElTUCbE6EMOTf9Ms704Dp0Q9016Qqk1SmUof9ibNjCGYlAhtIvmGwDp9gAGbInAEOcPIUx5BnfjSiCkqcwhmbrmRUPCPUUxFD1sWg2Y/goghiazvYrEE5agjDkcyjBeH0KrQhhqPIGzU7AG28AhiovQUkA/fGluSFXeI9NCuAuv7khAyszrwxBE9XY0IfN0QTQbYapIecYJ8L11M6oRzXM/EbUDMAzXQ0N4QfhkkjzLH5oQ6bx3F4WqNNAjQxVX2JTYwhzwLKJocT3aUY0LYhMNTDc8hkzFH2AMOobYo7BN+pT49Goa8jRqugGz55hqmoa+ty8tyZJ2A+MHLUMObv8zLMmWwOTOOoY+tVPytCV49jRdlQ35OwKeLskQ3TmadZVVUPO5p82AjfodV2dBbmaofCD7Fio0jroKv4ylqKhz+7z9Euo97uBmqS0IffZVV75uU7ruSv3C24qhkJvflqgw4jDUb/rOek/waduyDmr3p/mUD53EI0OjrqOs7P6bDeMj7GcX10UT29JGI2ex4dWsE00wzA+otNn7GZyERXqZP50otGDEG24bvyTmK4b/4JkwpohX+LHML86f7x+Ks4R2ZJ0Ws1Rb3hwMh60D6fTaXcRxKXhfH5/I7h8nFycn9fyvlUYfiZfA1W//0goQS4qU1sa7u/t7e3v5303GNTYynBvL++7wYAMyw8Zlh8yLD9kWH7IsPyQYfkhw/JDhuWHDMsPGZYfMiw/ZFh+/meGX7Kr/9P/6jEMkwMvl4a/8r4bFH77K8M/ed8MCmF8YOLC8GuGUIxE218Y/vqKz0cTOr8Z+77/49+87wOV4z9fcwgSBEEQBEEQBEEQBEEQBEEQBEF85D/qYMReFfO+0wAAAABJRU5ErkJggg=='
const redeem_pts_src = 'https://missionorganiccenter.com/wp-content/uploads/2020/02/loyalty.png'
const post_job_src = 'data:image/png;base64,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'
const user_profile_src = 'data:image/png;base64,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'
