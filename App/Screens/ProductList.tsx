import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { GETAPICALL } from '../ApiCalling/ApiCalling';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


//making navigation type safe.
export type RootParams = {
    ProductList: undefined;
    ProductDetail: { product: Product };
};
// ✅ Product Interface (TypeScript type safety)
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

// ✅ React Query fetch function
const fetchProducts = async (): Promise<Product[]> => {
    return await GETAPICALL<Product[]>('/products');
};

const ProductList = () => {

    const isMounted = React.useRef(true);
    React.useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,

    });
    let navigation = useNavigation<NativeStackNavigationProp<RootParams>>()
    // console.log('My loading Data is this >>>>>>>>>>', data);

    const [visibleCount, setVisibleCount] = useState(7); //load only 7 items initially.
    const renderItem = useMemo(
        () => ({ item }: { item: Product }) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                <View style={styles.cardWrapper}>
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.category}>{item.category}</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        ),
        []
    );
    const handleLoadMore = () => {
        if (data && visibleCount < data.length) {
            setVisibleCount(prev => prev + 10);
        }
    };
    const onRefresh = () => {
        refetch();
    };
    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ marginTop: 10, color: '#555' }}>Loading products...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.slice(0, visibleCount) || []}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.2}
                refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRefresh} />}
                ListFooterComponent={
                    visibleCount < (data?.length || 0) ? (
                        <ActivityIndicator size="small" color="#007bff" style={{ marginVertical: 10 }} />
                    ) : null
                }
            />
        </View>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardWrapper: {
        borderRadius: 12,
        backgroundColor: '#fff',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },

    card: {
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
    category: {
        fontSize: 12,
        color: '#777',
        marginVertical: 2,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: 4,
    },
});
