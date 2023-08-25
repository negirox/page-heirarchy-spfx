import * as React from 'react';
import styles from './Delphipages.module.scss';
import { IDelphipagesProps } from './IDelphipagesProps';
import { Container } from './Container';

export default class Delphipages extends React.Component<IDelphipagesProps, {}> {
  public render(): React.ReactElement<IDelphipagesProps> {
    const { context, currentPageId, displayMode, domElement, onConfigure, pageEditFinished,
      pagesToDisplay, showTitle, themeVariant, updateTitle, title, treeExpandTo, treeFrom, children } = this.props;
    return (
      <section className={styles.delphipages}>
        <Container context={context} currentPageId={currentPageId}
          displayMode={displayMode} domElement={domElement} onConfigure={onConfigure}
          pageEditFinished={pageEditFinished} pagesToDisplay={pagesToDisplay}
          showTitle={showTitle} themeVariant={themeVariant} title={title} treeExpandTo={treeExpandTo} treeFrom={treeFrom}
          updateTitle={updateTitle} children={children}  />
      </section>
    );
  }
}
