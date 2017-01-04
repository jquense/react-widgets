'use strict';

import React  from 'react';
import CustomPropTypes from '../util/propTypes';
import {dataText} from '../util/dataHelpers';

module.exports = {

    propTypes: {
        data: React.PropTypes.array,
        sort: CustomPropTypes.sort
    },

    sort(items, searchTerm){
        const compareFunction = typeof this.props.sort === 'function' ?
            this.props.sort :
            (itemA, itemB) => {
                const dataTextA = dataText(itemA, this.props.textField);
                const dataTextB = dataText(itemB, this.props.textField);

                return dataTextA.localeCompare(dataTextB);
            };

        return [...items].sort((itemA, itemB) => compareFunction(itemA, itemB, searchTerm));
    }
};
