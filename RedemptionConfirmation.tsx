
import React from 'react';
import { View, Text, Button } from 'react-native';

export function RedemptionConfirmationScreen({ route, navigation }: any) {
    const { type, points, email, username } = route.params;
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    let confirmationMessage = "";

    if (type === 'hours') {
        const hours = Math.floor(points / 60);
        const minutes = points % 60;
        confirmationMessage = "This confirms that " + username + " (Email: " + email + ") completed " + hours + " hours and " + minutes + " minutes of volunteering at EcoEarn on " + timestamp + ".";
    } else 
if (type === 'cash') {
    const cashAmount = points * 0.01;
    confirmationMessage = "A prepaid card with $" + cashAmount.toFixed(2) + " has been sent to " + email + " (Username: " + username + ") on " + timestamp + ".";
}


    return (
        <View>
            <Text style={{color: 'black'}}>{confirmationMessage}</Text>
            <Button title="Done" onPress={() => navigation.navigate('RedeemPoints')} />
        </View>
    );
}
