import * as React from 'react';
import { useState } from 'react';
import styles from './Layouts.module.scss';
import { ActionButton } from 'office-ui-fabric-react';
import { ILayoutProps } from './ILayoutProps';
import ReactResizeDetector from 'react-resize-detector';
import * as strings from 'DelphipagesWebPartStrings';
import { IPage } from '../../../../models/IPage';

export const ListLayout: React.FunctionComponent<ILayoutProps> = props => {
  const [elementWidth, setElementWidth] = useState(props.domElement.getBoundingClientRect().width);

  /*
    min page width before responsive 1024
  * 3 column = each 33.33%
  * 1/3 left or right (33.33% & 66.66%)
  * 1/2 (50%)

  one column =
  two column = 586
  three column = 380

  need to figure out how wide we make buttons based on container

  https://developer.microsoft.com/en-us/fluentui#/controls/web/stack
  Horizontal Stack - Wrapping - Advanced
  */

  if (elementWidth < 380) {
    console.log(elementWidth);
  }

  const renderPage = (page: IPage, index: number, pages: IPage[]):JSX.Element => {
    if (page) {
      return (
        <li className={styles.listLayoutItem}>
          <div className={styles.listLayoutItemContainer}
          >
            <ActionButton
              className={styles.listLayoutItemButton}
              href={page.url}
              target="_self">{page.title}
            </ActionButton>
          </div>
        </li>
      );
    }
  };

  const renderPages = (pages: IPage[], ):JSX.Element[] => {
    return pages.map((value, index, array) => renderPage(value, index, array));
  };

  const onResize = ():void => {
    setElementWidth(props.domElement.getBoundingClientRect().width);
  };

  //<div>DOM Element width: {elementWidth}</div>

  return (
    <div className={styles.layouts}>
      {props.pages.length > 0 ? (
        <ul className={styles.listLayout}>
          {renderPages(props.pages)}
        </ul>
      ) : (
          <span>{strings.Message_NoChildrenFound}</span>
        )}

      <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
    </div>
  );
};
