declare interface IMyApiLibraryStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'MyApiLibraryStrings' {
  const strings: IMyApiLibraryStrings;
  export = strings;
}
