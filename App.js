import { StyleSheet, View, Pressable, Text } from 'react-native';

import { observable, observer } from './mobx/miniMobX';

const x = observable(42);

const SomeComponent = observer(() => {
    return (
        <View>
            <Pressable onPress={() => x.set(x.get() + 1)} style={{ marginBottom: 10 }}>
                <Text>Increment</Text>
            </Pressable>
            <Text>{x.get()}</Text>
        </View>
    );
});

export default function App() {
    return (
        <View style={styles.container}>
            <SomeComponent />
        </View>
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
