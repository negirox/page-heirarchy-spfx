import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, UrlQueryParameterCollection, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneGroup,
  PropertyPaneChoiceGroup,
  PropertyPaneLabel
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'DelphipagesWebPartStrings';
import Delphipages from './components/Delphipages';
import { IDelphipagesProps } from './components/IDelphipagesProps';
import { PagesToDisplay, Parameters } from '../../utilities';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls';

export interface IDelphipagesWebPartProps {
  title: string;
  debugPageId?: number;
  pagesToDisplay: PagesToDisplay;
  treeFrom: number;
  treeExpandTo: number
}

export default class DelphipagesWebPart extends BaseClientSideWebPart<IDelphipagesWebPartProps> {
  private pageEditFinished: boolean;
  protected onInit(): Promise<void> {
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IDelphipagesProps> = React.createElement(
      Delphipages,
      {
        currentPageId: this.context.pageContext.listItem ? this.context.pageContext.listItem.id : this.getDebugPageId(),
        pagesToDisplay: this.properties.pagesToDisplay,
        themeVariant: null,
        domElement: this.domElement,
        showTitle: true,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateTitle: (t) => { this.properties.title = t; this.render(); },
        onConfigure: () => { this.onConfigure(); },
        pageEditFinished: this.pageEditFinished,
        context: this.context,
        treeFrom: this.properties.treeFrom,
        treeExpandTo: this.properties.treeExpandTo
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
  private onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  /*
  Really only used for workbench mode when we cannot get a page id for the current page.
  We'll allow user to test with a property and also using mock data allow them to navigate when on local host with a querystring
  */
  private getDebugPageId(): number {
    const queryParms = new UrlQueryParameterCollection(window.location.href);
    let debugPageId = this.properties.debugPageId;
    if (queryParms.getValue(Parameters.DEBUGPAGEID)) { debugPageId = Number(queryParms.getValue(Parameters.DEBUGPAGEID)); }

    return debugPageId;
  }
  /*
   when page edit goes from edit to read we start a timer so that we can wait for the save to occur
   Things like the page title and page parent page property changing affect us
  */
  protected onDisplayModeChanged(oldDisplayMode: DisplayMode) :void{
    if (oldDisplayMode === DisplayMode.Edit) {
      setTimeout(() => {
        this.pageEditFinished = true;
        this.render();
      }, 500);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const propertyPaneGroups: IPropertyPaneGroup[] = [];

    // If this webpart isn't on a page, we don't have a list item so let us provide our own to debug
    if (this.context.pageContext.listItem === undefined) {
      propertyPaneGroups.push({
        groupName: strings.PropertyPane_GroupName_Debug,
        isCollapsed: false,
        groupFields: [
          PropertyFieldNumber('debugPageId', {
            key: 'debugPageId',
            value: this.properties.debugPageId,
            label: strings.PropertyPane_Label_DebugPageId,
            description: strings.PropertyPane_Description_DebugPageId,
            minValue: 1,
            disabled: false
          })
        ]
      });
    }

    // add group for choosing display mode
    propertyPaneGroups.push({
      groupName: strings.PropertyPane_GroupName_PagesToDisplay,
      isCollapsed: false,
      groupFields: [
        PropertyPaneChoiceGroup('pagesToDisplay', {
          label: strings.PropertyPane_Label_PagesToDisplay,
          options: [
            {
              key: PagesToDisplay.Ancestors,
              text: strings.PropertyPane_PagesToDisplay_OptionText_Ancestors,
              checked: this.properties.pagesToDisplay === PagesToDisplay.Ancestors,
              iconProps: { officeFabricIconFontName: 'ChevronRightMed' }
            },
            {
              key: PagesToDisplay.Children,
              text: strings.PropertyPane_PagesToDisplay_OptionText_Children,
              checked: this.properties.pagesToDisplay === PagesToDisplay.Children,
              iconProps: { officeFabricIconFontName: 'DistributeDown' }
            },
            {
              key: PagesToDisplay.Tree,
              text: strings.PropertyPane_PagesToDisplay_OptionText_Tree,
              checked: this.properties.pagesToDisplay === PagesToDisplay.Tree,
              iconProps: { officeFabricIconFontName: 'ViewListTree' }
            }
          ]
        }),
        this.properties.pagesToDisplay === PagesToDisplay.Tree && PropertyFieldNumber('treeFrom', {
          key: 'treeFrom',
          value: this.properties.treeFrom,
          label: strings.PropertyPane_Label_TreeFrom,
          description: strings.PropertyPane_Description_TreeFrom,
          minValue: 0,
          disabled: false
        }),
        this.properties.pagesToDisplay === PagesToDisplay.Tree && PropertyFieldNumber('treeExpandTo', {
          key: 'treeExpandTo',
          value: this.properties.treeExpandTo,
          label: strings.PropertyPane_Label_TreeExpandTo,
          description: strings.PropertyPane_Description_TreeExpandTo,
          minValue: 0,
          disabled: false
        })
      ]
    });

    propertyPaneGroups.push({
      groupName: strings.PropertyPane_GroupName_About,
      isCollapsed: false,
      groupFields: [
        PropertyPaneLabel('versionNumber', {
          text: strings.PropertyPane_Label_VersionInfo + this.manifest.version
        })
      ]
    });


    return {
      pages: [
        {
          header: {
            description: strings.PropertyPane_Description
          },
          displayGroupsAsAccordion: true,
          groups: propertyPaneGroups
        }
      ]
    };
  }
}
