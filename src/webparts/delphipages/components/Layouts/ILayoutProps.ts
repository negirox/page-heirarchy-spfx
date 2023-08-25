import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { INavLink } from 'office-ui-fabric-react';
import { IPage } from '../../../../models/IPage';

export interface ILayoutProps {
  domElement: HTMLElement;
  pages: IPage[];
  nav?: INavLink;
  pageId?: number;
  themeVariant?: IReadonlyTheme;
}
