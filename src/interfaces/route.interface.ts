import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import React from 'react';

/**
 * @name IRoute
 * @description Interface for route object
 */
export interface IRoute {
    icon?: IconDefinition;
    name: string;
    path: string;
    routerPath: string;
    element: React.FC;
    protected: boolean;
    showInNavbar: boolean;
}
