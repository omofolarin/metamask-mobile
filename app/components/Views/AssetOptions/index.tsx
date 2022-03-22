import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ReusableModal, { ReusableModalRef } from '../../UI/ReusableModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontStyles } from '../../../styles/common';
import { useNavigation } from '@react-navigation/native';
import { mockTheme, useAppThemeFromContext } from '../../../util/theme';

const createStyles = (colors: any) =>
	StyleSheet.create({
		screen: { justifyContent: 'flex-end' },
		sheet: {
			backgroundColor: colors.background.default,
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
		},
		notch: {
			width: 48,
			height: 5,
			borderRadius: 4,
			backgroundColor: colors.border.default,
			marginTop: 16,
			alignSelf: 'center',
			marginBottom: 24,
		},
		divider: {
			height: 1,
			backgroundColor: colors.border.muted,
		},
		optionButton: {
			height: 60,
			alignItems: 'center',
			justifyContent: 'center',
		},
		optionLabel: {
			...(fontStyles.normal as any),
			color: colors.primary.default,
			fontSize: 16,
		},
	});

interface Option {
	label: string;
	onPress: () => void;
}

const AssetOptions = () => {
	const safeAreaInsets = useSafeAreaInsets();
	const navigation = useNavigation();
	const { colors } = useAppThemeFromContext() || mockTheme;
	const styles = createStyles(colors);
	const modalRef = useRef<ReusableModalRef>(null);

	const openOnEtherscan = () => {
		modalRef.current?.dismissModal(() => {
			navigation.navigate('AssetDetails');
		});
		// const url = `${rpcBlockExplorer}/tx/${transactionHash}`;
		// const title = new URL(rpcBlockExplorer).hostname;
		// navigation.push('Webview', {
		// 	screen: 'SimpleWebview',
		// 	params: { url, title },
		// });
	};

	const openTokenDetails = () => {
		navigation.navigate('');
	};

	const renderOptions = () => {
		const options: Option[] = [
			{ label: 'View on block explorer', onPress: openOnEtherscan },
			{ label: 'Token Details', onPress: openTokenDetails },
		];
		return (
			<>
				{options.map((option) => {
					const { label, onPress } = option;
					return (
						<View key={label}>
							<View style={styles.divider} />
							<TouchableOpacity style={styles.optionButton} onPress={onPress}>
								<Text style={styles.optionLabel}>{label}</Text>
							</TouchableOpacity>
						</View>
					);
				})}
			</>
		);
	};

	return (
		<ReusableModal ref={modalRef} style={styles.screen}>
			<View style={[styles.sheet, { paddingBottom: safeAreaInsets.bottom }]}>
				<View style={styles.notch} />
				{renderOptions()}
			</View>
		</ReusableModal>
	);
};

export default AssetOptions;
