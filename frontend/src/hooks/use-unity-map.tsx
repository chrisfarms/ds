import { ActionName, useGameState } from '@app/../../core/src';
import { sleep } from '@app/helpers/sleep';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

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

interface SetMobileUnitMessage extends Message {
    mobileUnitID: string;
}

interface SetMapElementMessage extends Message {
    mapElementID: string;
}

// caching previous state sends
let prevPlayerJSON: string | undefined;
let prevPlayersJSON: string | undefined;
let prevTilesJSON: string | undefined;
let prevBuildingsJSON: string | undefined;
let prevSelectionJSON: string | undefined;

// controling how we chunk up the state JSON
const CHUNK_TILES = 50;
const CHUNK_PLAYERS = 100;
const CHUNK_BUILDINGS = 50;

// queue of state to send
let isSending = false;
let gSendMessage: any;
let pendingPlayer: any;
let pendingPlayers: any;
let pendingTiles: any;
let pendingBuildings: any;
let pendingBlock: any;
let pendingSelection: any;
let hasSentAtLeastOneTilesUpdate = false;

// ---

export interface UnityMapContextValue {
    ready?: boolean;
    sendMessage?: (gameObjectName: string, methodName: string, parameter?: any) => void;
}

export const UnityMapContext = createContext<UnityMapContextValue>({});
export const useUnityMap = () => useContext(UnityMapContext);

