import * as React from 'react';
import { useState } from 'react';
import styles from './Layouts.module.scss';
import { ActionButton, Icon } from 'office-ui-fabric-react';
import { ILayoutProps } from './ILayoutProps';
import ReactResizeDetector from 'react-resize-detector';
import * as strings from 'DelphipagesWebPartStrings';
import { RenderDirection } from '../../../../utilities';
import { IPage } from '../../../../models/IPage';

export const BreadcrumbLayout: React.FunctionComponent<ILayoutProps> = props => {
  const [elementWidth, setElementWidth] = useState(props.domElement.getBoundingClientRect().width);

  // 455 was chosen because that's the smallest break pointin 2 column before it wraps and stacks
  const renderDirection = elementWidth > 455 ? RenderDirection.Horizontal : RenderDirection.Vertical;

  function renderPageAsBreadcrumb(page: IPage, index: number, pages: IPage[]):JSX.Element {
    if (page) {
      return (
        <li key={page.id} className={styles.breadcrumbLayoutItem}>
          <span className={styles.breadcrumbLayoutItemContainer}>
            <ActionButton
              className={styles.breadcrumbLayoutItemButton}
              href={page.url}
              target="_self">
              {page.title}
            </ActionButton>
          </span>

          {index + 1 !== pages.length ?
            (
              <Icon iconName="ChevronRight" className={styles.breadcrumbLayoutHorizontalIcon} />
            ) : null}

        </li>
      );
    }
  }

  function renderPageAsStack(page: IPage, index: number, pages: IPage[]) :JSX.Element {
    if (page) {
      return (
        <li key={page.id} className={styles.breadcrumbLayoutItem}>
          <Icon iconName="ChevronDown" className={styles.breadcrumbLayoutVerticalIcon} />

          <span className={styles.breadcrumbLayoutItemContainer}>
            <ActionButton
              className={styles.breadcrumbLayoutItemButton}
              href={page.url}
              target="_self">
              {page.title}
            </ActionButton>
          </span>
        </li>
      );
    }
  }

  function renderPages(pages: IPage[]): JSX.Element[]{
    if (renderDirection === RenderDirection.Horizontal) {
      return pages.map((value, index, array) => renderPageAsBreadcrumb(value, index, array));
    }
    else {
      return pages.map((value, index, array) => renderPageAsStack(value, index, array));
    }
  }

  const onResize = ():void => {
    setElementWidth(props.domElement.getBoundingClientRect().width);
  };

  //<div>DOM Element width: {elementWidth}</div>

  return (
    <div className={styles.layouts}>

      {props.pages.length > 0 ? (
        <ul className={renderDirection === RenderDirection.Horizontal ? styles.breadcrumbLayoutHorizontal : styles.breadcrumbLayoutVertical}>
          {renderPages(props.pages)}
        </ul>
      ) : (
        <span>{strings.Message_NoAncestorsFound}</span>
      )}

      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </div>
  );
};
