import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { GETAPICALL } from '../ApiCalling/ApiCalling';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../utils/theme';

// ✅ Navigation types
export type RootParams = {
    ProductList: undefined;
    ProductDetail: { product: Product };
};

// ✅ Product Interface
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
    const isMounted = useRef(true);
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootParams>>();
    const [visibleCount, setVisibleCount] = useState(7);

    const renderItem = useMemo(
        () => ({ item }: { item: Product }) => (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
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
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: theme.spacing.sm, color: theme.colors.muted }}>
                    Loading products...
                </Text>
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
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.primary}
                            style={{ marginVertical: theme.spacing.sm }}
                        />
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
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.sm,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardWrapper: {
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surface,
        marginVertical: theme.spacing.sm,
        ...theme.shadow.default,
    },
    card: {
        flexDirection: 'row',
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surface,
        // overflow: 'hidden',
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.sm,

    },
    image: {
        width: 70,
        height: 70,
        borderRadius: theme.radius.sm,
        marginRight: theme.spacing.sm,
        resizeMode: 'contain',
    },
    title: {
        fontSize: theme.typography.medium,
        fontWeight: '600',
        color: theme.colors.text,
    },
    category: {
        fontSize: theme.typography.small,
        color: theme.colors.muted,
        marginVertical: 2,
    },
    price: {
        fontSize: theme.typography.medium,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: 4,
    },
});
