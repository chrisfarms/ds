import { UnityComponentProps, useUnityComponentManager } from '@app/hooks/use-unity-component-manager';
import { memo, useMemo } from 'react';

export interface BagData {
    q: number;
    r: number;
    s: number;
    height: number;
    corner: number; // 0,1,2,3,3,4,5
    selected?: '' | 'none' | 'highlight' | 'outline';
}

export const Bag = memo(
    ({
        id,
        q,
        r,
        s,
        height,
        corner,
        selected,
        onPointerEnter,
        onPointerExit,
        onPointerClick,
    }: UnityComponentProps & BagData) => {
        useUnityComponentManager<BagData>({
            type: 'BagData',
            id,
            data: useMemo(() => ({ q, r, s, height, corner, selected }), [q, r, s, height, corner, selected]),
            onPointerEnter,
            onPointerExit,
            onPointerClick,
        });

        return null;
    }
);