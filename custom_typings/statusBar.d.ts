declare var StatusBar: StatusBar.StatusBarStatic;

declare module StatusBar {
  interface StatusBarStatic {
    isVisible: boolean,
    styleDefault()
  }
}