export const UnityMapProvider = ({ children }: { children: ReactNode }) => {
    const { unityProvider, sendMessage, addEventListener, removeEventListener, loadingProgression } = useUnityContext({
        loaderUrl: `/ds-unity/Build/ds-unity.loader.js`,
        dataUrl: `/ds-unity/Build/ds-unity.data`,
        frameworkUrl: `/ds-unity/Build/ds-unity.framework.js`,
        codeUrl: `/ds-unity/Build/ds-unity.wasm`,
        streamingAssetsUrl: `/ds-unity/StreamingAssets/`,
        companyName: `Playmint`,
        productName: `Downstream`,
        productVersion: `blueprint`,
    });
    const [ready, setReady] = useState(false);
    const {
        world,
        player,
        selectMobileUnit,
        selectMapElement,
        selectTiles,
        selected,
        selectIntent: rawSelectIntent,
    } = useGameState();
    const { dispatch } = player || {};
    const loadingPercentage = Math.round(loadingProgression * 100);

    // We'll use a state to store the device pixel ratio.
    const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);
    const canvasRef = useRef(null);

    const selectIntent = useCallback(
        (intent: string | undefined, tileId?: string) => {
            if (!selectTiles) {
                return;
            }
            if (!rawSelectIntent) {
                return;
            }
            selectTiles(tileId ? [tileId] : []);
            rawSelectIntent(intent);
        },
        [selectTiles, rawSelectIntent]
    );

    useEffect(() => {
        // A function which will update the device pixel ratio of the Unity
        // Application to match the device pixel ratio of the browser.
        const updateDevicePixelRatio = function () {
            setDevicePixelRatio(window.devicePixelRatio);
        };
        // A media matcher which watches for changes in the device pixel ratio.
        const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`);
        if (!mediaMatcher) {
            return;
        }
        // Adding an event listener to the media matcher which will update the
        // device pixel ratio of the Unity Application when the device pixel
        // ratio changes.
        if (!mediaMatcher.addEventListener) {
            return;
        }
        mediaMatcher.addEventListener('change', updateDevicePixelRatio);
        return function () {
            if (!mediaMatcher.addEventListener) {
                return;
            }
            // Removing the event listener when the component unmounts.
            mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
        };
    }, [devicePixelRatio]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (typeof window === 'undefined') {
                return;
            }
            if (!canvasRef.current) {
                return;
            }
            if (!(e.target instanceof Element)) {
                return;
            }
            if (document.activeElement == canvasRef.current) {
                return;
            }
            const tagName = e.target.tagName.toLowerCase();
            if (/select|input|textarea|select/.test(tagName)) {
                return;
            }
            e.stopImmediatePropagation();
            const canvas = canvasRef.current as HTMLElement;
            canvas.focus();
            canvas.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: e.key,
                    keyCode: e.keyCode,
                    code: e.code,
                    which: e.which,
                    shiftKey: false,
                    ctrlKey: false,
                    metaKey: false,
                })
            );
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    useEffect(() => {
        console.warn('setting up timer');
        const timer = setInterval(() => {
            if (isSending) {
                return;
            }
            if (!pendingPlayers && !pendingTiles && !pendingPlayer && !pendingSelection && !pendingBuildings) {
                return;
            }
            isSending = true;
            (async () => {
                try {
                    let args: any[] = [];

                    args.push([
                        'GameStateMediator',
                        'StartOnState',
                        JSON.stringify({ tiles: [], buildings: [], players: [], block: pendingBlock }),
                    ]);

                    // if there is a selection change pending,
                    // then give it priority over the world state
                    // so that the UI feels snappier.
                    // any other updates will occur in the next loop
                    if (pendingSelection && hasSentAtLeastOneTilesUpdate) {
                        if (pendingPlayer) {
                            args.push(pendingPlayer);
                        }
                        args.push(pendingSelection);
                        pendingPlayer = null;
                        pendingSelection = null;
                    } else {
                        if (pendingPlayers) {
                            args = [...args, ...pendingPlayers];
                        }
                        if (pendingTiles) {
                            hasSentAtLeastOneTilesUpdate = true;
                            args = [...args, ...pendingTiles];
                        }
                        if (pendingBuildings) {
                            args = [...args, ...pendingBuildings];
                        }
                        if (pendingPlayer) {
                            args.push(pendingPlayer);
                        }
                        pendingPlayer = null;
                        pendingPlayers = null;
                        pendingTiles = null;
                        pendingBuildings = null;
                        pendingBlock = null;
                    }
                    args.push(['GameStateMediator', 'EndOnState']);

                    for (let i = 0; i < args.length; i++) {
                        gSendMessage(...args[i]);
                        await sleep(0);
                    }
                } finally {
                    isSending = false;
                }
            })().catch((err) => console.error('SendMessage', err));
        }, 25);
        return () => {
            console.warn('clearing timer');
            clearInterval(timer);
        };
    }, []);

    gSendMessage = sendMessage;

    useEffect(() => {
        if (!ready) {
            return;
        }
        if (!world) {
            return;
        }

        if (world.players) {
            const nextPlayersJSON = JSON.stringify(world.players);
            if (nextPlayersJSON != prevPlayersJSON) {
                pendingPlayers = [['GameStateMediator', 'ResetWorldPlayers']];
                for (let i = 0; i < world.players.length; i += CHUNK_PLAYERS) {
                    pendingPlayers.push([
                        'GameStateMediator',
                        'AddWorldPlayers',
                        JSON.stringify(world.players.slice(i, i + CHUNK_PLAYERS)),
                    ]);
                }
                prevPlayersJSON = nextPlayersJSON;
            }
        }

        if (world.tiles) {
            const nextTilesJSON = JSON.stringify(world.tiles);
            if (nextTilesJSON != prevTilesJSON) {
                pendingTiles = [['GameStateMediator', 'ResetWorldTiles']];
                for (let i = 0; i < world.tiles.length; i += CHUNK_TILES) {
                    pendingTiles.push([
                        'GameStateMediator',
                        'AddWorldTiles',
                        JSON.stringify(world.tiles.slice(i, i + CHUNK_TILES)),
                    ]);
                }
                prevTilesJSON = nextTilesJSON;
            }
        }

        if (world.buildings) {
            const nextBuildingsJSON = JSON.stringify(world.buildings);
            if (nextBuildingsJSON != prevBuildingsJSON) {
                pendingBuildings = [['GameStateMediator', 'ResetWorldBuildings']];
                for (let i = 0; i < world.buildings.length; i += CHUNK_BUILDINGS) {
                    pendingBuildings.push([
                        'GameStateMediator',
                        'AddWorldBuildings',
                        JSON.stringify(world.buildings.slice(i, i + CHUNK_BUILDINGS)),
                    ]);
                }
                prevBuildingsJSON = nextBuildingsJSON;
            }
        }

        pendingBlock = world.block;
    }, [ready, world]);

    useEffect(() => {
        if (!ready) {
            return;
        }
        // FIXME: map should allow setting player to null but currently explodes
        if (!player) {
            return;
        }
        const nextPlayerJSON = JSON.stringify(player);
        if (nextPlayerJSON != prevPlayerJSON) {
            pendingPlayer = ['GameStateMediator', 'SetPlayer', nextPlayerJSON];
            prevPlayerJSON = nextPlayerJSON;
        }
    }, [ready, player]);

    useEffect(() => {
        if (!ready) {
            return;
        }
        const nextSelectionJSON = JSON.stringify(selected || {});
        if (nextSelectionJSON != prevSelectionJSON) {
            pendingSelection = ['GameStateMediator', 'SetSelectionState', nextSelectionJSON];
            prevSelectionJSON = nextSelectionJSON;
        }
    }, [ready, selected]);

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
                    dispatch({ name: action as ActionName, args }).catch((err) =>
                        console.error('dispatch from map failed', err)
                    );
                    break;
                }
                case 'selectTiles': {
                    const { tileIDs } = msgObj as SelectTileMessage;
                    if (!selectTiles) {
                        return;
                    }
                    selectTiles(tileIDs);
                    break;
                }
                case 'setIntent': {
                    const { intent } = msgObj as SetIntentMessage;
                    selectIntent(intent);
                    break;
                }
                case 'selectMobileUnit': {
                    const { mobileUnitID } = msgObj as SetMobileUnitMessage;
                    if (!selectMobileUnit) {
                        return;
                    }
                    selectMobileUnit(mobileUnitID);
                    break;
                }
                case 'selectMapElement': {
                    const { mapElementID } = msgObj as SetMapElementMessage;
                    if (!selectMapElement) {
                        return;
                    }
                    selectMapElement(mapElementID);
                    break;
                }
                default: {
                    console.warn('unhandled message from map:', msgObj);
                }
            }
        };

        const processReady = () => {
            setReady(true);
        };

        addEventListener('sendMessage', processMessage);
        addEventListener('unityReady', processReady);

        return () => {
            removeEventListener('sendMessage', processMessage);
            removeEventListener('unityReady', processReady);
        };
    }, [
        dispatch,
        selectTiles,
        selectIntent,
        addEventListener,
        removeEventListener,
        selectMobileUnit,
        selectMapElement,
    ]);

    const value = useMemo(() => {
        return {
            sendMessage,
            ready,
        };
    }, [ready, sendMessage]);

    console.log('ready', ready, loadingPercentage);

    return (
        <UnityMapContext.Provider value={value}>
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
                        borderRadius: '5px',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#143063',
                            height: '100%',
                            width: `${loadingPercentage}%`,
                            transition: 'width .3s',
                            borderRadius: '5px',
                        }}
                    />
                </div>
            )}
            <Unity
                ref={canvasRef}
                style={{ width: '100vw', height: '100vh', position: 'absolute' }}
                unityProvider={unityProvider}
                devicePixelRatio={devicePixelRatio}
                tabIndex={0}
            />
            {children}
        </UnityMapContext.Provider>
    );
};