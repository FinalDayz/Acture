import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';

export interface Props {}

const CustomHeaderButton = (props: Props) => {
    return (
        <HeaderButton 
            {...props}
            title='button' 
            IconComponent={Ionicons} 
            iconSize={23} 
            color={colors.textLight}
        />
    );
};

export default CustomHeaderButton;