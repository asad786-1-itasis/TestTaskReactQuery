import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../utils/theme'; // ✅ using your theme

const { height } = Dimensions.get('window');

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

type ProductDetailRouteProp = RouteProp<
    { ProductDetail: { product: Product } },
    'ProductDetail'
>;

const ProductDetail = () => {
    const route = useRoute<ProductDetailRouteProp>();
    const navigation = useNavigation();
    const { product } = route.params;

    return (
        <ScrollView style={styles.container}>
            {/* Image Section */}
            <View style={[styles.imageContainer, theme.shadow.default]}>
                <Image source={{ uri: product.image }} style={styles.image} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            </View>

            {/* Details Section */}
            <View style={[styles.detailContainer, theme.shadow.default]}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.descriptionHeader}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    );
};

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    imageContainer: {
        height: height / 3,
        backgroundColor: theme.colors.surface,
        borderBottomLeftRadius: theme.radius.lg,
        borderBottomRightRadius: theme.radius.lg,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderBottomLeftRadius: theme.radius.lg,
        borderBottomRightRadius: theme.radius.lg,
    },
    backButton: {
        position: 'absolute',
        top: theme.spacing.lg,
        left: theme.spacing.lg,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 25,
        padding: theme.spacing.sm,
    },
    backText: {
        color: theme.colors.surface,
        fontSize: theme.typography.large,
        fontWeight: '600',
    },
    detailContainer: {
        backgroundColor: theme.colors.surface,
        marginTop: theme.spacing.md,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        marginHorizontal: theme.spacing.md,
    },
    title: {
        fontSize: theme.typography.title,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    category: {
        fontSize: theme.typography.medium,
        color: theme.colors.muted,
        marginBottom: theme.spacing.md,
    },
    price: {
        fontSize: theme.typography.heading,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: theme.spacing.lg,
    },
    descriptionHeader: {
        fontSize: theme.typography.large,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    description: {
        fontSize: theme.typography.medium,
        color: theme.colors.muted,
        lineHeight: 20,
        marginBottom: theme.spacing.lg,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    buttonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.medium,
        fontWeight: '600',
    },
});
