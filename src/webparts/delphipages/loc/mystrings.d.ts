declare interface IDelphipagesWebPartStrings {
  Configuration_Placeholder_IconText: string;
  Configuration_Placeholder_Description: string;
  Configuration_Placeholder_ButtonLabel: string;
  Message_NoAncestorsFound: string;
  Message_NoChildrenFound: string;
  Message_NoTreeFound: string;
  ParentPageMissing_Placeholder_IconText: string;
  ParentPageMissing_Placeholder_Description: string;
  ParentPageMissing_Placeholder_Description_NoPermissions: string;
  ParentPageMissing_Placeholder_ButtonLabel: string;
  PropertyPane_Description: string;
  PropertyPane_GroupName_About: string;
  PropertyPane_GroupName_PagesToDisplay: string;
  PropertyPane_Label_PagesToDisplay: string;
  PropertyPane_PagesToDisplay_OptionText_Ancestors: string;
  PropertyPane_PagesToDisplay_OptionText_Children: string;
  PropertyPane_PagesToDisplay_OptionText_Tree: string;
  PropertyPane_GroupName_Debug: string;
  PropertyPane_Label_DebugPageId: string;
  PropertyPane_Label_VersionInfo: string;
  PropertyPane_Description_DebugPageId: string;
  PropertyPane_Label_TreeFrom: string;
  PropertyPane_Description_TreeFrom: string;
  PropertyPane_Label_TreeExpandTo: string;
  PropertyPane_Description_TreeExpandTo: string;
}

declare module 'DelphipagesWebPartStrings' {
  const strings: IDelphipagesWebPartStrings;
  export = strings;
}
