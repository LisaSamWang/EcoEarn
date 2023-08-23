
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from './firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function RedeemPointsScreen({ navigation }: any) {
    const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
    const [userPoints, setUserPoints] = useState<number>(0);
    const [userEmail, setUserEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    
useFocusEffect(
    React.useCallback(() => {
        const fetchUserDetails = async () => {
            const currentUser = await GoogleSignin.getCurrentUser();
            if (currentUser) {
                const userDocRef = db.collection('users').doc(currentUser.user.email);
                const userDocSnap = await userDocRef.get();
                if (userDocSnap.exists) {
                    const data = userDocSnap.data();
                    setUsername(data?.username || '');
                    setUserEmail(data?.email || '');
                    setUserPoints(data?.points || 0);
                }
            }
        };

        fetchUserDetails();
    }, [])
);

    const handleRedeemForHours = async () => {
        if (pointsToRedeem > userPoints) {
            Alert.alert("Error", "You don't have enough points to redeem.");
            return;
        }
        // Navigate to the confirmation page
        navigation.navigate('RedemptionConfirmation', {
            type: 'hours',
            points: pointsToRedeem,
            email: userEmail,
            username: username
        });
        // Deduct points from user's account
        await db.collection('users').doc(userEmail).update({
            points: userPoints - pointsToRedeem
        });
    };

    const handleRedeemForCash = async () => {
        if (pointsToRedeem > userPoints) {
            Alert.alert("Error", "You don't have enough points to redeem.");
            return;
        }
        // Navigate to the confirmation page
        navigation.navigate('RedemptionConfirmation', {
            type: 'cash',
            points: pointsToRedeem,
            email: userEmail,
            username: username
        });
        // Deduct points from user's account
        await db.collection('users').doc(userEmail).update({
            points: userPoints - pointsToRedeem
        });
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Redeem Points</Text>
            <Text>Available Points: {userPoints}</Text>
            

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text>Points to redeem: </Text>
    <TextInput
        placeholder="0"
        keyboardType="numeric"
        onChangeText={text => {
            const numberValue = Number(text);
            setPointsToRedeem(numberValue >= 0 && !isNaN(numberValue) ? numberValue : 0);
        }}
        value={String(pointsToRedeem)}
    />
</View>


            <Button title="Redeem for Volunteer Hours" onPress={handleRedeemForHours} />
            <Button title="Redeem for Cash" onPress={handleRedeemForCash} />
        </View>
    );
}
