/** @format */

import { FunctionComponent, useState } from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { ComponentProps } from '@app/types/component-props';
import { styles } from './tile-action.styles';
import {
    PluginStateComponent,
    PluginStateComponentContent,
    PluginStateComponentContentType,
    PluginStateButtonAction,
    PluginStateButtonToggle,
    PluginSubmitCallValues
} from '@core';

type ToggleContentFunc = (contentID: string) => void;

type PluginContentTypeMap = {
    [k in PluginStateComponentContentType]: string;
};

export interface TileActionProps extends ComponentProps {
    component: PluginStateComponent;
}

const StyledTileAction = styled('div')`
    ${styles}
`;

const PluginContent = ({
    content,
    toggleContent
}: {
    content: PluginStateComponentContent;
    toggleContent: ToggleContentFunc;
}) => {
    const saferHTML = { __html: content.html ? DOMPurify.sanitize(content.html) : '' };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.submit) {
            return;
        }
        const formData = new FormData(e.currentTarget);
        const values: PluginSubmitCallValues = {};
        for (const entry of formData.entries()) {
            values[entry[0]] = entry[1].toString();
        }
        content.submit(values);
    };

    const clickActionButton = (btn: PluginStateButtonAction) => {
        btn.action(); // TODO: I think we should suspend here
    };

    const clickToggleButton = (btn: PluginStateButtonToggle) => {
        toggleContent(btn.content);
    };

    return (
        <div className="content">
            <form onSubmit={submit}>
                <div dangerouslySetInnerHTML={saferHTML} />
                {content.buttons?.map((btn) => {
                    switch (btn.type) {
                        case 'action':
                            return (
                                <button key={btn.text} onClick={() => clickActionButton(btn)}>
                                    {btn.text}
                                </button>
                            );
                        case 'toggle':
                            return (
                                <button key={btn.text} onClick={() => clickToggleButton(btn)}>
                                    {btn.text}
                                </button>
                            );
                        default:
                            return 'undefined';
                    }
                })}
            </form>
        </div>
    );
};

export const TileAction: FunctionComponent<TileActionProps> = (props: TileActionProps) => {
    const { component, ...otherProps } = props;
    const [contentIdForType, setContentIdForType] = useState<PluginContentTypeMap>({
        inline: 'default',
        popout: '',
        dialog: ''
    });

    const getVisibleContentForType = (
        type: PluginStateComponentContentType
    ): PluginStateComponentContent | undefined => {
        const activeID = contentIdForType[type];
        return component.content?.find((c) => c.id === activeID);
    };

    const toggleContent: ToggleContentFunc = (reqContentId) => {
        const content = component.content?.find((c) => c.id === reqContentId);
        if (!content) {
            return;
        }
        const prevContentId = contentIdForType[content.type];
        let nextContentId = reqContentId;
        if (prevContentId === nextContentId || nextContentId === '') {
            if (content.type === 'inline') {
                // inline is special, default back to default content
                nextContentId = 'default';
            } else {
                // hide the content area
                nextContentId = '';
            }
        } else {
            nextContentId = content.id;
        }

        setContentIdForType({ ...contentIdForType, [content.type]: nextContentId });
    };

    const inline = getVisibleContentForType('inline');
    const popout = getVisibleContentForType('popout');
    const dialog = getVisibleContentForType('dialog');

    return (
        <StyledTileAction {...otherProps}>
            <table className="component" style={{ width: '100%', fontSize: '70%' }}>
                <tbody>
                    <tr>
                        <td>title</td>
                        <td>{component.title}</td>
                    </tr>
                    <tr>
                        <td>summary</td>
                        <td>{component.summary}</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>{component.type}</td>
                    </tr>
                    <tr>
                        <td>inline:</td>
                        <td>
                            {inline ? (
                                <PluginContent content={inline} toggleContent={toggleContent} />
                            ) : (
                                <div>no visible content</div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>popout:</td>
                        <td>
                            {popout ? (
                                <PluginContent content={popout} toggleContent={toggleContent} />
                            ) : (
                                <div>no visible content</div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>dialog:</td>
                        <td>
                            {dialog ? (
                                <PluginContent content={dialog} toggleContent={toggleContent} />
                            ) : (
                                <div>no visible content</div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </StyledTileAction>
    );
};