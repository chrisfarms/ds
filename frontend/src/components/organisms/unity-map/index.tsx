/** @format */

import { ComponentProps } from '@app/types/component-props';
import { ActionName, useGameState, usePlayer, useSelection } from '@dawnseekers/core';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import styled from 'styled-components';
import { styles } from './unity-map.styles';
import React from 'react';

export interface UnityMapProps extends ComponentProps {}

interface Message {
    msg: string;
}

interface DispatchMessage extends Message {
    action: string;
    args: any[];
}

interface SelectTileMessage extends Message {
    tileIDs: string[];
}

interface SetIntentMessage extends Message {
    intent: string;
}

interface SetSeekerMessage extends Message {
    seekerID: string;
}

const StyledUnityMap = styled('div')`
    ${styles}
`;

let globalLastBlob: string | undefined;
let globalSender: any;
let globalDrainTimeout: any;
let globalQueue: string[] = [];
function drainOne() {
    try {
        if (globalQueue.length == 0) {
            return;
        }
        if (!globalSender) {
            return;
        }
        const blob = globalQueue.pop();
        if (!blob) {
            return;
        }
        globalQueue = [];
        const args = ['GameStateMediator', 'OnState', blob];
        globalSender(...args);
    } catch (err) {
        console.error('UnityMap: sendMessage', err);
    } finally {
        globalDrainTimeout = setTimeout(drainOne, 10);
    }
}

export const UnityMap: FunctionComponent<UnityMapProps> = ({ ...otherProps }: UnityMapProps) => {
    const player = usePlayer();
    const { dispatch } = player || {};
    const game = useGameState();
    const { selectTiles, selectIntent: rawSelectIntent, selectSeeker } = useSelection();
    const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression } = useUnityContext({
        loaderUrl: `/ds-unity/Build/ds-unity.loader.js`,
        dataUrl: `/ds-unity/Build/ds-unity.data`,
        frameworkUrl: `/ds-unity/Build/ds-unity.framework.js`,
        codeUrl: `/ds-unity/Build/ds-unity.wasm`,
        streamingAssetsUrl: `/ds-unity/StreamingAssets/`,
        companyName: `Playmint`,
        productName: `Downstream`,
        productVersion: `blueprint`
    });
    const [isReady, setIsReady] = useState(false);
    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);

    // We'll use a state to store the device pixel ratio.
    const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);

    useEffect(() => {
        // A function which will update the device pixel ratio of the Unity
        // Application to match the device pixel ratio of the browser.
        const updateDevicePixelRatio = function () {
            setDevicePixelRatio(window.devicePixelRatio);
        };
        // A media matcher which watches for changes in the device pixel ratio.
        const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
        // Adding an event listener to the media matcher which will update the
        // device pixel ratio of the Unity Application when the device pixel
        // ratio changes.
        mediaMatcher.addEventListener('change', updateDevicePixelRatio);
        return function () {
            // Removing the event listener when the component unmounts.
            mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
        };
    }, [devicePixelRatio]);

    // -- State update

    // [!] hack to force map update through a delayed queue this protects the
    // map from crashing due to recving too many updates in parallel by slowing
    // down the send rate TODO: get rid of this by debouncing the updates
    // elsewhere or at least make the queue less laggy
    useEffect(() => {
        if (!globalDrainTimeout) {
            globalDrainTimeout = setTimeout(drainOne, 1000);
        }
        return () => {
            clearTimeout(globalDrainTimeout);
            globalDrainTimeout = null;
        };
    }, []);

    const newMapBlob = JSON.stringify(game);
    if (isReady && game && globalLastBlob != newMapBlob) {
        console.time('mapsend');
        globalSender = sendMessage;
        globalLastBlob = newMapBlob;
        (window as any).globalLastBlob = globalLastBlob;
        globalQueue.push(newMapBlob);
        drainOne();
        console.timeEnd('mapsend');
    }

    const selectIntent = useCallback(
        (intent: string | undefined, tileId?: string) => {
            selectTiles(tileId ? [tileId] : []);
            rawSelectIntent(intent);
        },
        [selectTiles, rawSelectIntent]
    );

    // -- Event handling

    useEffect(() => {
        if (!addEventListener || !removeEventListener) {
            return;
        }
        // Export this code so it's used both here and the bridge
        const processMessage = (msgJson: any) => {
            let msgObj: Message;
            try {
                msgObj = JSON.parse(msgJson) as Message;
            } catch (e) {
                console.error(e);
                return;
            }

            switch (msgObj.msg) {
                case 'dispatch': {
                    const { action, args } = msgObj as DispatchMessage;
                    if (!dispatch) {
                        console.warn('map attempted to dispatch when there was no player to dispatch with');
                        return;
                    }
                    dispatch({ name: action as ActionName, args });
                    break;
                }
                case 'selectTiles': {
                    const { tileIDs } = msgObj as SelectTileMessage;
                    selectTiles(tileIDs);
                    break;
                }
                case 'setIntent': {
                    const { intent } = msgObj as SetIntentMessage;
                    selectIntent(intent);
                    break;
                }
                case 'selectSeeker': {
                    const { seekerID } = msgObj as SetSeekerMessage;
                    selectSeeker(seekerID);
                    break;
                }
                default: {
                    console.warn('unhandled message from map:', msgObj);
                }
            }
        };

        const processReady = () => {
            setIsReady(true);
        };

        addEventListener('sendMessage', processMessage);
        addEventListener('unityReady', processReady);

        return () => {
            removeEventListener('sendMessage', processMessage);
            removeEventListener('unityReady', processReady);
        };
    }, [dispatch, selectTiles, selectIntent, addEventListener, removeEventListener, selectSeeker]);

    return (
        <StyledUnityMap {...otherProps}>
            {loadingPercentage < 100 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#030f25',
                        height: '30px',
                        width: '100%',
                        maxWidth: '300px',
                        textAlign: 'center',
                        color: '#fff',
                        borderRadius: '5px'
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#143063',
                            height: '100%',
                            width: `${loadingPercentage}%`,
                            transition: 'width .3s',
                            borderRadius: '5px'
                        }}
                    />
                </div>
            )}
            <Unity unityProvider={unityProvider} devicePixelRatio={devicePixelRatio} />
        </StyledUnityMap>
    );
};
