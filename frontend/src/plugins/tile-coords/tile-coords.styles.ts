/** @format */

import { css } from 'styled-components';
import { TileCoordsProps } from './index';

/**
 * Base styles for the seeker list component
 *
 * @param _ The seeker list properties object
 * @return Base styles for the seeker list component
 */
const baseStyles = (_: Partial<TileCoordsProps>) => css`
    /* h3 {
        margin-bottom: 0;
    } */

    .tile-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .element,
    .axis {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .axis {
        color: #143063;
    }

    .axis.q {
        transform: translate(-19px, -3px);
    }

    .axis.r {
        transform: translate(22px, -21px);
    }

    .axis.s {
        transform: translate(-17px, -40px);
    }

    .element.q {
        transform: translate(-44px, 35px);
    }

    .element.r {
        transform: translate(50px, -18px);
    }

    .element.s {
        transform: translate(-51px, -63px);
    }

    .coordinates {
        margin-top: 1em;
    }
`;

/**
 * The seeker list component styles
 *
 * @param props The seeker list properties object
 * @return Styles for the seeker list component
 */
export const styles = (props: Partial<TileCoordsProps>) => css`
    ${baseStyles(props)}
`;
