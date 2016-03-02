declare module ngcordova {

  //// Action Sheet - $cordovaActionSheet
  export interface IActionSheetOptions {
    title?: string;
    buttonLabels: Array<string>;
    addCancelButtonWithLabel?: string;
    androidEnableCancelButton?: boolean;
    winphoneEnableCancelButton?: boolean;
    addDestructiveButtonWithLabel?: string;
  }

  export interface IActionSheet {
    show(options: IActionSheetOptions): angular.IPromise<number>;
    hide(): void;
  }


  //// AdMob - $cordovaAdMob
  export interface IAdMobOptions {
    OPT_PUBLISHER_ID?: string;
    OPT_INTERSTITIAL_AD_ID?: string;
    OPT_AD_SIZE?: string;
    OPT_BANNER_AT_TOP?: string;
    OPT_OVERLAP?: string;
    OPT_OFFSET_TOPBAR?: string;
    OPT_IS_TESTING?: string;
    OPT_AD_EXTRAS?: string;
    OPT_AUTO_SHOW?: string;
  }

  export interface IAdMob {
    createBannerView(options?: any): angular.IPromise<void>;
    createInterstitialView(options?: any): angular.IPromise<void>;
    requestAd(options?: any): angular.IPromise<void>;
    showAd(options?: any): angular.IPromise<void>;
    requestInterstitialAd(options?: any): angular.IPromise<void>;
  }


  //// App Availability - $cordovaAppAvailability
  export interface IAppAvailability {
    check(method: string): angular.IPromise<any>;
  }


  //// App Preferences - $cordovaPreferences
  export interface IAppPreferences {
    set(key: string, value: string): angular.IPromise<string>;
    get(key: string): angular.IPromise<string>;
  }

  //// App Rate - $cordovaAppRate
  export interface IAppRatePreferences {
    language?: string;
    appName?: string;
    openStoreInApp?: boolean;
    usesUntilPrompt?: number;
    promptForNewVersion?: boolean;
    useCustomRateDialog?: string;
    iosURL?: string;
    androidURL?: string;
    windowsURL?: string;
  }

  export interface IAppRate {
    setPreferences(preferences: IAppRatePreferences): void;
    setCustomLocale(customObj: {[key: string]: string}): void;
    promptForRating(immediate: boolean): angular.IPromise<any>;
    onButtonClicked(callback): void;
    onRateDialogShow(callback): void;
  }


  //// App Version - $cordovaAppVersion
  export interface IAppVersion {
    getAppVersion(): angular.IPromise<string>;
  }


  //// Background Geolocation - $cordovaBackgroundGeolocation
  export interface IBackgroundGeolocationOptions {
    url?: string;
    params?: {[key: string]: string};
    headers?: {[key: string]: string};
    desiredAccuracy?: number;
    stationaryRadius?: number;
    distanceFilter?: number;
    notificationTitle?: string;
    notificationText?: string;
    activityType?: string;
    debug?: boolean;
    stopOnTerminate?: boolean;
  }

  export interface IBackgroundGeolocation {
    configure(options: IBackgroundGeolocationOptions): any;
    start(): void;
    stop(): void;
  }


  //// Badge - $cordovaBadge
  export interface IConfigureConfig {
    autoClear: boolean;
  }

  export interface IBadge {
    hasPermission(): angular.IPromise<boolean>;
    promptForPermission(): any;
    set(num: number): void;
    get(): number;
    clear(): angular.IPromise<any>;
    configure(config: IConfigureConfig): void;
  }


  //// Barcode Scanner - $cordovaBarcodeScanner
  export interface IBarcodeScanner {
    scan(): angular.IPromise<any>;
    encode(type: string, text: string): any;
  }


  //// Bluetooth Low Energy  - $cordovaBLE
  export interface IBLE {
    scan(services: any, seconds: number): angular.IPromise<any>;
    connect(deviceId: string): angular.IPromise<any>;
    disconnect(deviceId: string): angular.IPromise<any>;
    read(deviceID: string, serviceUUID: string, characteristicUUID: string): angular.IPromise<any>;
    write(deviceID: string, serviceUUID: string, characteristicUUID: string, data: any): angular.IPromise<any>;
    writeCommand(deviceID: string, serviceUUID: string, characteristicUUID: string, data: any): angular.IPromise<any>;
    notify(deviceID: string, serviceUUID: string, characteristicUUID: string): angular.IPromise<any>;
    indicate(deviceID: string, serviceUUID: string, characteristicUUID: string): angular.IPromise<any>;
    isConnected(): angular.IPromise<void>;
    isEnabled(): angular.IPromise<void>;
  }


  //// Bluetooth Serial  - $cordovaBluetoothSerial
  export interface IBluetoothSerial {
    connect(address: string): angular.IPromise<void>;
    connectInsecure(address: string): angular.IPromise<void>;
    disconnect(): angular.IPromise<void>;
    list(): angular.IPromise<{[key: string]: string}>;
    isEnabled(): angular.IPromise<void>;
    isConnected(): angular.IPromise<void>;
    available(): angular.IPromise<number>;
    read(): angular.IPromise<any>;
    readUntil(delimiter: string): angular.IPromise<any>;
    write(data: any): angular.IPromise<void>;
    subscribe(delimiter: string): angular.IPromise<any>;
    subscribeRawData(): angular.IPromise<any>;
    unsubscribe(): angular.IPromise<void>;
    unsubscribeRawData(): angular.IPromise<void>;
    clear(): angular.IPromise<void>;
    readRSSI(): angular.IPromise<any>;
  }


  //// Calendar  - $cordovaCalendar
  export interface ICalendarOptions {
    startDate: Date;
    endDate?: Date;
    title: string;
    location?: string;
    notes?: string;
    calendarName?: string;
  }

  export interface ICalendarOptionsModify {
    startDate: Date;
    endDate?: Date;
    title: string;
    location?: string;
    notes?: string;
    newTitle: string;
    newLocation: string;
    newNotes: string;
    newStartDate: Date;
    newEndDate: Date;
  }

  export interface ICalendar {
    createCalendar(options: ICalendarOptions): angular.IPromise<string>;
    deleteCalendar(calendarName: string): angular.IPromise<string>;
    createEvent(options?: ICalendarOptions): angular.IPromise<string>;
    createEventWithOptions(options?: ICalendarOptions): angular.IPromise<string>;
    createEventInteractively(options?: ICalendarOptions): angular.IPromise<string>;
    createEventInNamedCalendar(options?: ICalendarOptions): angular.IPromise<string>;
    findEvent(options?: ICalendarOptions): angular.IPromise<any>;
    listEventsInRange(startDate: Date, endDate: Date): angular.IPromise<any>;
    listCalendars(): angular.IPromise<Array<{[key: string]: string}>>;
    findAllEventsInNamedCalendar(calendarName: string): angular.IPromise<any>;
    modifyEvent(options: ICalendarOptionsModify): angular.IPromise<string>;
    deleteEvent(options: ICalendarOptions): angular.IPromise<string>;
  }

  //// FileOpener2 $cordovaFileOpener2
  export interface IFileOpener2 {
    open(fileUrl: string, mimeType: string): angular.IPromise<any>
  }

  //// FileTransfer $cordovaFileTransfer
  export interface IFileTransferDownloadOptions {
    headers?: any
  }

  export interface IFileTransferUploadOptions {
    headers?: any
  }

  export interface IFileTransfer {
    download(url: string, filePath: string, options: IFileTransferDownloadOptions, trustHosts: boolean): angular.IPromise<any>
    upload(server: string, filePath: string, options: IFileTransferUploadOptions, trustAllHosts: boolean): angular.IPromise<any>
  }

  //// ImagePicker $cordovaImagePicker
  export interface IImagePickerOptions {
    maximumImagesCount?: number;
    width?: number;
    height?: number;
    quality?: number;
  }

  export interface IImagePicker {
    getPictures(options: IImagePickerOptions): angular.IPromise<any>
  }

  //// Camera  - $cordovaCamera
  export interface ICameraOptions {
    quality?: number;
    destinationType?: number;
    sourceType?: number;
    allowEdit?: boolean;
    encodingType?: number;
    targetWidth?: number;
    targetHeight?: number;
    mediaType?: string;
    cameraDirection?: number;
    popoverOptions?: string;
    saveToPhotoAlbum?: boolean;
  }

  export interface ICamera {
    getPicture(options: ICameraOptions): angular.IPromise<any>;
    cleanup(): angular.IPromise<void>;
  }

  //// Capture  - $cordovaCapture
  export interface ICaptureAudioOptions {
    limit?: number;
    duration?: number;
  }

  export interface ICaptureImageOptions {
    limit?: number;
  }

  export interface ICaptureVideoOptions {
    limit?: number;
    duration?: number;
  }

  export interface ICapture {
    captureAudio(options: ICaptureAudioOptions): angular.IPromise<any>;
    captureImage(options: ICaptureImageOptions): angular.IPromise<any>;
    captureImage(options: ICaptureVideoOptions): angular.IPromise<any>;
  }


  //// Clipboard  - $cordovaClipboard
  export interface IClipboard {
    copy(text: string): angular.IPromise<any>;
    paste(): angular.IPromise<string>;
  }


  //// Contacts  - $cordovaContacts
  export interface IContactName {
    formatted?: string;
    familyName?: string;
    givenName?: string;
    middleName?: string;
    honorificPrefix?: string;
    honorificSuffix?: string;
  }

  export interface IContactField {
    type: string;
    value: string;
    pref: boolean;
  }

  export interface IContactAddress {
    pref: boolean;
    type: string;
    formatted: string;
    streetAddress?: string;
    locality?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  }

  export interface IContactOrganization {
    pref: boolean;
    type: string;
    name: string;
    department?: string;
    title?: string;
  }

  export interface IContact {
    id: string;
    displayName?: IContactName;
    name?: string;
    nickname?: string;
    phoneNumbers?: Array<IContactField>;
    emails?: Array<IContactField>;
    addresses?: Array<IContactAddress>;
    ims?: Array<IContactField>;
    organizations?: Array<IContactOrganization>;
    birthday?: Date;
    note?: string;
    photos?: Array<IContactField>;
    categories?: Array<IContactField>;
    urls?: Array<IContactField>;
  }

  export interface IContactFindOptions {
    fields?: Array<string>;
  }

  export interface IContacts {
    save(contact: IContact): angular.IPromise<any>;
    remove(contact: IContact): angular.IPromise<any>;
    clone(contact: IContact): angular.IPromise<any>;
    find(options: IContactFindOptions): angular.IPromise<Array<IContact>>;
    pickContact(): angular.IPromise<IContact>;
  }


  //// Date Picker  - $cordovaDatePicker
  export interface IDatePickerOptions {
    mode?: string;
    date?: any;
    minDate?: any;
    maxDate?: any;
    allowOldDates?: boolean;
    allowFutureDates?: boolean;
    doneButtonLabel?: string;
    doneButtonColor?: string;
    cancelButtonLabel?: string;
    cancelButtonColor?: string;
    minuteInterval?: number;
  }

  export interface IDatePicker {
    show(options: IDatePickerOptions): angular.IPromise<Date>;
  }


  //// Device - $cordovaDevice
  export interface IDeviceDevice {
    cordova: string;
    model: string;
    platform: string;
    uuid: string;
    version: string;
    name: string;
  }

  export interface IDevice {
    getDevice(): IDeviceDevice;
    getCordova(): string;
    getModel(): string;
    getName(): string;
    getPlatform(): string;
    getUUID(): string;
    getVersion(): string;
  }


  //// Device Motion - $cordovaDeviceMotion
  export interface IDeviceMotionAcceleration {
    x: number;
    y: number;
    z: number;
    timestamp: number;
  }

  export interface IDeviceMotionAccelerometerOptions {
    period: number;
  }

  export interface IDeviceMotionWatchPromise extends angular.IPromise<IDeviceMotionAcceleration> {
    watchID: number;
    cancel: () => void;
    clearWatch: (watchId?: number) => void;
  }

  export interface IDeviceMotion {
    getCurrentAcceleration(): angular.IPromise<IDeviceMotionAcceleration>;
    watchAcceleration(options: IDeviceMotionAccelerometerOptions): IDeviceMotionWatchPromise;
    clearWatch(watchID: number): void;
  }


  //// Device Orientation - $cordovaDeviceOrientation
  export interface IDeviceOrientationHeading {
    magneticHeading: number;
    trueHeading?: number;
    headingAccuracy?: number;
    timestamp?: number;
  }

  export interface IDeviceOrientationWatchOptions {
    frequency?: number;
    filter?: number;
  }

  export interface IDeviceOrientationWatchPromise extends angular.IPromise<IDeviceOrientationHeading> {
    watchID: number;
    cancel: () => void;
    clearWatch: (watchId?: number) => void;
  }

  export interface IDeviceOrientation {
    getCurrentHeading(): angular.IPromise<IDeviceOrientationHeading>;
    watchHeading(options: IDeviceOrientationWatchOptions): IDeviceOrientationWatchPromise;
    clearWatch(watchID: number): void;
  }


  //// Dialogs - $cordovaDialogs
  export interface IDialogsPromptResult {
    input1: string;
    buttonIndex: number;
  }

  export interface IDialogs {
    alert(message: string, title?: string, buttonName?: string): angular.IPromise<void>;
    confirm(message: string, title?: string, buttonArray?: Array<string>): angular.IPromise<number>;
    prompt(message: string, title?: string, buttonArray?: Array<string>, defaultText?: string): angular.IPromise<IDialogsPromptResult>;
    beep(repetitions: number): void;
  }


  //// EmailComposer - $cordovaEmailComposer
  export interface IEmailComposerProperties {
    to: Array<string>;
    cc?: Array<string>;
    bcc?: Array<string>;
    attachments?: Array<any>;
    subject?: string;
    body?: string;
    isHtml?: boolean;
  }

  export interface IEmailComposer {
    isAvailable(): angular.IPromise<void>;
    open(properties: IEmailComposerProperties);
    addAlias(app: string, schema: string);
  }


  //// Facebook - $cordovaFacebook
  export interface IFacebookDialogOptions {
    method: string;
    link: string;
    caption?: string;
  }

  export interface IFacebookLoginStatus {
    status: string;
    authResponse: {
      session_key: boolean;
      accessToken: string;
      expiresIn: number;
      sig: string;
      secret: string;
      userId: string;
    }
  }

  export interface IFacebook {
    browserInit(id: string, version?: string): void;
    login(permissions: Array<string>): angular.IPromise<IFacebookLoginStatus>;
    showDialog(options: ngcordova.IFacebookDialogOptions): angular.IPromise<any>;
    api(path: string, permissions: Array<String>): angular.IPromise<any>;
    getLoginStatus(): angular.IPromise<IFacebookLoginStatus>;
    getAccessToken(): angular.IPromise<string>;
    logout(): angular.IPromise<any>;
  }


  //// Facebook Ads - $cordovaFacebookAds
  export interface IFacebookAdsOptions {
    adSize?: string;
    width?: number;
    height?: number;
    position?: number;
    x?: number;
    y?: number;
    istesting?: boolean;
    deviceHash?: string;
    autoShow?: boolean;
  }

  export interface IFacebookAds {
    setOptions(options: any): angular.IPromise<void>;
    createBanner(options: any): angular.IPromise<void>;
    removeBanner(): angular.IPromise<void>;
    showBanner(position: number): angular.IPromise<void>;
    showBannerAtXY(x: number, y: number): angular.IPromise<void>;
    hideBanner(): angular.IPromise<void>;
    prepareInterstitial(options: any): angular.IPromise<void>;
    showInterstitial(): angular.IPromise<void>;
  }


  //// File - $cordovaFile
  export interface IFile {
    getFreeDiskSpace(): string;
    checkDir(dirPath: string);
    checkFile(filePath: string);
    createDir(dirPath: string, replaceBOOL: boolean);
    createFile(dirPath: string, replaceBOOL: boolean);
    listDir(filePath: string);
    removeFile(dirPath: string, fileName: string);
  }


  export interface IInAppBrowserDetails {
    code?: string;
    file?: string;
  }

  export interface IInAppBrowser {
    init(config: string): angular.IScope;
    init(config: {[key: string]: any}): angular.IScope;

    open(url: string, target: string, options?: {[key: string]: any}): angular.IPromise<any>;
    close(): void;
    show(): void;
    executeScript(details: ngcordova.IInAppBrowserDetails): angular.IPromise<any>;
    insertCSS(details: ngcordova.IInAppBrowserDetails): angular.IPromise<any>;
  }

  export interface IToast {
    show(message: string, duration: string, position: string): angular.IPromise<any>;
    showLongBottom(message: string): angular.IPromise<any>;
  }

  export interface ISocialSharing {
    share(message: string, subject: string, file: string, link: string): angular.IPromise<any>;
    shareViaTwitter(message: string, image: string, link: string): angular.IPromise<any>;
    shareViaWhatsApp(message: string, image: string, link: string): angular.IPromise<any>;
    shareViaFacebook(message: string, image: string, link: string): angular.IPromise<any>;
    shareViaSMS(message: string, number: number): angular.IPromise<any>;
    shareViaEmail(message: string, subject: string, toArr: Array<string>, bccArr: Array<string>, file: string): angular.IPromise<any>;
    canShareVia(socialType: string, message: string, image: string, link: string): angular.IPromise<any>;
  }

  export interface IOauth {
    dropbox(appKey: string) : angular.IPromise<any>;
    digitalOcean(clientId: string, clientSecret: string): angular.IPromise<any>;
    github(clientId: string, clientSecret: string, appScope: Array<string>): angular.IPromise<any>;
    facebook(clientId: string, appScope: Array<string>) : angular.IPromise<any>;
    linkedin(clientId: string, clientSecret: string, appScope: Array<string>, state: string): angular.IPromise<any>;
    instagram(clientId: string, appScope: Array<string>): angular.IPromise<any>;
    box(clientId: string, clientSecret: string, appState: string): angular.IPromise<any>;
    reddit(clientId: string, clientSecret: string, appScope: Array<string>): angular.IPromise<any>;
    twitter(clientId: string, clientSecret: string): angular.IPromise<any>;
    meetup(clientId: string): angular.IPromise<any>;
    foursquare(clientId: string): angular.IPromise<any>;
  }

  export interface IGeolocationOptions {
    timeout?: number;
    maximumAge?: number;
    enableHighAccuracy?: boolean;
  }

  export interface IGeolocation {
    getCurrentPosition(options?: IGeolocationOptions) : angular.IPromise<any>;
    watchPosition(options?: IGeolocationOptions)  : angular.IPromise<any>;
    clearWatch(watchID: {[key: string]: any}) : void;
  }

  export interface INetwork {
    getNetwork(): number;
    isOnline(): boolean;
    isOffline(): boolean;
    clearOfflineWatch(): void;
    clearOnlineWatch(): void;
  }

  export interface IKeyboard {
    hideAccessoryBar(bool: boolean): void;
    close(): void;
    disableScroll(): void;
    isVisible(): void;
  }

  export interface ISplashscreen {
    show(): void;
    hide(): void;
  }
}
